import { IAnnouncement, IMessage, IProject, ISuggestion, ITask, ITodo } from '../../schemas/interfaces'
import phase from '../../utilities/phase'
import moment from 'moment'
import IFile from '../../schemas/interfaces/file'
import { EPriority, EStatus } from '../../schemas/enums'

interface IPlaceholder {
  project: IProject
  message: IMessage
  task: ITask
  todo: ITodo
  suggestion: ISuggestion
  file: IFile
  announcement: IAnnouncement
}

const placeholder: IPlaceholder = {
  project: {
    id: '',
    name: '',
    description: '',
    code: '',
    over: false,
    preserve: true,
    createdAt: phase(moment().format(), 'iso'),
    updatedAt: phase(moment().format(), 'iso'),
    dueAt: '',
    userId: '',
  },
  message: {
    id: '',
    text: '',
    updatedAt: phase(moment().format(), 'iso'),
    createdAt: phase(moment().format(), 'iso'),
    memberId: '',
    projectId: '',
  },
  task: {
    id: '',
    name: '',
    description: '',
    priority: EPriority.MEDIUM,
    rate: 10,
    over: false,
    createdAt: phase(moment().format(), 'iso'),
    updatedAt: phase(moment().format(), 'iso'),
    dueAt: '',
    memberId: '',
    projectId: '',
  },
  todo: {
    id: '',
    name: '',
    description: '',
    priority: EPriority.MEDIUM,
    over: false,
    createdAt: phase(moment().format(), 'iso'),
    updatedAt: phase(moment().format(), 'iso'),
    dueAt: '',
    memberId: '',
    taskId: '',
  },
  suggestion: {
    id: '',
    name: '',
    description: '',
    rate: 10,
    status: EStatus.PENDING,
    createdAt: phase(moment().format(), 'iso'),
    updatedAt: phase(moment().format(), 'iso'),
    memberId: '',
    projectId: '',
  },
  file: {
    id: '',
    name: '',
    description: '',
    extension: '',
    path: '',
    rate: 10,
    status: EStatus.PENDING,
    createdAt: phase(moment().format(), 'iso'),
    updatedAt: phase(moment().format(), 'iso'),
    memberId: '',
    projectId: '',
  },
  announcement: {
    id: '',
    name: '',
    description: '',
    createdAt: phase(moment().format(), 'iso'),
    updatedAt: phase(moment().format(), 'iso'),
    memberId: '',
    projectId: '',
  },
}

export default placeholder
