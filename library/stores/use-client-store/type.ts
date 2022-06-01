import { Prisma } from '.prisma/client'

type UseClientStore = {
  user: Prisma.UserGetPayload<typeof user>
  member: Prisma.MemberGetPayload<typeof member>
  project: Prisma.ProjectGetPayload<typeof project>
  messages: Prisma.MessageGetPayload<typeof message>[]
  read: (
    payload:
      | { key: 'user'; value: Prisma.UserGetPayload<typeof user> }
      | { key: 'member'; value: Prisma.MemberGetPayload<typeof member> }
      | { key: 'project'; value: Prisma.ProjectGetPayload<typeof project> }
      | { key: 'messages'; value: Prisma.MessageGetPayload<typeof message>[] }
  ) => void
}

const user = Prisma.validator<Prisma.UserArgs>()({
  include: {
    members: {
      include: {
        project: {
          include: {
            members: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    tickets: {
      include: {
        project: true,
      },
    },
  },
})

export default UseClientStore

const member = Prisma.validator<Prisma.MemberArgs>()({})

const project = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    members: {
      include: {
        user: true,
        authorizations: {
          include: {
            member: {
              include: {
                user: true,
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
            member: {
              include: {
                user: true,
              },
            },
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
                member: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        participants: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    suggestions: {
      include: {
        votes: true,
        participants: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    files: {
      include: {
        participants: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    announcements: {
      include: {
        participants: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    tickets: {
      include: {
        user: true,
      },
    },
  },
})

const message = Prisma.validator<Prisma.MessageArgs>()({
  include: {
    member: {
      include: {
        user: true,
      },
    },
    reactions: true,
  },
})
