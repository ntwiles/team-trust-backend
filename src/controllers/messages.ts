import { IMessage } from '../types/message'
import { MessageModel } from '../dal/messages'
import { Request, Response } from 'express'
import { channelSchema } from '../types/channel'

export const MessagesController = {
    async index(req: Request, res: Response) {
        const channel = await channelSchema.validate(req.params)
        const messages = MessageModel.getByChannel(channel)
        res.status(messages ? 200 : 204).send(messages)
    },

    async create(req: Request, res: Response) {
        const channel = await channelSchema.validate(req.params)
        const { user, body } = req.body

        const message: IMessage = {
            user,
            body,
            timestamp: new Date(),
            channel,
        }

        // TODO: verify that user exists.

        await MessageModel.add(message)
        res.status(201).send()
    },
}
