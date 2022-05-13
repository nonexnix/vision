import IMember from './member'
import IRole from './role'

interface IAuthorization {
  id: string
  member?: IMember
  memberId: string
  role?: IRole
  roleId: string
}

export default IAuthorization
