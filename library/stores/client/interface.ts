import type { IMember, IMessage, IProject, IUser } from '../../schemas/interfaces'
import type { TEmoji, TMark, TPriority, TStatus } from '../../schemas/types'

interface IUseClientStore {
  user: IUser
  member: IMember
  project: IProject
  messages: IMessage[]
  loader: boolean
  read: IRead
  create: ICreate
  delete: IDelete
  update: IUpdate
}

interface IRead {
  user: (payload: IUser) => void
  member: (payload: IMember) => void
  project: (payload: IProject) => void
  messages: (payload: IMessage[]) => void
}

interface ICreate {
  user: (payload: { email: string; username: string; firstName: string; lastName: string; image?: string }) => void
  member: (payload: { userId: string; projectId: string }) => void
  members: (payload: { userId: string; projectId: string }[]) => void
  project: (payload: { name: string; description: string; dueAt: string; userId: string }) => void
  role: (payload: { name: string; description: string; projectId: string }) => void
  authorization: (payload: { memberId: string; roleId: string }) => void
  message: (payload: { text: string; memberId: string; projectId: string }) => void
  reaction: (payload: { emoji: TEmoji; memberId: string; messageId: string }) => void
  task: (payload: {
    name: string
    description: string
    priority: TPriority
    dueAt: string
    memberId: string
    projectId: string
    participants?: { access?: boolean; memberId: string }[]
  }) => void
  todo: (payload: {
    name: string
    description: string
    priority: string
    dueAt: string
    memberId: string
    taskId: string
    participants?: { access?: boolean; memberId: string }[]
  }) => void
  suggestion: (payload: {
    name: string
    description: string
    memberId: string
    projectId: string
    participants?: { access?: boolean; memberId: string }[]
  }) => void
  vote: (payload: { mark: TMark; memberId: string; suggestionId: string }) => void
  file: (payload: {
    name: string
    description: string
    extension: string
    path: string
    memberId: string
    projectId: string
    participants?: { access?: boolean; memberId: string }[]
  }) => void
  announcement: (payload: {
    name: string
    description: string
    memberId: string
    projectId: string
    participants?: { access?: boolean; memberId: string }[]
  }) => void
  participant: (payload: { access?: boolean; memberId: string; key: IParticipantKey; value: string }) => void
  participants: (payload: { access?: boolean; memberId: string; key: IParticipantKey; value: string }[]) => void
  ticket: (payload: { code: string; userId: string; projectId: string }) => void
}

interface IDelete {
  user: (payload: { id: string }) => void
  member: (payload: { id: string }) => void
  project: (payload: { id: string }) => void
  role: (payload: { id: string }) => void
  authorization: (payload: { id: string }) => void
  message: (payload: { id: string }) => void
  reaction: (payload: { id: string }) => void
  task: (payload: { id: string }) => void
  todo: (payload: { id: string }) => void
  suggestion: (payload: { id: string }) => void
  vote: (payload: { id: string }) => void
  file: (payload: { id: string }) => void
  announcement: (payload: { id: string }) => void
  participant: (payload: { id: string }) => void
  ticket: (payload: { id: string }) => void
}

interface IUpdate {
  user: {
    username: (payload: { id: string; key: 'username'; value: string }) => void
    firstName: (payload: { id: string; key: 'firstName'; value: string }) => void
    lastName: (payload: { id: string; key: 'lastName'; value: string }) => void
  }
  member: {
    rating: (payload: { id: string; key: 'rating'; value: number }) => void
    active: (payload: { id: string; key: 'active'; value: boolean }) => void
  }
  project: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: { id: string; key: 'description'; value: string }) => void
    over: (payload: { id: string; key: 'over'; value: boolean }) => void
    preserve: (payload: { id: string; key: 'preserve'; value: boolean }) => void
    dueAt: (payload: { id: string; key: 'dueAt'; value: string }) => void
  }
  role: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: { id: string; key: 'description'; value: string }) => void
  }
  message: {
    text: (payload: { id: string; key: 'text'; value: string }) => void
  }
  task: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: { id: string; key: 'description'; value: string }) => void
    priority: (payload: { id: string; key: 'priority'; value: TPriority }) => void
    over: (payload: { id: string; key: 'over'; value: boolean }) => void
    dueAt: (payload: { id: string; key: 'dueAt'; value: string }) => void
  }
  todo: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: { id: string; key: 'description'; value: string }) => void
    priority: (payload: { id: string; key: 'priority'; value: TPriority }) => void
    over: (payload: { id: string; key: 'over'; value: boolean }) => void
    dueAt: (payload: { id: string; key: 'dueAt'; value: string }) => void
  }
  suggestion: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: { id: string; key: 'description'; value: string }) => void
    status: (payload: { id: string; key: 'status'; value: TStatus }) => void
  }
  vote: {
    mark: (payload: { id: string; key: 'mark'; value: TMark }) => void
  }
  file: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: { id: string; key: 'description'; value: string }) => void
    status: (payload: { id: string; key: 'status'; value: TStatus }) => void
  }
  announcement: {
    name: (payload: { id: string; key: 'name'; value: string }) => void
    description: (payload: { id: string; key: 'description'; value: string }) => void
  }
  participant: {
    access: (payload: { id: string; key: 'access'; value: boolean }) => void
  }
}

export default IUseClientStore

type IParticipantKey = 'taskId' | 'todoId' | 'suggestionId' | 'fileId' | 'announcementId'
