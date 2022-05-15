import create from 'zustand'
import record from '../../utilities/record'
import type IUseClientStore from './interface'
import placeholder from './placeholder'

const useClientStore = create<IUseClientStore>((set) => ({
  user: placeholder.user,
  project: placeholder.project,
  messages: placeholder.messages,
  read: {
    user: (payload) => set({ user: payload }),
    project: (payload) => set({ project: payload }),
    messages: (payload) => set({ messages: payload }),
  },
  create: {
    user: (payload) => record('user', 'CREATE', payload),
    member: (payload) => record('member', 'CREATE', payload),
    members: (payload) => payload.forEach(({ userId, projectId }) => record('members', 'CREATE', { userId, projectId })),
    project: (payload) => record('project', 'CREATE', payload),
    message: (payload) => record('message', 'CREATE', payload),
    task: (payload) => record('task', 'CREATE', payload),
    participant: (payload) => record('participant', 'CREATE', payload),
    participants: (payload) => payload.forEach(({ memberId, key, value }) => record('participants', 'CREATE', { memberId, key, value })),
    ticket: (payload) => record('ticket', 'CREATE', payload),
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
