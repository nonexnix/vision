import create from 'zustand'
import UseClientStore from './type'

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
    roles: [],
    tasks: [],
    suggestions: [],
    files: [],
    announcements: [],
    tickets: [],
  },
  messages: [],
  read: (payload) => set({ [payload.key]: payload.value }),
  update: {
    user: async ({ key, value }) => {
      const { id } = get().user
      set(({ user }) => ({
        user: {
          ...user,
          [key]: value,
        },
      }))
    },
    member: async ({ key, value }) => {
      const { id } = get().member
      set(({ member }) => ({
        member: {
          ...member,
          [key]: value,
        },
      }))
    },
    project: async ({ key, value }) => {
      const { id } = get().project
      set(({ project }) => ({
        project: {
          ...project,
          [key]: value,
        },
      }))
    },
    message: async ({ id, key, value }) => {
      set(({ messages }) => ({
        messages: messages.map((message) => {
          if (message.id !== id) return message
          return {
            ...message,
            [key]: value,
          }
        }),
      }))
    },
    role: async ({ id, key, value }) => {
      set(({ project }) => ({
        project: {
          ...project,
          roles: project.roles.map((role) => {
            if (role.id !== id) role
            return {
              ...role,
              [key]: value,
            }
          }),
        },
      }))
    },
    permission: async ({ id, key, value }) => {
      set(({ project }) => ({
        project: {
          ...project,
          roles: project.roles.map((role) => {
            if (role.permission!.id !== id) role
            return {
              ...role,
              permission: {
                ...role.permission!,
                [key]: value,
              },
            }
          }),
        },
      }))
    },
    task: async ({ id, key, value }) => {
      set(({ project }) => ({
        project: {
          ...project,
          tasks: project.tasks.map((task) => {
            if (task.id !== id) return task
            return {
              ...task,
              [key]: value,
            }
          }),
        },
      }))
    },
    todo: async ({ id, key, value }) => {
      set(({ project }) => ({
        project: {
          ...project,
          tasks: project.tasks.map((task) => ({
            ...task,
            todos: task.todos.map((todo) => {
              if (todo.id !== id) return todo
              return {
                ...todo,
                [key]: value,
              }
            }),
          })),
        },
      }))
    },
    suggestion: ({ id, key, value }) => {
      set(({ project }) => ({
        project: {
          ...project,
          suggestions: project.suggestions.map((suggestion) => {
            if (suggestion.id !== id) return suggestion
            return {
              ...suggestion,
              [key]: value,
            }
          }),
        },
      }))
    },
    file: ({ id, key, value }) => {
      set(({ project }) => ({
        project: {
          ...project,
          files: project.files.map((file) => {
            if (file.id !== id) return file
            return {
              ...file,
              [key]: value,
            }
          }),
        },
      }))
    },
    announcement: async ({ id, key, value }) => {
      set(({ project }) => ({
        project: {
          ...project,
          announcements: project.announcements.map((announcement) => {
            if (announcement.id !== id) return announcement
            return {
              ...announcement,
              [key]: value,
            }
          }),
        },
      }))
    },
  },
}))

export default useClientStore
