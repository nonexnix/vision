import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'
import Layout from '../../../components/layout'
import LayoutFooter from '../../../components/layout/LayoutFooter'
import LayoutHeader from '../../../components/layout/LayoutHeader'
import LayoutMain from '../../../components/layout/LayoutMain'
import Modal from '../../../components/modal'
import ModalProject from '../../../components/modal/modal-project'
import Page from '../../../components/Page'
import type { IUser } from '../../../library/schemas/interfaces'
import useClientStore from '../../../library/stores/client'
import objectified from '../../../library/utilities/objectified'
import prisma from '../../../library/utilities/prisma'

interface IProps {
  initialUser: IUser
}

const Home: NextPage<IProps> = ({ initialUser }) => {
  const user = useClientStore((state) => state.user)

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!user.id) return <></>

  console.log(user)

  return (
    <Page title={`Home | @${user!.username}`}>
      <Layout>
        <LayoutHeader />
        <LayoutMain>
          <section>Home Page</section>
        </LayoutMain>
        <LayoutFooter />
      </Layout>
      {/* <Modal>
        <ModalProject />
      </Modal> */}
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
