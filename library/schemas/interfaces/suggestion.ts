import { TStatus } from '../types'
import IMember from './member'
import IParticipant from './participant'
import IProject from './project'

interface ISuggestion {
  id: string
  name: string
  description: string
  rate: number
  status: TStatus
  createdAt: string | Date
  updatedAt: string | Date
  member?: IMember
  memberId: string
  project?: IProject
  projectId: string
  participants?: IParticipant[]
}

export default ISuggestion
