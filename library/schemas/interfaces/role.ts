import IAuthorization from './authorization'
import IPermission from './permission'
import IProject from './project'

interface IRole {
  id: string
  name: string
  description: string
  default: boolean
  project?: IProject
  projectId: string
  permission?: IPermission
  authorizations?: IAuthorization[]
}

export default IRole
