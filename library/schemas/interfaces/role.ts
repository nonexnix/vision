import IAuthorization from './authorization'
import IPermission from './permission'
import IProject from './project'

interface IRole {
  id: string
  name: string
  description: string
  permanent: boolean
  constant: boolean
  project?: IProject
  projectId: string
  permission?: IPermission
  authorizations?: IAuthorization[]
}

export default IRole
