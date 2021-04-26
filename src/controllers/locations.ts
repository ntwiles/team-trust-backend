import { LocationModel } from '../dal/locations'
import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../types/error'

export const LocationsController = {
    index(_: Request, res: Response, next: NextFunction): void {
        let locations
        try { locations = LocationModel.get() }
        catch (err) { return next(new HttpError(500, err)) }

        res.status(locations.length ? 200 : 204).send(locations)
    }
}