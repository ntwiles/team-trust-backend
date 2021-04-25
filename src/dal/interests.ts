import { readFile, writeFile } from '../fileIO'

export class InterestModel {
    static interests: string[]

    constructor() {
        throw new Error('Initialize using InterestModel.init()')
    }

    static async save() {
        return writeFile('data/interests.json', JSON.stringify(InterestModel.interests))
    }

    static async init() {
        return readFile('data/interests.json').then(
            (data) => (InterestModel.interests = JSON.parse(data.toString()))
        )
    }

    static get() {
        return [...InterestModel.interests];
    }

    static add(interest: string) {
        InterestModel.interests.push(interest)
        return InterestModel.save()
    }
}
