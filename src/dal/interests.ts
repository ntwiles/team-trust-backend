import { readFile, writeFile } from '../fileIO'
import { interestsSchema } from '../types/channel'
import { HttpError } from '../types/error'

export class InterestModel {
    static interests: string[]
    static filePath: string

    constructor() {
        throw new Error('Initialize using InterestModel.init()')
    }

    static async save(): Promise<void> {
        return writeFile(InterestModel.filePath, JSON.stringify(InterestModel.interests))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async init(path: string): Promise<void> {
        InterestModel.filePath = path

        await readFile(InterestModel.filePath)
            .then(async buffer => {
                // eslint-disable-next-line
                const data: any = JSON.parse(buffer.toString())
                InterestModel.interests = await interestsSchema.validate(data)
            })
            .catch(err => { throw new HttpError(500, err) })
    }

    static get(): string[] {
        return [...InterestModel.interests];
    }

    static async add(interest: string): Promise<void> {
        if (!interest) throw new HttpError(400, `Cannot add empty interest.`)
        if (InterestModel.interests.includes(interest))
            throw new HttpError(400, `Could not add interst. Interest already exists: ${interest}`)

        InterestModel.interests.push(interest)
        return InterestModel.save()
    }
}
