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
    authorizations: [],
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
      set(({ member, project }) => ({
        member: {
          ...member,
          authorizations: member.authorizations.map((authorization) => {
            if (authorization.role.id !== id) return authorization
            return {
              ...authorization,
              [key]: value,
            }
          }),
        },
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
      set(({ member, project }) => ({
        member: {
          ...member,
          authorizations: member.authorizations.map((authorization) => {
            if (authorization.role.permission!.id !== id) return authorization
            return {
              ...authorization,
              role: {
                ...authorization.role,
                permission: {
                  ...authorization.role.permission!,
                  [key]: value,
                },
              },
            }
          }),
        },
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
  delete: {
    member: async ({ id }) => {
      set(({ project }) => ({
        project: {
          ...project,
          members: project.members.filter((member) => {
            if (member.id !== id) return member
          }),
        },
      }))
    },
    role: async ({ id }) => {
      set(({ project }) => ({
        project: {
          ...project,
          roles: project.roles.filter((role) => {
            if (role.id !== id) return role
          }),
        },
      }))
    },
    authorization: async ({ id }) => {
      set(({ member, project }) => ({
        member: {
          ...member,
          authorizations: member.authorizations.filter((authorization) => {
            if (authorization.id !== id) return authorization
          }),
        },
        project: {
          ...project,
          members: project.members.map((member) => ({
            ...member,
            authorizations: member.authorizations.filter((authorization) => {
              if (authorization.id !== id) return authorization
            }),
          })),
          roles: project.roles.map((role) => ({
            ...role,
            authorizations: role.authorizations.filter((authorization) => {
              if (authorization.id !== id) return authorization
            }),
          })),
        },
      }))
    },
    message: async ({ id }) => {
      set(({ messages }) => ({
        messages: messages.filter((message) => {
          if (message.id !== id) return message
        }),
      }))
    },
    reaction: async ({ id }) => {
      set(({ messages }) => ({
        messages: messages.map((message) => ({
          ...message,
          reactions: message.reactions.filter((reaction) => {
            if (reaction.id !== id) return reaction
          }),
        })),
      }))
    },
    task: async ({ id }) => {
      set(({ project }) => ({
        project: {
          ...project,
          tasks: project.tasks.filter((task) => {
            if (task.id !== id) return task
          }),
        },
      }))
    },
    todo: async ({ id }) => {
      set(({ project }) => ({
        project: {
          ...project,
          tasks: project.tasks.map((task) => ({
            ...task,
            todos: task.todos.filter((todo) => {
              if (todo.id !== id) return todo
            }),
          })),
        },
      }))
    },
    suggestion: async ({ id }) => {
      set(({ project }) => ({
        project: {
          ...project,
          suggestions: project.suggestions.filter((suggestion) => {
            if (suggestion.id !== id) return suggestion
          }),
        },
      }))
    },
    vote: async ({ id }) => {
      set(({ project }) => ({
        project: {
          ...project,
          suggestions: project.suggestions.map((suggestion) => ({
            ...suggestion,
            votes: suggestion.votes.filter((vote) => {
              if (vote.id !== id) return vote
            }),
          })),
        },
      }))
    },
    file: async ({ id }) => {
      set(({ project }) => ({
        project: {
          ...project,
          files: project.files.filter((file) => {
            if (file.id !== id) return file
          }),
        },
      }))
    },
    announcement: async ({ id }) => {
      set(({ project }) => ({
        project: {
          ...project,
          announcements: project.announcements.filter((announcement) => {
            if (announcement.id !== id) return announcement
          }),
        },
      }))
    },
    participant: ({ id, key }) => {
      switch (key) {
        case 'tasks': {
          set(({ project }) => ({
            project: {
              ...project,
              [key]: project[key].map((element) => ({
                ...element,
                participants: element.participants.filter((participant) => {
                  if (participant.id !== id) return participant
                }),
              })),
            },
          }))
          break
        }
        case 'todos': {
          set(({ project }) => ({
            project: {
              ...project,
              tasks: project.tasks.map((task) => ({
                ...task,
                [key]: task[key].map((element) => ({
                  ...element,
                  participants: element.participants.filter((participant) => {
                    if (participant.id !== id) return participant
                  }),
                })),
              })),
            },
          }))
          break
        }
        case 'suggestions': {
          set(({ project }) => ({
            project: {
              ...project,
              [key]: project[key].map((element) => ({
                ...element,
                participants: element.participants.filter((participant) => {
                  if (participant.id !== id) return participant
                }),
              })),
            },
          }))
          break
        }
        case 'files': {
          set(({ project }) => ({
            project: {
              ...project,
              [key]: project[key].map((element) => ({
                ...element,
                participants: element.participants.filter((participant) => {
                  if (participant.id !== id) return participant
                }),
              })),
            },
          }))
          break
        }
        case 'announcements': {
          set(({ project }) => ({
            project: {
              ...project,
              [key]: project[key].map((element) => ({
                ...element,
                participants: element.participants.filter((participant) => {
                  if (participant.id !== id) return participant
                }),
              })),
            },
          }))
          break
        }
      }
    },
    ticket: async ({ id }) => {
      set(({ user, project }) => ({
        user: {
          ...user,
          tickets: user.tickets.filter((ticket) => {
            if (ticket.id !== id) return ticket
          }),
        },
        project: {
          ...project,
          ticket: project.tickets.filter((ticket) => {
            if (ticket.id !== id) return ticket
          }),
        },
      }))
    },
  },
}))

export default useClientStore
