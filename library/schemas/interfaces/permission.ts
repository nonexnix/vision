import IRole from './role'

interface IPermission {
  id: string
  project: boolean
  message: boolean
  task: boolean
  todo: boolean
  suggestion: boolean
  file: boolean
  announcement: boolean
  ticket: boolean
  role?: IRole
}

export default IPermission
