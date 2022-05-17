import { IMessage, IProject } from '../../schemas/interfaces'

interface IUseFieldStore {
  project: IProject
  message: IMessage
  set: {
    project: (payload: IProject) => void
    message: (payload: IMessage) => void
  }
  clear: {
    project: (payload: IProject) => void
    message: (payload: IMessage) => void
  }
}

export default IUseFieldStore
