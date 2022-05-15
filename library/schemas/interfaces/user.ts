import IMember from './member'
import IProject from './project'
import ITicket from './ticket'

interface IUser {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  image: string
  createdAt: string | Date
  updatedAt: string | Date
  members?: IMember[]
  projects?: IProject[]
  tickets?: ITicket[]
}

export default IUser
