import IAnnouncement from './announcement'
import IAuthorization from './authorization'
import IFile from './file'
import IMessage from './message'
import IParticipant from './participant'
import IProject from './project'
import IReaction from './reaction'
import ISuggestion from './suggestion'
import ITask from './task'
import ITodo from './todo'
import IUser from './user'

interface IMember {
  id: string
  rating: number
  active: boolean
  createdAt: string
  updatedAt: string
  user?: IUser
  userId: string
  project?: IProject
  projectId: string
  authorizations?: IAuthorization[]
  messages?: IMessage[]
  reactions?: IReaction[]
  tasks?: ITask[]
  todos?: ITodo[]
  suggestions?: ISuggestion[]
  files?: IFile[]
  announcements?: IAnnouncement[]
  participants?: IParticipant[]
}

export default IMember
