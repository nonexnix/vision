import create from 'zustand'
import { IMessage, IUser } from '../schemas/interfaces'
import { TPriority } from '../schemas/types'

interface IUseClientStore {
  users: IUser[] | null
  messages: IMessage[] | null
  read: {
    users: (users: IUser[]) => void
    messages: (messages: IMessage[]) => void
  }
  create: {
    user: (
      email: string,
      username: string,
      firstName: string,
      lastName: string,
      image: string
    ) => void
    member: (members: { userId: string; projectId: string }[]) => void
    project: (
      name: string,
      description: string,
      dueAt: string,
      userId: string
    ) => void
    message: (text: string, memberId: string, projectId: string) => void
    task: (
      name: string,
      description: string,
      priority: TPriority,
      dueAt: string,
      memberId: string,
      projectId: string,
      participants: { memberId: string }[]
    ) => void
    participant: (
      participants: { memberId: string; key: string; value: string }[]
    ) => void
    ticket: (code: string, userId: string, projectId: string) => void
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
  create: {
    user: async (email, username, firstName, lastName, image) => {
      await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify({ email, username, firstName, lastName, image }),
      })
    },
    member: async (members) => {
      await fetch('/api/members/create', {
        method: 'POST',
        body: JSON.stringify([...members]),
      })
    },
    project: async (name, description, dueAt, userId) => {
      await fetch('/api/projects/create', {
        method: 'POST',
        body: JSON.stringify({ name, description, dueAt, userId }),
      })
    },
    message: async (text, memberId, projectId) => {
      await fetch('/api/messages/create', {
        method: 'POST',
        body: JSON.stringify({ text, memberId, projectId }),
      })
    },
    task: async (
      name,
      description,
      priority,
      dueAt,
      memberId,
      projectId,
      participants
    ) => {
      await fetch('/api/tasks/create', {
        method: 'POST',
        body: JSON.stringify({
          name,
          description,
          priority,
          dueAt,
          memberId,
          projectId,
          participants,
        }),
      })
    },
    participant: async (participants) => {
      await fetch('/api/participants/create', {
        method: 'POST',
        body: JSON.stringify([...participants]),
      })
    },
    ticket: async (ticket) => {
      await fetch('/api/tickets/create', {
        method: 'POST',
        body: JSON.stringify({ ticket }),
      })
    },
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
