import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import Chat from '../../../../../components/Chat'
import Header from '../../../../../components/Header'
import Layout from '../../../../../components/Layout'
import Main from '../../../../../components/Main'
import Page from '../../../../../components/Page'
import type { IMessage, IProject, IUser } from '../../../../../library/schemas/interfaces'
import useClientStore from '../../../../../library/stores/client'
import objectified from '../../../../../library/utilities/objectified'
import prisma from '../../../../../library/utilities/prisma'

interface IProps {
  initialUser: IUser
  initialProject: IProject
  initialMessages: IMessage[]
}

const Dashboard: NextPage<IProps> = ({ initialUser, initialProject, initialMessages }) => {
  const user = useClientStore<IUser>((state) => state.user)
  const project = useClientStore<IProject>((state) => state.project)

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.project(initialProject)
  }, [initialUser, initialProject])

  if (!user.id || !project.id) return <></>

  console.log(user)
  console.log(project)

  return (
    <Page title={`Dashboard | @${user.username}`}>
      <Layout>
        <Header />
        <Main>
          <section>Dashboard Page</section>
          <section>{project.name}</section>
          <Chat initialMessages={initialMessages} />
        </Main>
      </Layout>
    </Page>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(query.userId) },
    include: {
      members: {
        where: { id: String(query.memberId) },
      },
    },
  })

  const project = await prisma.project.findUnique({
    where: { id: user!.members[0].projectId },
    include: {
      members: true,
      tasks: true,
      suggestions: true,
      files: true,
      announcements: true,
    },
  })

  const messages = await prisma.message.findMany({
    where: { projectId: user?.members[0].projectId },
  })

  return {
    props: {
      initialUser: objectified(user),
      initialProject: objectified(project),
      initialMessages: objectified(messages),
    },
  }
}
