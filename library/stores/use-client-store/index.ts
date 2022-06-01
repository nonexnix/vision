import create from 'zustand'
import UseClientStore from './schema'

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
