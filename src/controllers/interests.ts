import { InterestModel } from '../dal/interests'
import { NextFunction, Request, Response } from 'express'

export const InterestsController = {
    index(_: Request, res: Response, next: NextFunction): void {
        let interests
        try { interests = InterestModel.get() }
        catch (err) { return next(err) }

        res.status(interests.length ? 200 : 204).send(interests)
    },
}