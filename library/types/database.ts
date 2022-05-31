import { Emoji, Mark, Priority, Status, Token } from '@prisma/client'

export type Announcement = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
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

export type File = {
  id: string
  name: string
  description: string
  extension: string
  path: string
  rate: number
  status: Status
  createdAt: string
  updatedAt: string
  member?: Member
  memberId: string
  project?: Project
  projectId: string
  participants?: Participant[]
}

export type Member = {
  id: string
  rating: number
  active: boolean
  createdAt: string
  updatedAt: string
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

export type Message = {
  id: string
  text: string
  createdAt: string
  updatedAt: string
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

export type Project = {
  id: string
  name: string
  description: string
  code: string
  preserve: boolean
  over: boolean
  createdAt: string
  updatedAt: string
  dueAt: string
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

export type Suggestion = {
  id: string
  name: string
  description: string
  rate: number
  status: Status
  createdAt: string
  updatedAt: string
  member?: Member
  memberId: string
  project?: Project
  projectId: string
  participants?: Participant[]
  votes?: Vote[]
}

export type Task = {
  id: string
  name: string
  description: string
  rate: number
  priority: Priority
  over: boolean
  createdAt: string
  updatedAt: string
  dueAt: string
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

export type Todo = {
  id: string
  name: string
  description: string
  priority: Priority
  over: boolean
  createdAt: string
  updatedAt: string
  dueAt: string
  member?: Member
  memberId: string
  task?: Task
  taskId: string
  participants?: Participant[]
}

export type User = {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  image: string
  createdAt: string
  updatedAt: string
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
