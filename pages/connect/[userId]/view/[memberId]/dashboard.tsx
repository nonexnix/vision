import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import Chat from '../../../../../components/chat'
import Header from '../../../../../components/Header'
import Layout from '../../../../../components/Layout'
import Main from '../../../../../components/Main'
import Page from '../../../../../components/Page'
import type { IMessage, IUser } from '../../../../../library/schemas/interfaces'
import useClientStore from '../../../../../library/stores/client'
import objectified from '../../../../../library/utilities/objectified'
import prisma from '../../../../../library/utilities/prisma'

interface IDashboard {
  initialUser: IUser
  initialMessages: IMessage[]
}

const Dashboard: NextPage<IDashboard> = ({ initialUser, initialMessages }) => {
  const user = useClientStore((state) => state.user)!

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!user) return <></>

  console.log(user)

  return (
    <Page title={`DASHBOARD | ${user.username}`}>
      <Layout>
        <Header />
        <Main>
          <section>HOME PAGE</section>
          <Chat
            initialMessages={initialMessages}
            projectId={user.members![0].projectId}
          />
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
        include: {
          project: {
            include: {
              members: true,
              tasks: true,
              suggestions: true,
              files: true,
              announcements: true,
            },
          },
        },
      },
    },
  })

  const messages = await prisma.message.findMany({
    where: { projectId: user?.members[0].projectId },
  })

  return {
    props: {
      initialUser: objectified(user),
      initialMessages: objectified(messages),
    },
  }
}
