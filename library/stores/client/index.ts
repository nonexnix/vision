import create from 'zustand'
import record from '../../utilities/record'
import type IUseClientStore from './interface'
import placeholder from './placeholder'

const useClientStore = create<IUseClientStore>((set, get) => ({
  user: placeholder.user,
  project: placeholder.project,
  messages: placeholder.messages,
  loader: false,
  read: {
    user: (payload) => set({ user: payload }),
    project: (payload) => set({ project: payload }),
    messages: (payload) => set({ messages: payload }),
  },
  create: {
    user: async (payload) => {
      set({ loader: !get().loader })
      await record('user', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    member: async (payload) => {
      set({ loader: !get().loader })
      record('member', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    members: async (payload) => {
      set({ loader: !get().loader })
      await payload.forEach(({ userId, projectId }) => record('members', 'CREATE', { userId, projectId }))
      set({ loader: !get().loader })
    },
    project: async (payload) => {
      set({ loader: !get().loader })
      await record('project', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    message: async (payload) => {
      set({ loader: !get().loader })
      await record('message', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    task: async (payload) => {
      set({ loader: !get().loader })
      await record('task', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    participant: async (payload) => {
      set({ loader: !get().loader })
      await record('participant', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    participants: async (payload) => {
      set({ loader: !get().loader })
      await payload.forEach(({ memberId, key, value }) => record('participants', 'CREATE', { memberId, key, value }))
      set({ loader: !get().loader })
    },
    ticket: async (payload) => {
      set({ loader: !get().loader })
      await record('ticket', 'CREATE', payload)
      set({ loader: !get().loader })
    },
  },
  delete: {
    user: (payload) => record('user', 'DELETE', payload),
    member: (payload) => record('member', 'DELETE', payload),
    project: (payload) => record('project', 'DELETE', payload),
    message: (payload) => record('message', 'DELETE', payload),
    task: (payload) => record('task', 'DELETE', payload),
    participant: (payload) => record('participant', 'DELETE', payload),
    ticket: (payload) => record('ticket', 'DELETE', payload),
  },
  update: {
    user: {
      username: (payload) => record('user', 'UPDATE', payload),
      firstName: (payload) => record('user', 'UPDATE', payload),
      lastName: (payload) => record('user', 'UPDATE', payload),
    },
    member: {
      rating: (payload) => record('member', 'UPDATE', payload),
      active: (payload) => record('member', 'UPDATE', payload),
    },
    project: {
      name: (payload) => record('project', 'UPDATE', payload),
      description: (payload) => record('project', 'UPDATE', payload),
      over: (payload) => record('project', 'UPDATE', payload),
      preserve: (payload) => record('project', 'UPDATE', payload),
      dueAt: (payload) => record('project', 'UPDATE', payload),
    },
    message: {
      text: (payload) => record('message', 'UPDATE', payload),
    },
    task: {
      name: (payload) => record('task', 'UPDATE', payload),
      description: (payload) => record('task', 'UPDATE', payload),
      priority: (payload) => record('task', 'UPDATE', payload),
      over: (payload) => record('task', 'UPDATE', payload),
    },
  },
}))

export default useClientStore
