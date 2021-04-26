import { IChannel } from './channel'
import { User } from './user'
import { object, string, InferType } from 'yup'

export interface IMessage {
    body: string
    timestamp: Date
    user: User | string
    channel: IChannel
}

export const messageCreateReqSchema = object({
    user: string().required(),
    body: string().required(),
}).noUnknown().required()

export type MessageCreateReq = InferType<typeof messageCreateReqSchema>