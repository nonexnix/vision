import { Prisma } from '@prisma/client'
import create from 'zustand'
import { member, message, project, user } from './model'

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

const useClientStore = create<UseClientStore>((set, get) => ({
  user: {
    id: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [],
    tickets: [],
  },
  member: {
    id: '',
    rating: 100,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '',
    projectId: '',
  },
  project: {
    id: '',
    name: '',
    description: '',
    code: '',
    preserve: true,
    over: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueAt: new Date(),
    userId: '',
    members: [],
    roles: [],
    tasks: [],
    suggestions: [],
    files: [],
    announcements: [],
    tickets: [],
  },
  messages: [],
  read: ({ key, value }) => set({ [key]: value }),
}))

export default useClientStore
