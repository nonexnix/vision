import { IMessage, IProject } from '../../schemas/interfaces'

interface IUseFieldStore {
  project: IProject
  message: IMessage
  set: {
    project: (payload: IProject) => void
    message: (payload: IMessage) => void
  }
  clear: {
    project: () => void
    message: () => void
  }
}

export default IUseFieldStore
