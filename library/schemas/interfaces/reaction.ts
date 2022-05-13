import { TEmoji } from '../types'
import IMember from './member'
import IMessage from './message'

interface IReaction {
  id: string
  emoji: TEmoji
  member?: IMember
  memberId: string
  message?: IMessage
  messageId: string
}

export default IReaction
