import type { Emoji, Mark, Priority, Status, Token } from '@prisma/client'

type UseClientStore = {
  user: User
  member: Member
  project: Project
  messages: Message[]
  read: (
    payload:
      | { key: 'user'; value: User }
      | { key: 'member'; value: Member }
      | { key: 'project'; value: Project }
      | { key: 'messages'; value: Message[] }
  ) => void
}

export default UseClientStore

type PrimaryKey = string
type ForeignKey = string

export type Announcement<D = string> = {
  id: PrimaryKey
  name: string
  description: string
  createdAt: D
  updatedAt: D
  member?: Member
  memberId: ForeignKey
  project?: Project
  projectId: ForeignKey
  participants?: Participant[]
}

export type Authorization = {
  id: PrimaryKey
  member?: Member
  memberId: ForeignKey
  role?: Role
  roleId: ForeignKey
}

export type File<D = string> = {
  id: PrimaryKey
  name: string
  description: string
  extension: string
  path: string
  rate: number
  status: Status
  createdAt: D
  updatedAt: D
  member?: Member
  memberId: ForeignKey
  project?: Project
  projectId: ForeignKey
  participants?: Participant[]
}

export type Member<D = string> = {
  id: PrimaryKey
  rating: number
  active: boolean
  createdAt: D
  updatedAt: D
  user?: User
  userId: ForeignKey
  project?: Project
  projectId: ForeignKey
  authorizations?: Authorization[]
  messages?: Message[]
  reactions?: Reaction[]
  tasks?: Task[]
  todos?: Todo[]
  suggestions?: Suggestion[]
  votes?: Vote[]
  files?: File[]
  announcements?: Announcement[]
  participants?: Participant[]
}

export type Message<D = string> = {
  id: PrimaryKey
  text: string
  createdAt: D
  updatedAt: D
  member?: Member
  memberId: ForeignKey
  project?: Project
  projectId: ForeignKey
  reactions?: Reaction[]
}

export type Participant = {
  id: PrimaryKey
  access: boolean
  member?: Member
  memberId: string
  task?: Task
  taskId?: ForeignKey
  todo?: Todo
  todoId?: ForeignKey
  suggestion?: Suggestion
  suggestionId?: ForeignKey
  file?: File
  fileId?: ForeignKey
  announcement?: Announcement
  announcementId?: ForeignKey
}

export type Permission = {
  id: PrimaryKey
  everything: boolean
  project: boolean
  message: boolean
  task: boolean
  todo: boolean
  suggestion: boolean
  file: boolean
  announcement: boolean
  ticket: boolean
  role?: Role
  roleId?: ForeignKey
}

export type Project<D = string> = {
  id: PrimaryKey
  name: string
  description: string
  code: string
  preserve: boolean
  over: boolean
  createdAt: D
  updatedAt: D
  dueAt: D
  user?: User
  userId: ForeignKey
  members?: Member[]
  roles?: Role[]
  messages?: Message[]
  tasks?: Task[]
  suggestions?: Suggestion[]
  files?: File[]
  announcements?: Announcement[]
  tickets?: Ticket[]
}

export type Reaction = {
  id: PrimaryKey
  emoji: Emoji
  member?: Member
  memberId: ForeignKey
  message?: Message
  messageId: ForeignKey
}

export type Role = {
  id: PrimaryKey
  name: string
  description: string
  permanent: boolean
  constant: boolean
  project?: Project
  projectId: ForeignKey
  permission?: Permission
  authorizations?: Authorization[]
}

export type Suggestion<D = string> = {
  id: PrimaryKey
  name: string
  description: string
  rate: number
  status: Status
  createdAt: D
  updatedAt: D
  member?: Member
  memberId: ForeignKey
  project?: Project
  projectId: ForeignKey
  participants?: Participant[]
  votes?: Vote[]
}

export type Task<D = string> = {
  id: PrimaryKey
  name: string
  description: string
  rate: number
  priority: Priority
  over: boolean
  createdAt: D
  updatedAt: D
  dueAt: D
  member?: Member
  memberId: ForeignKey
  project?: Project
  projectId: ForeignKey
  todos?: Todo[]
  participants?: Participant[]
}

export type Ticket = {
  id: PrimaryKey
  code: string
  token: Token
  user?: User
  userId: ForeignKey
  project?: Project
  projectId: ForeignKey
}

export type Todo<D = string> = {
  id: PrimaryKey
  name: string
  description: string
  priority: Priority
  over: boolean
  createdAt: D
  updatedAt: D
  dueAt: D
  member?: Member
  memberId: ForeignKey
  task?: Task
  taskId: ForeignKey
  participants?: Participant[]
}

export type User<D = string> = {
  id: PrimaryKey
  email: string
  username: string
  firstName: string
  lastName: string
  image: string
  createdAt: D
  updatedAt: D
  members?: Member[]
  projects?: Project[]
  tickets?: Ticket[]
}

export type Vote = {
  id: PrimaryKey
  mark: Mark
  member: Member
  memberId: ForeignKey
  suggestion: Suggestion
  suggestionId: ForeignKey
}
