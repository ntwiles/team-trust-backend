import { readFile, writeFile } from '../fileIO'
import { HttpError } from '../types/error'

export class InterestModel {
    static interests: string[]
    static filePath: string

    constructor() {
        throw new Error('Initialize using InterestModel.init()')
    }

    static async save() {
        return writeFile(InterestModel.filePath, JSON.stringify(InterestModel.interests))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async init(path: string) {
        InterestModel.filePath = path

        return readFile(InterestModel.filePath)
            .then(data => (InterestModel.interests = JSON.parse(data.toString())))
            .catch(err => { throw new HttpError(500, err) })
    }

    static get() {
        return [...InterestModel.interests];
    }

    static async add(interest: string) {
        if (!interest) throw new HttpError(400, `Cannot add empty interest.`)
        if (InterestModel.interests.includes(interest))
            throw new HttpError(400, `Could not add interst. Interest already exists: ${interest}`)

        InterestModel.interests.push(interest)
        return InterestModel.save()
    }
}
