import { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import useClientStore from '../library/stores/client'
import objectified from '../library/utilities/objectified'
import prisma from '../library/utilities/prisma'

const Sandbox: NextPage<any> = ({ initialUsers }) => {
  const users = useClientStore((state) => state.users)

  useEffect(() => {
    useClientStore.getState().read.users(initialUsers)
  }, [initialUsers])

  if (!users) return <></>

  console.log(users)

  return <div>{users[0].firstName}</div>
}

export default Sandbox

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    include: {
      members: {
        include: {
          authorizations: {
            include: {
              role: {
                include: {
                  permission: true,
                },
              },
            },
          },
          project: {
            include: {
              tasks: {
                include: {
                  participants: {
                    include: {
                      member: true,
                    },
                  },
                },
              },
              members: {
                include: {
                  authorizations: {
                    include: {
                      role: {
                        include: {
                          permission: true,
                        },
                      },
                    },
                  },
                },
              },
              roles: {
                include: {
                  permission: true,
                  authorizations: {
                    include: {
                      member: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  return {
    props: {
      initialUsers: objectified(users),
    },
  }
}
