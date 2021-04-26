import { readFile, writeFile } from '../fileIO'
import { HttpError } from '../types/error'

export class LocationModel {
    static locations: string[]
    static filePath: string

    constructor() {
        throw new Error('Initialize using LocationModel.init()')
    }

    static async save() {
        return writeFile(LocationModel.filePath, JSON.stringify(LocationModel.locations))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async init(path: string) {
        LocationModel.filePath = path
        return readFile(LocationModel.filePath)
            .then(data => (LocationModel.locations = JSON.parse(data.toString())))
            .catch(err => { throw new HttpError(500, err) })
    }

    static get() {
        return [...LocationModel.locations];
    }

    static async add(location: string) {
        if (!location) throw new HttpError(400, `Cannot add empty interest.`)
        if (LocationModel.locations.includes(location))
            throw new HttpError(400, `Could not add location. Location already exists: ${location}`)
        LocationModel.locations.push(location)
        return LocationModel.save()
    }
}