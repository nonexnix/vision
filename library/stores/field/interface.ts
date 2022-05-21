import { IAnnouncement, IMessage, IProject, ISuggestion, ITask, ITodo } from '../../schemas/interfaces'
import IFile from '../../schemas/interfaces/file'

interface IUseFieldStore {
  project: {
    value: IProject
    set: (payload: IProject) => void
    clear: () => void
  }
  message: {
    value: IMessage
    set: (payload: IMessage) => void
    clear: () => void
  }
  task: {
    value: ITask
    set: (payload: ITask) => void
    clear: () => void
  }
  todo: {
    value: ITodo
    set: (payload: ITodo) => void
    clear: () => void
  }
  suggestion: {
    value: ISuggestion
    set: (payload: ISuggestion) => void
    clear: () => void
  }
  file: {
    value: IFile
    set: (payload: IFile) => void
    clear: () => void
  }
  announcement: {
    value: IAnnouncement
    set: (payload: IAnnouncement) => void
    clear: () => void
  }
}

export default IUseFieldStore
