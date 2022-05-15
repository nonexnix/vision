import create from 'zustand'
import { IMessage, IUser } from '../schemas/interfaces'
import { TPriority } from '../schemas/types'
import record from '../utilities/record'

interface IUseClientStore {
  users: IUser[] | null
  messages: IMessage[] | null
  read: IRead
  create: ICreate
  update: IUpdate
  delete: IDelete
}

const useClientStore = create<IUseClientStore>((set) => ({
  users: null,
  messages: null,
  read: {
    users: (payload) => set({ users: payload }),
    messages: (payload) => set({ messages: payload }),
  },
  create: {
    user: (payload) => {
      record('users', 'CREATE', payload)
    },
    member: (payload) => {
      record('members', 'CREATE', payload)
    },
    project: (payload) => {
      record('projects', 'CREATE', payload)
    },
    message: (payload) => {
      record('messages', 'CREATE', payload)
    },
    task: (payload) => {
      record('tasks', 'CREATE', payload)
    },
    participant: (payload) => {
      record('participants', 'CREATE', payload)
    },
    ticket: (payload) => {
      record('tickets', 'CREATE', payload)
    },
  },
  update: {
    user: {
      username: (payload) => {
        record('users', 'UPDATE', payload)
      },
      firstName: (payload) => {
        record('users', 'UPDATE', payload)
      },
      lastName: (payload) => {
        record('users', 'UPDATE', payload)
      },
    },
    member: {
      rating: (payload) => {
        record('members', 'UPDATE', payload)
      },
      active: (payload) => {
        record('members', 'UPDATE', payload)
      },
    },
    project: {
      name: (payload) => {
        record('projects', 'UPDATE', payload)
      },
      description: (payload) => {
        record('projects', 'UPDATE', payload)
      },
      over: (payload) => {
        record('projects', 'UPDATE', payload)
      },
      preserve: (payload) => {
        record('projects', 'UPDATE', payload)
      },
      dueAt: (payload) => {
        record('projects', 'UPDATE', payload)
      },
    },
    message: {
      text: (payload) => {
        record('messages', 'UPDATE', payload)
      },
    },
    task: {
      name: (payload) => {
        record('tasks', 'UPDATE', payload)
      },
      description: (payload) => {
        record('tasks', 'UPDATE', payload)
      },
      priority: (payload) => {
        record('tasks', 'UPDATE', payload)
      },
      over: (payload) => {
        record('tasks', 'UPDATE', payload)
      },
    },
  },
  delete: {
    user: (payload) => {
      record('users', 'DELETE', payload)
    },
    member: (payload) => {
      record('members', 'DELETE', payload)
    },
    project: (payload) => {
      record('projects', 'DELETE', payload)
    },
    message: (payload) => {
      record('messages', 'DELETE', payload)
    },
    task: (payload) => {
      record('tasks', 'DELETE', payload)
    },
    participant: (payload) => {
      record('participants', 'DELETE', payload)
    },
    ticket: (payload) => {
      record('tickets', 'DELETE', payload)
    },
  },
}))

export default useClientStore

// ---------------------------------------------------------------------------------------

interface IRead {
  users: (payload: IUser[]) => void
  messages: (payload: IMessage[]) => void
}

interface ICreate {
  user: (payload: {
    email: string
    username: string
    firstName: string
    lastName: string
    image: string
  }) => void
  member: (payload: {
    members: { userId: string; projectId: string }[]
  }) => void
  project: (payload: {
    name: string
    description: string
    dueAt: string
    userId: string
  }) => void
  message: (payload: {
    text: string
    memberId: string
    projectId: string
  }) => void
  task: (payload: {
    name: string
    description: string
    priority: TPriority
    dueAt: string
    memberId: string
    projectId: string
    participants: { memberId: string }[]
  }) => void
  participant: (payload: {
    participants: { memberId: string; key: string; value: string }[]
  }) => void
  ticket: (payload: { code: string; userId: string; projectId: string }) => void
}

interface IUpdate {
  user: {
    username: (payload: { id: string; key: 'username'; value: string }) => void
    firstName: (payload: {
      id: string
      key: 'firstName'
      value: string
    }) => void
    lastName: (payload: { id: string; key: 'lastName'; value: string }) => void
  }
  member: {
    rating: (payload: { id: string; key: 'lastName'; value: string }) => void
    active: (payload: { id: string; key: 'lastName'; value: string }) => void
  }
  project: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: { id: string; key: 'name'; value: string }) => void
    over: (payload: { id: string; key: 'over'; value: boolean }) => void
    preserve: (payload: { id: string; key: 'preserve'; value: boolean }) => void
    dueAt: (payload: { id: string; key: 'dueAt'; value: string }) => void
  }
  message: {
    text: (payload: { id: string; key: 'text'; value: string }) => void
  }
  task: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: {
      id: string
      key: 'description'
      value: string
    }) => void
    priority: (payload: {
      id: string
      key: 'priority'
      value: TPriority
    }) => void
    over: (payload: { id: string; key: 'over'; value: boolean }) => void
  }
}

interface IDelete {
  user: (payload: { id: string }) => void
  member: (payload: { id: string }) => void
  project: (payload: { id: string }) => void
  message: (payload: { id: string }) => void
  task: (payload: { id: string }) => void
  participant: (payload: { id: string }) => void
  ticket: (payload: { id: string }) => void
}
