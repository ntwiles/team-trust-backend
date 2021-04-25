import { Channel } from './channel'
import { User } from './user'

export interface IMessage {
    body: string
    timestamp: Date
    user: User | string
    channel: Channel
}
