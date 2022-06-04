import type { Emoji, Mark, Priority, Status, Token } from '@prisma/client'

export type Announcement<D = string> = {
  id: string
  name: string
  description: string
  createdAt: D
  updatedAt: D
  member?: Member
  memberId: string
  project?: Project
  projectId: string
  participants?: Participant[]
}

export type Authorization = {
  id: string
  member?: Member
  memberId: string
  role?: Role
  roleId: string
}

export type File<D = string> = {
  id: string
  name: string
  description: string
  extension: string
  path: string
  rate: number
  status: Status
  createdAt: D
  updatedAt: D
  member?: Member
  memberId: string
  project?: Project
  projectId: string
  participants?: Participant[]
}

export type Member<D = string> = {
  id: string
  rating: number
  active: boolean
  createdAt: D
  updatedAt: D
  user?: User
  userId: string
  project?: Project
  projectId: string
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
  id: string
  text: string
  createdAt: D
  updatedAt: D
  member?: Member
  memberId: string
  project?: Project
  projectId: string
  reactions?: Reaction[]
}

export type Participant = {
  id: string
  access: boolean
  member?: Member
  memberId: string
  task?: Task
  taskId?: string
  todo?: Todo
  todoId?: string
  suggestion?: Suggestion
  suggestionId?: string
  file?: File
  fileId?: string
  announcement?: Announcement
  announcementId?: string
}

export type Permission = {
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
  role?: Role
  roleId?: string
}

export type Project<D = string> = {
  id: string
  name: string
  description: string
  code: string
  preserve: boolean
  over: boolean
  createdAt: D
  updatedAt: D
  dueAt: D
  user?: User
  userId: string
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
  id: string
  emoji: Emoji
  member?: Member
  memberId: string
  message?: Message
  messageId: string
}

export type Role = {
  id: string
  name: string
  description: string
  permanent: boolean
  constant: boolean
  project?: Project
  projectId: string
  permission?: Permission
  authorizations?: Authorization[]
}

export type Suggestion<D = string> = {
  id: string
  name: string
  description: string
  rate: number
  status: Status
  createdAt: D
  updatedAt: D
  member?: Member
  memberId: string
  project?: Project
  projectId: string
  participants?: Participant[]
  votes?: Vote[]
}

export type Task<D = string> = {
  id: string
  name: string
  description: string
  rate: number
  priority: Priority
  over: boolean
  createdAt: D
  updatedAt: D
  dueAt: D
  member?: Member
  memberId: string
  project?: Project
  projectId: string
  todos?: Todo[]
  participants?: Participant[]
}

export type Ticket = {
  id: string
  code: string
  token: Token
  user?: User
  userId: string
  project?: Project
  projectId: string
}

export type Todo<D = string> = {
  id: string
  name: string
  description: string
  priority: Priority
  over: boolean
  createdAt: D
  updatedAt: D
  dueAt: D
  member?: Member
  memberId: string
  task?: Task
  taskId: string
  participants?: Participant[]
}

export type User<D = string> = {
  id: string
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
  id: string
  mark: Mark
  member: Member
  memberId: string
  suggestion: Suggestion
  suggestionId: string
}
