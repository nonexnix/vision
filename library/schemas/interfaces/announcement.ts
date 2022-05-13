import IMember from './member'
import IParticipant from './participant'
import IProject from './project'

interface IAnnouncement {
  id: string
  name: string
  description: string
  createdAt: string | Date
  updatedAt: string | Date
  member?: IMember
  memberId: string
  project?: IProject
  projectId: string
  participants?: IParticipant
}

export default IAnnouncement
