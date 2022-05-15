import { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import Chat from '../../../../../components/chat'
import { IMessage, IUser } from '../../../../../library/schemas/interfaces'
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
    <div>
      <div>Dashboard</div>
      <Chat
        initialMessages={initialMessages}
        projectId={user.members![0].projectId}
      />
    </div>
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
