import type { IMessage, IProject, IUser } from "../../schemas/interfaces";

const placeholder: { user: IUser; project: IProject; messages: IMessage[] } = {
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
