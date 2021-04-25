import { Request, Response } from 'express'
import { UserModel } from '../dal/users'
import { channelSchema, IChannel } from '../types/channel'

export const UsersController = {
    async index(req: Request, res: Response) {
        await channelSchema.validate(req.params)
            .then((channel) => {
                const users = UserModel.getByChannel(channel as IChannel)
                res.status(users.length ? 200 : 204).send(users)
            })
            .catch(e => res.status(400).send(e))
    },

    async show(req: Request, res: Response) {
        const { userId } = req.params;
        const user = UserModel.getById(userId!)
        res.status(200).send(user)
    },
}
