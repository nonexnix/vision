import create from 'zustand'
import type UseClientStore from './schema'

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
