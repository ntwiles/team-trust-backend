import { readFile, writeFile } from '../fileIO'

export class LocationModel {
    static locations: string[]

    constructor() {
        throw new Error('Initialize using InterestModel.init()')
    }

    static async save() {
        return writeFile('data/locations.json', JSON.stringify(LocationModel.locations))
    }

    static async init() {
        return readFile('data/locations.json').then(
            (data) => (LocationModel.locations = JSON.parse(data.toString()))
        )
    }

    static get() {
        return [...LocationModel.locations];
    }

    static add(location: string) {
        LocationModel.locations.push(location)
        return LocationModel.save()
    }
}
