import IAuthorization from './authorization'
import IPermission from './permission'
import IProject from './project'

interface IRole {
  id: string
  name: string
  description: string
  project?: IProject
  projectId: string
  permission?: IPermission
  permissionId: string
  authorizations?: IAuthorization[]
}

export default IRole
