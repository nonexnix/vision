import { Priority, Prisma, Status } from '.prisma/client'

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
  update: {
    user: (
      payload:
        | { key: 'username'; value: string }
        | { key: 'firstName'; value: string }
        | { key: 'lastName'; value: string }
    ) => void
    member: (
      payload:
        | { key: 'active'; value: boolean }
        | { key: 'rating'; value: number }
    ) => void
    project: (
      payload:
        | { key: 'name'; value: string }
        | { key: 'description'; value: string }
        | { key: 'over'; value: boolean }
        | { key: 'preserve'; value: boolean }
        | { key: 'dueAt'; value: Date }
    ) => void
    message: (payload: { id: string; key: 'text'; value: string }) => void
    role: (
      payload:
        | { id: string; key: 'name'; value: string }
        | { id: string; key: 'description'; value: string }
    ) => void
    permission: (
      payload:
        | { id: string; key: 'project'; value: boolean }
        | { id: string; key: 'message'; value: boolean }
        | { id: string; key: 'task'; value: boolean }
        | { id: string; key: 'todo'; value: boolean }
        | { id: string; key: 'suggestion'; value: boolean }
        | { id: string; key: 'file'; value: boolean }
        | { id: string; key: 'announcement'; value: boolean }
        | { id: string; key: 'ticket'; value: boolean }
    ) => void
    task: (
      payload:
        | { id: string; key: 'name'; value: string }
        | { id: string; key: 'description'; value: string }
        | { id: string; key: 'priority'; value: Priority }
        | { id: string; key: 'over'; value: boolean }
        | { id: string; key: 'dueAt'; value: Date }
    ) => void
    todo: (
      payload:
        | { id: string; key: 'name'; value: string }
        | { id: string; key: 'description'; value: string }
        | { id: string; key: 'priority'; value: Priority }
        | { id: string; key: 'over'; value: boolean }
        | { id: string; key: 'dueAt'; value: Date }
    ) => void
    suggestion: (
      payload:
        | { id: string; key: 'name'; value: string }
        | { id: string; key: 'description'; value: string }
        | { id: string; key: 'status'; value: Status }
    ) => void
    file: (
      payload:
        | { id: string; key: 'name'; value: string }
        | { id: string; key: 'description'; value: string }
        | { id: string; key: 'status'; value: Status }
    ) => void
    announcement: (
      payload:
        | { id: string; key: 'name'; value: string }
        | { id: string; key: 'description'; value: string }
    ) => void
  }
  delete: {
    member: (payload: { id: string }) => void
    role: (payload: { id: string }) => void
    authorization: (payload: { id: string }) => void
    message: (payload: { id: string }) => void
    reaction: (payload: { id: string }) => void
    task: (payload: { id: string }) => void
    todo: (payload: { id: string }) => void
    suggestion: (payload: { id: string }) => void
    vote: (payload: { id: string }) => void
    file: (payload: { id: string }) => void
    announcement: (payload: { id: string }) => void
    participant: (
      payload:
        | { id: string; key: 'tasks' }
        | { id: string; key: 'todos' }
        | { id: string; key: 'suggestions' }
        | { id: string; key: 'files' }
        | { id: string; key: 'announcements' }
    ) => void
    ticket: (payload: { id: string }) => void
  }
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

const member = Prisma.validator<Prisma.MemberArgs>()({
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
})

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
