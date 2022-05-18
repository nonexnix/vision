import type { IMember, IMessage, IProject, IUser } from '../../schemas/interfaces'

const placeholder: { user: IUser; member: IMember; project: IProject; messages: IMessage[] } = {
  user: {
    id: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    image: '',
    createdAt: '',
    updatedAt: '',
  },
  member: {
    id: '',
    rating: 100,
    active: true,
    createdAt: '',
    updatedAt: '',
    userId: '',
    projectId: '',
  },
  project: {
    id: '',
    name: '',
    description: '',
    code: '',
    preserve: true,
    over: false,
    createdAt: '',
    updatedAt: '',
    dueAt: '',
    userId: '',
  },
  messages: [],
}

export default placeholder
