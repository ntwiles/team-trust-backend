import { IChannel } from './channel'
import { IUser } from './user'

export interface IMessage {
    body: string
    timestamp: Date
    user: IUser | string
    channel: IChannel
}
