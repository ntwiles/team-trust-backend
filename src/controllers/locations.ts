import { LocationModel } from '../dal/locations'
import { Request, Response } from 'express'

export const LocationsController = {
    async index(req: Request, res: Response) {
        const locations = LocationModel.get()
        res.status(locations.length ? 200 : 204).send(LocationModel.get())
    },
}