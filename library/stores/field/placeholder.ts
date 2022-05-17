import { IMessage, IProject } from '../../schemas/interfaces'
import cuid from 'cuid'
import phase from '../../utilities/phase'
import moment from 'moment'

const placeholder: { project: IProject; message: IMessage } = {
  project: {
    id: cuid(),
    name: '',
    description: '',
    code: '',
    over: false,
    preserve: true,
    createdAt: phase(moment().format()),
    updatedAt: phase(moment().format()),
    dueAt: '',
    userId: '',
  },
  message: {
    id: cuid(),
    text: '',
    createdAt: phase(moment().format()),
    updatedAt: phase(moment().format()),
    memberId: '',
    projectId: '',
  },
}

export default placeholder
