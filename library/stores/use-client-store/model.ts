import { Prisma } from '.prisma/client'

export const user = Prisma.validator<Prisma.UserArgs>()({
  include: {
    members: {
      include: {
        project: {
          include: {
            _count: {
              select: {
                tasks: true,
                roles: true,
              },
            },
            members: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    tickets: {
      include: {
        project: {
          include: {
            _count: {
              select: {
                tasks: true,
                members: true,
              },
            },
            user: true,
          },
        },
      },
    },
  },
})

export const member = Prisma.validator<Prisma.MemberArgs>()({})

export const project = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    members: {
      include: {
        user: true,
        authorizations: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    roles: {
      include: {
        permission: true,
        authorizations: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    tasks: {
      include: {
        todos: {
          include: {
            participants: {
              include: {
                member: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        participants: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    suggestions: {
      include: {
        votes: true,
        participants: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    files: {
      include: {
        participants: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    announcements: {
      include: {
        participants: {
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
    tickets: {
      include: {
        user: true,
      },
    },
  },
})

export const message = Prisma.validator<Prisma.MessageArgs>()({
  include: {
    member: {
      include: {
        user: true,
      },
    },
    reactions: true,
  },
})
