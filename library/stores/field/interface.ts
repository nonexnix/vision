import { IAnnouncement, IMessage, IProject, ISuggestion, ITask, ITodo } from '../../schemas/interfaces'
import IFile from '../../schemas/interfaces/file'

interface IUseFieldStore {
  project: IProject
  message: IMessage
  task: ITask
  todo: ITodo
  suggestion: ISuggestion
  file: IFile
  announcement: IAnnouncement
  set: {
    project: (payload: IProject) => void
    message: (payload: IMessage) => void
    task: (payload: ITask) => void
    todo: (payload: ITodo) => void
    suggestion: (payload: ISuggestion) => void
    file: (payload: IFile) => void
    announcement: (payload: IAnnouncement) => void
  }
  clear: {
    project: (payload: IProject) => void
    message: () => void
    task: () => void
    todo: () => void
    suggestion: () => void
    file: () => void
    announcement: () => void
  }
}

export default IUseFieldStore
