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

interface IDashboard {
  initialUser: IUser
  initialProject: IProject
  initialMessages: IMessage[]
}

const Dashboard: NextPage<IDashboard> = ({ initialUser, initialProject, initialMessages }) => {
  const user = useClientStore((state) => state.user)!
  const project = useClientStore((state) => state.project)!
  const messages = useClientStore((state) => state.messages)!

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.project(initialProject)
    useClientStore.getState().read.messages(initialMessages)
  }, [initialUser, initialProject, initialMessages])

  if (!user || !project || !messages) return <></>

  console.log(user)
  console.log(project)

  return (
    <Page title={`DASHBOARD | ${user.username}`}>
      <Layout>
        <Header />
        <Main>
          <section>DASHBOARD PAGE</section>
          <Chat />
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
