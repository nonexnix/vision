import { IMessage, IProject } from '../../schemas/interfaces'
import cuid from 'cuid'
import phase from '../../utilities/phase'
import moment from 'moment'

const placeholder: { project: IProject; message: IMessage } = {
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
}

export default placeholder
