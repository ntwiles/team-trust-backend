import { Request, Response } from 'express'
import { UserModel } from '../dal/users'
import { channelSchema } from '../types/channel'

export const UsersController = {
    async index(req: Request, res: Response) {
        const channel = await channelSchema.validate(req.params)
        const users = UserModel.getByChannel(channel)
        res.status(users ? 200 : 204).send(users)
    },

    async show(req: Request, res: Response) {
        const { userId } = req.params
        // TODO: validate request body
        const user = UserModel.getById(userId)
        res.status(200).send(user)
    },
}
