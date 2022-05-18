import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import type { IUser } from '../../../library/schemas/interfaces'
import useClientStore from '../../../library/stores/client'
import objectified from '../../../library/utilities/objectified'
import prisma from '../../../library/utilities/prisma'
import Header from '../../../components/header'
import Layout from '../../../components/layout'
import Main from '../../../components/main'
import Footer from '../../../components/footer'
import Foundation from '../../../components/foundation'

interface IProps {
  initialUser: IUser
}

const Home: NextPage<IProps> = ({ initialUser }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!ready) return <></>

  console.log('Home Rendered')

  return (
    <Foundation title="Home">
      <Layout>
        <Header />
        <Main>
          <section>Home Page</section>
        </Main>
        <Footer />
      </Layout>
    </Foundation>
  )
}

export default Home

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany()

  const paths = users.map((user) => {
    return {
      params: { userId: user.id },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(params!.userId) },
    include: {
      members: {
        include: {
          _count: { select: { tasks: true } },
          project: {
            include: {
              _count: { select: { members: true, tasks: true } },
            },
          },
        },
      },
    },
  })

  return {
    props: {
      initialUser: objectified(user),
    },
    revalidate: 1,
  }
}
