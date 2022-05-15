import { NextPage, GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { IUser } from '../../../library/schemas/interfaces'
import useClientStore from '../../../library/stores/client'
import objectified from '../../../library/utilities/objectified'
import prisma from '../../../library/utilities/prisma'

interface IHome {
  initialUser: IUser
}

const Home: NextPage<IHome> = ({ initialUser }) => {
  const user = useClientStore((state) => state.user)!

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!user) return <></>

  console.log(user)

  return <div>Home</div>
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(query.userId) },
    include: {
      members: {
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
