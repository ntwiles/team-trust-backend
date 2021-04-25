import { InterestModel } from '../dal/interests'
import { Request, Response } from 'express'

export const InterestsController = {
    async index(req: Request, res: Response) {
        const interests = InterestModel.get()
        res.status(interests.length ? 200 : 204).send(InterestModel.get())
    },
}