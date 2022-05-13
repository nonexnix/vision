import IAnnouncement from './announcement'
import IFile from './file'
import IMember from './member'
import IMessage from './message'
import IRole from './role'
import ISuggestion from './suggestion'
import ITask from './task'
import ITicket from './ticket'
import IUser from './user'

interface IProject {
  id: string
  name: string
  description: string
  code: string
  preserve: boolean
  over: boolean
  createdAt: string | Date
  updatedAt: string | Date
  dueAt: string | Date
  user?: IUser
  userId: string
  members?: IMember[]
  roles?: IRole[]
  messages?: IMessage[]
  tasks?: ITask[]
  suggestions?: ISuggestion[]
  files?: IFile[]
  announcements?: IAnnouncement[]
  tickets?: ITicket[]
}

export default IProject
