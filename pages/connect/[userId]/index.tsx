import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'
import Header from '../../../components/Header'
import Layout from '../../../components/Layout'
import Main from '../../../components/Main'
import Page from '../../../components/Page'
import type { IUser } from '../../../library/schemas/interfaces'
import useClientStore from '../../../library/stores/client'
import objectified from '../../../library/utilities/objectified'
import prisma from '../../../library/utilities/prisma'
import useSWR, { SWRConfiguration } from 'swr'

interface IProps {
  initialUser: IUser
}

const Home: NextPage<IProps> = ({ initialUser }) => {
  const user = useClientStore<IUser>((state) => state.user)

  const fetcher = async (endpoint: string) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ id: user.id }),
    })
    const data = await response.json()
    return data
  }

  const config: SWRConfiguration = {
    fallbackData: initialUser,
  }

  const { data } = useSWR('/api/user/read', fetcher, config)

  useEffect(() => {
    useClientStore.getState().read.user(data)
  }, [data])

  if (data !== user) return <></>

  console.log(user)

  return (
    <Page title={`Home | @${user.username}`}>
      <Layout>
        <Header />
        <Main>
          <section>Home Page</section>
        </Main>
      </Layout>
    </Page>
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
