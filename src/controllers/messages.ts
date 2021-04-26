import { IMessage, MessageCreateReq, messageCreateReqSchema } from '../types/message'
import { MessageModel } from '../dal/messages'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import { HttpError } from '../types/error'
import { UserModel } from '../dal/users'

export const MessagesController = {
    async index(req: Request, res: Response) {
        const { location, interest } = req.params
        const messages = MessageModel.getByChannel({ location, interest })
        res.status(messages.length ? 200 : 204).send(messages)
    },

    async create(req: Request, res: Response, next: NextFunction) {
        let create: MessageCreateReq
        try { create = await messageCreateReqSchema.validate(req.body) }
        catch (err) { return next(new HttpError(400, err)) }

        const { location, interest } = req.params
        const { user, body } = create!

        // Make sure we're not creating a message from a user that doesn't exist.
        try { UserModel.getById(user) }
        catch (err) { return next(err) }

        const message: IMessage = {
            user,
            body,
            timestamp: new Date(),
            channel: {
                location,
                interest
            }
        }

        try { await MessageModel.add(message) }
        catch (err) { return next(err) }

        res.status(201).send()
    },
}