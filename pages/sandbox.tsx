import { GetServerSideProps, NextPage } from 'next'
import objectified from '../library/utilities/objectified'
import prisma from '../library/utilities/prisma'

const Sandbox: NextPage<any> = ({ initialUsers }) => {
  console.log(initialUsers)
  return <div>Sandbox</div>
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
