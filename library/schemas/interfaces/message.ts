import IMember from './member'
import IProject from './project'
import IReaction from './reaction'

interface IMessage {
  id: string
  text: string
  createdAt: string
  updatedAt: string
  member?: IMember
  memberId: string
  project?: IProject
  projectId: string
  reactions?: IReaction[]
}

export default IMessage
