import IProject from './project'
import IUser from './user'

interface ITicket {
  id: string
  code: string
  user?: IUser
  userId: string
  project?: IProject
  projectId: string
}

export default ITicket
