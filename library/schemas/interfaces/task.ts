import IMember from './member'
import IParticipant from './participant'
import IProject from './project'
import ITodo from './todo'

interface ITask {
  id: string
  name: string
  description: string
  rate: number
  priority: any
  over: boolean
  createdAt: string | Date
  updatedAt: string | Date
  dueAt: string
  member?: IMember
  memberId: string
  project?: IProject
  projectId: string
  todos?: ITodo[]
  participants?: IParticipant[]
}

export default ITask
