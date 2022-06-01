import { Priority, Prisma, Status } from '.prisma/client'

type UseClientStore = {
  user: Prisma.UserGetPayload<typeof user>
  member: Prisma.MemberGetPayload<typeof member>
  project: Prisma.ProjectGetPayload<typeof project>
  messages: Prisma.MessageGetPayload<typeof message>[]
  read: (
    payload:
      | { key: 'user'; value: Prisma.UserArgs }
      | { key: 'member'; value: Prisma.MemberArgs }
      | { key: 'project'; value: Prisma.ProjectArgs }
      | { key: 'messages'; value: Prisma.MessageArgs[] }
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
  },
})

export default UseClientStore

const member = Prisma.validator<Prisma.MemberArgs>()({})

const project = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
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
        todos: true,
      },
    },
    suggestions: {
      include: {
        votes: true,
      },
    },
    files: true,
    announcements: true,
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
        user: true
      }
    }
  }
})
