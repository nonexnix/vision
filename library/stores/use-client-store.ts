import create from 'zustand'
import { Member, Message, Project, User } from '../types/client'

type UseClientStore = {
  user: User
  member: Member
  project: Project
  messages: Message[]
  read: (
    payload:
      | { key: 'user'; value: User }
      | { key: 'member'; value: Member }
      | { key: 'project'; value: Project }
      | { key: 'messages'; value: Message[] }
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
    createdAt: '',
    updatedAt: '',
    members: [],
    tickets: [],
  },
  member: {
    id: '',
    rating: 100,
    active: true,
    createdAt: '',
    updatedAt: '',
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
    createdAt: '',
    updatedAt: '',
    dueAt: '',
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
