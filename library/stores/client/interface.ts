import type { IMessage, IProject, IUser } from '../../schemas/interfaces'
import type { TPriority } from '../../schemas/types'

interface IUseClientStore {
  user: IUser
  project: IProject
  messages: IMessage[]
  read: IRead
  create: ICreate
  delete: IDelete
  update: IUpdate
}

interface IRead {
  user: (payload: IUser) => void
  project: (payload: IProject) => void
  messages: (payload: IMessage[]) => void
}

interface ICreate {
  user: (payload: { email: string; username: string; firstName: string; lastName: string; image?: string }) => void
  member: (payload: { userId: string; projectId: string }) => void
  members: (payload: { userId: string; projectId: string }[]) => void
  project: (payload: { name: string; description: string; dueAt: string; userId: string }) => void
  message: (payload: { text: string; memberId: string; projectId: string }) => void
  task: (payload: {
    name: string
    description: string
    priority: TPriority
    dueAt: string
    memberId: string
    projectId: string
    participants: { access?: boolean; memberId: string }[]
  }) => void
  participant: (payload: { access?: boolean; memberId: string; key: 'taskId' | 'todoId' | 'suggestionId' | 'fileId' | 'announcementId'; value: string }) => void
  participants: (payload: { access?: boolean; memberId: string; key: 'taskId' | 'todoId' | 'suggestionId' | 'fileId' | 'announcementId'; value: string }[]) => void
  ticket: (payload: { code: string; userId: string; projectId: string }) => void
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

interface IUpdate {
  user: {
    username: (payload: { id: string; key: 'username'; value: string }) => void
    firstName: (payload: { id: string; key: 'firstName'; value: string }) => void
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
    description: (payload: { id: string; key: 'description'; value: string }) => void
    priority: (payload: { id: string; key: 'priority'; value: TPriority }) => void
    over: (payload: { id: string; key: 'over'; value: boolean }) => void
  }
}

export default IUseClientStore
