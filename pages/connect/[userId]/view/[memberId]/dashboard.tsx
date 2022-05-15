import { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import Chat from '../../../../../components/chat'
import { IUser } from '../../../../../library/schemas/interfaces'
import useClientStore from '../../../../../library/stores/client'
import objectified from '../../../../../library/utilities/objectified'
import prisma from '../../../../../library/utilities/prisma'

interface IDashboard {
  initialUser: IUser
}

const Dashboard: NextPage<IDashboard> = ({ initialUser }) => {
  const user = useClientStore((state) => state.user)!

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!user) return <></>

  console.log(user)

  return (
    <div>
      <div>Dashboard</div>
      <Chat />
    </div>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(query.userId) },
    include: {
      members: {
        where: {
          id: String(query.memberId),
        },
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

  return {
    props: {
      initialUser: objectified(user),
    },
  }
}
