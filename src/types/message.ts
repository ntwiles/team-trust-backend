import { channelSchema } from './channel'
import { object, string, InferType, date, mixed } from 'yup'

export const messageSchema = object({
    body: string().required(),
    timestamp: date().required(),
    user: mixed(),
    channel: channelSchema.required()
})

export type Message = InferType<typeof messageSchema>

export const messageCreateReqSchema = object({
    user: string().required(),
    body: string().required(),
}).noUnknown().required()

export type MessageCreateReq = InferType<typeof messageCreateReqSchema>