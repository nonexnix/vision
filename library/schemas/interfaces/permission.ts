import IRole from './role'

interface IPermission {
  id: string
  everything: boolean
  project: boolean
  message: boolean
  task: boolean
  todo: boolean
  suggestion: boolean
  file: boolean
  announcement: boolean
  ticket: boolean
  role?: IRole
  roleId?: string
}

export default IPermission
