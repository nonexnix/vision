import { GetServerSideProps, NextPage } from 'next'
import objectified from '../library/utilities/objectified'
import prisma from '../library/utilities/prisma'

const Sandbox: NextPage<any> = ({ data }) => {
  console.log(data)
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
              role: true,
            },
          },
          project: {
            include: {
              tickets: true,
              messages: {
                include: {
                  reactions: true,
                },
              },
              members: {
                include: {
                  authorizations: {
                    include: {
                      role: true,
                    },
                  },
                },
              },
              roles: {
                include: {
                  authorizations: {
                    include: {
                      role: true,
                    },
                  },
                },
              },
              tasks: {
                include: {
                  todos: {
                    include: {
                      participants: {
                        include: {
                          member: true,
                        },
                      },
                    },
                  },
                  participants: {
                    include: {
                      member: true,
                    },
                  },
                },
              },
              suggestions: {
                include: {
                  participants: {
                    include: {
                      member: true,
                    },
                  },
                  votes: true,
                },
              },
              files: {
                include: {
                  participants: {
                    include: {
                      member: true,
                    },
                  },
                },
              },
              announcements: {
                include: {
                  participants: {
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
      data: objectified(users),
    },
  }
}
