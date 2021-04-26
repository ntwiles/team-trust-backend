import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../dal/users'
import { HttpError } from '../types/error'
import { userUpdateReqSchema, UserUpdateReq, User } from '../types/user'

export const UsersController = {
    async index(req: Request, res: Response, next: NextFunction) {
        const { interest, location } = req.params

        try {
            const users = UserModel.getByChannel({ interest, location })
            res.status(users.length ? 200 : 204).send(users)
        } catch (err) {
            return next(new HttpError(500, err))
        }
    },

    async show(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;

        let user: User
        try { user = UserModel.getById(userId!) }
        catch (err) { return next(err) }

        res.status(200).send(user)
    },

    async update(req: Request, res: Response, next: NextFunction) {
        let update: UserUpdateReq
        try { update = await userUpdateReqSchema.validate(req.body) }
        catch (err) { return next(new HttpError(400, err)) }

        const { userId } = req.params;

        try { await UserModel.updateById(userId, update!) }
        catch (err) { return next(err) }

        res.status(200).send()
    }
}