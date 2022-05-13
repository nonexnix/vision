import IMember from './member'
import IProject from './project'
import IReaction from './reaction'

interface IMessage {
  id: string
  text: string
  createdAt: string | Date
  updatedAt: string | Date
  member?: IMember
  memberId: string
  project?: IProject
  projectId: string
  reactions?: IReaction[]
}

export default IMessage
