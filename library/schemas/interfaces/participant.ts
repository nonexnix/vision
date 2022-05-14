import { TStatus } from '../types'
import IAnnouncement from './announcement'
import IFile from './file'
import IMember from './member'
import ISuggestion from './suggestion'
import ITask from './task'

interface IParticipant {
  id: string
  member?: IMember
  memberId: string
  task?: ITask
  taskId: string
  suggestion?: ISuggestion
  suggestionId: string
  file?: IFile
  fileId: string
  announcement?: IAnnouncement
  announcementId: string
}

export default IParticipant
