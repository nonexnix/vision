import { TStatus } from '../types'
import IAnnouncement from './announcement'
import IFile from './file'
import IMember from './member'
import ISuggestion from './suggestion'
import ITask from './task'
import ITodo from './todo'

interface IParticipant {
  id: string
  access: boolean
  member?: IMember
  memberId: string
  task?: ITask
  taskId?: string
  todo?: ITodo
  todoId?: string
  suggestion?: ISuggestion
  suggestionId?: string
  file?: IFile
  fileId?: string
  announcement?: IAnnouncement
  announcementId?: string
}

export default IParticipant
