import { readFile, writeFile } from '../fileIO'
import { HttpError } from '../types/error'
import { locationsSchema } from '../types/channel'

export class LocationModel {
    static locations: string[]
    static filePath: string

    constructor() {
        throw new Error('Initialize using LocationModel.init()')
    }

    static async save(): Promise<void> {
        return writeFile(LocationModel.filePath, JSON.stringify(LocationModel.locations))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async init(path: string): Promise<void> {
        LocationModel.filePath = path
        await readFile(LocationModel.filePath)
            .then(async buffer => {
                const data: unknown = JSON.parse(buffer.toString())
                const locations: string[] = await locationsSchema.validate(data)
                LocationModel.locations = locations
            })
            .catch(err => { throw new HttpError(500, err) })
    }

    static get(): string[] {
        return [...LocationModel.locations];
    }

    static async add(location: string): Promise<void> {
        if (!location) throw new HttpError(400, `Cannot add empty interest.`)
        if (LocationModel.locations.includes(location))
            throw new HttpError(400, `Could not add location. Location already exists: ${location}`)
        LocationModel.locations.push(location)
        return LocationModel.save()
    }
}