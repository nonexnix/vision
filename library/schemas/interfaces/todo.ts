import { TStatus } from '../types'
import IMember from './member'
import ITask from './task'

interface ITodo {
  id: string
  name: string
  description: string
  priority: TStatus
  over: boolean
  createdAt: string | Date
  updatedAt: string | Date
  dueAt: string
  member?: IMember
  memberId: string
  task?: ITask
  taskId: string
}

export default ITodo
