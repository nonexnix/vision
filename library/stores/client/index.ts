import create from 'zustand'
import record from '../../utilities/record'
import type IUseClientStore from './interface'
import placeholder from './placeholder'

const useClientStore = create<IUseClientStore>((set, get) => ({
  user: placeholder.user,
  member: placeholder.member,
  project: placeholder.project,
  messages: placeholder.messages,
  loader: false,
  read: {
    user: (payload) => set({ user: payload }),
    member: (payload) => set({ member: payload }),
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
      await record('member', 'CREATE', payload)
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
    role: async (payload) => {
      set({ loader: !get().loader })
      await record('role', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    authorization: async (payload) => {
      set({ loader: !get().loader })
      await record('authorization', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    message: async (payload) => {
      set({ loader: !get().loader })
      await record('message', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    reaction: async (payload) => {
      set({ loader: !get().loader })
      await record('reaction', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    task: async (payload) => {
      set({ loader: !get().loader })
      await record('task', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    todo: async (payload) => {
      set({ loader: !get().loader })
      await record('todo', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    suggestion: async (payload) => {
      set({ loader: !get().loader })
      await record('suggestion', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    vote: async (payload) => {
      set({ loader: !get().loader })
      await record('vote', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    file: async (payload) => {
      set({ loader: !get().loader })
      await record('file', 'CREATE', payload)
      set({ loader: !get().loader })
    },
    announcement: async (payload) => {
      set({ loader: !get().loader })
      await record('announcement', 'CREATE', payload)
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
    user: async (payload) => {
      set({ loader: !get().loader })
      await record('user', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    member: async (payload) => {
      set({ loader: !get().loader })
      await record('member', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    project: async (payload) => {
      set({ loader: !get().loader })
      await record('project', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    role: async (payload) => {
      set({ loader: !get().loader })
      await record('role', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    authorization: async (payload) => {
      set({ loader: !get().loader })
      await record('authorization', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    message: async (payload) => {
      set({ loader: !get().loader })
      await record('message', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    reaction: async (payload) => {
      set({ loader: !get().loader })
      await record('reaction', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    task: async (payload) => {
      set({ loader: !get().loader })
      await record('task', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    todo: async (payload) => {
      set({ loader: !get().loader })
      await record('todo', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    suggestion: async (payload) => {
      set({ loader: !get().loader })
      await record('suggestion', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    vote: async (payload) => {
      set({ loader: !get().loader })
      await record('vote', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    file: async (payload) => {
      set({ loader: !get().loader })
      await record('file', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    announcement: async (payload) => {
      set({ loader: !get().loader })
      await record('announcement', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    participant: async (payload) => {
      set({ loader: !get().loader })
      await record('participant', 'DELETE', payload)
      set({ loader: !get().loader })
    },
    ticket: async (payload) => {
      set({ loader: !get().loader })
      await record('ticket', 'DELETE', payload)
      set({ loader: !get().loader })
    },
  },
  update: {
    user: {
      username: async (payload) => {
        set({ loader: !get().loader })
        await record('user', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      firstName: async (payload) => {
        set({ loader: !get().loader })
        await record('user', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      lastName: async (payload) => {
        set({ loader: !get().loader })
        await record('user', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    member: {
      rating: async (payload) => {
        set({ loader: !get().loader })
        await record('member', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      active: async (payload) => {
        set({ loader: !get().loader })
        await record('member', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    project: {
      name: async (payload) => {
        set({ loader: !get().loader })
        await record('project', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      description: async (payload) => {
        set({ loader: !get().loader })
        await record('project', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      over: async (payload) => {
        set({ loader: !get().loader })
        await record('project', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      preserve: async (payload) => {
        set({ loader: !get().loader })
        await record('project', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      dueAt: async (payload) => {
        set({ loader: !get().loader })
        await record('project', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    role: {
      name: async (payload) => {
        set({ loader: !get().loader })
        await record('role', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      description: async (payload) => {
        set({ loader: !get().loader })
        await record('role', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    message: {
      text: async (payload) => {
        set({ loader: !get().loader })
        await record('message', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    task: {
      name: async (payload) => {
        set({ loader: !get().loader })
        await record('task', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      description: async (payload) => {
        set({ loader: !get().loader })
        await record('task', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      priority: async (payload) => {
        set({ loader: !get().loader })
        await record('task', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      over: async (payload) => {
        set({ loader: !get().loader })
        await record('task', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      dueAt: async (payload) => {
        set({ loader: !get().loader })
        await record('task', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    todo: {
      name: async (payload) => {
        set({ loader: !get().loader })
        await record('todo', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      description: async (payload) => {
        set({ loader: !get().loader })
        await record('todo', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      priority: async (payload) => {
        set({ loader: !get().loader })
        await record('todo', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      over: async (payload) => {
        set({ loader: !get().loader })
        await record('todo', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      dueAt: async (payload) => {
        set({ loader: !get().loader })
        await record('todo', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    suggestion: {
      name: async (payload) => {
        set({ loader: !get().loader })
        await record('suggestion', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      description: async (payload) => {
        set({ loader: !get().loader })
        await record('suggestion', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      status: async (payload) => {
        set({ loader: !get().loader })
        await record('suggestion', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    vote: {
      mark: async (payload) => {
        set({ loader: !get().loader })
        await record('vote', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    file: {
      name: async (payload) => {
        set({ loader: !get().loader })
        await record('file', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      description: async (payload) => {
        set({ loader: !get().loader })
        await record('file', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      status: async (payload) => {
        set({ loader: !get().loader })
        await record('file', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    announcement: {
      name: async (payload) => {
        set({ loader: !get().loader })
        await record('announcement', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
      description: async (payload) => {
        set({ loader: !get().loader })
        await record('announcement', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
    participant: {
      access: async (payload) => {
        set({ loader: !get().loader })
        await record('access', 'UPDATE', payload)
        set({ loader: !get().loader })
      },
    },
  },
}))

export default useClientStore
