import { readFile, writeFile } from '../fileIO'
import { HttpError } from '../types/error'

export class InterestModel {
    static interests: string[]

    constructor() {
        throw new Error('Initialize using InterestModel.init()')
    }

    static async save() {
        return writeFile('data/interests.json', JSON.stringify(InterestModel.interests))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async init() {
        return readFile('data/interests.json')
            .then(data => (InterestModel.interests = JSON.parse(data.toString())))
            .catch(err => { throw new HttpError(500, err) })
    }

    static get() {
        return [...InterestModel.interests];
    }

    static add(interest: string) {
        InterestModel.interests.push(interest)
        return InterestModel.save()
    }
}
