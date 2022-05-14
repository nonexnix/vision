import create from 'zustand'
import { IMember, IMessage, IUser } from '../schemas/interfaces'
import { TPriority } from '../schemas/types'

interface IUseClientStore {
  users: IUser[] | null
  messages: IMessage[] | null
  read: {
    users: (users: IUser[]) => void
    messages: (messages: IMessage[]) => void
  }
  delete: {
    user: (user: string) => void
    member: (member: string) => void
    project: (project: string) => void
    message: (message: string) => void
    task: (task: string) => void
    participant: (participant: string) => void
    ticket: (ticket: string) => void
  }
  update: {
    user: (
      id: string,
      key: 'username' | 'firstName' | 'lastName',
      value: string
    ) => void
    member: (id: string, key: 'rating' | 'active', value: string) => void
    project: (
      id: string,
      key: 'name' | 'description' | 'over' | 'preserve' | 'dueAt',
      value: string
    ) => void
    message: (id: string, key: 'text', value: string) => void
    task: (
      id: string,
      key: 'name' | 'description' | 'priority' | 'over',
      value: string | TPriority
    ) => void
  }
}

const useClientStore = create<IUseClientStore>((set) => ({
  users: null,
  messages: null,
  read: {
    users: (users) => set({ users: users }),
    messages: (messages) => set({ messages: messages }),
  },
  delete: {
    user: async (id) => {
      await fetch('/api/users/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    member: async (id) => {
      await fetch('/api/members/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    project: async (id) => {
      await fetch('/api/projects/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    message: async (id) => {
      await fetch('/api/messages/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    task: async (id) => {
      await fetch('/api/tasks/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    participant: async (id) => {
      await fetch('/api/participants/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    ticket: async (id) => {
      await fetch('/api/tickets/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
  },
  update: {
    user: async (id, key, value) => {
      await fetch('/api/users/update', {
        method: 'PUT',
        body: JSON.stringify({ id, key, value }),
      })
    },
    member: async (id, key, value) => {
      await fetch('/api/members/update', {
        method: 'PUT',
        body: JSON.stringify({ id, key, value }),
      })
    },
    project: async (id, key, value) => {
      await fetch('/api/projects/update', {
        method: 'PUT',
        body: JSON.stringify({ id, key, value }),
      })
    },
    message: async (id, key, value) => {
      await fetch('/api/messages/update', {
        method: 'PUT',
        body: JSON.stringify({ id, key, value }),
      })
    },
    task: async (id, key, value) => {
      await fetch('/api/tasks/update', {
        method: 'PUT',
        body: JSON.stringify({ id, key, value }),
      })
    },
  },
}))

export default useClientStore
