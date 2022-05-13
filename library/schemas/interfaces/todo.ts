import { TStatus } from '../types'
import IMember from './member'
import IParticipant from './participant'
import ITask from './task'

interface ITodo {
  id: string
  name: string
  description: string
  rate: number
  priority: TStatus
  over: number
  createdAt: string
  updatedAt: string
  dueAt: string
  member?: IMember
  memberId: string
  task?: ITask
  taskId: string
  participants?: IParticipant[]
}

export default ITodo
