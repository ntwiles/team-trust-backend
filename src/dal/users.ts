import { Channel } from '../types/channel'
import { User, userSchema, UserUpdateReq } from '../types/user'
import { readFile, writeFile } from '../fileIO'
import { HttpError } from '../types/error'
import { v4 as uuid } from 'uuid'
import { array } from 'yup'

export class UserModel {
    static users: User[]
    static filePath: string

    constructor() {
        throw new Error('Initialize using User.init()')
    }

    static async init(path: string): Promise<void> {
        UserModel.filePath = path
        await readFile(UserModel.filePath)
            .then(async buffer => {
                const data: unknown = JSON.parse(buffer.toString())
                UserModel.users = await array().of(userSchema).required().validate(data)
            })
            .catch(err => { throw new HttpError(500, err) })
    }

    static async save(): Promise<void> {
        await writeFile(UserModel.filePath, JSON.stringify(UserModel.users))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async add(partial: Omit<User, 'id'>): Promise<User> {
        const user: User = Object.assign(partial, { id: uuid() })
        UserModel.users.push(user)
        await UserModel.save()
        return user
    }

    static getById(userId: string): User {
        const user = UserModel.users.find((u) => u.id === userId)
        if (!user) throw new HttpError(404, `Could not find user: ${userId}`)
        return user
    }

    static getByChannel(channel: Channel): User[] {
        return UserModel.users.filter(
            (u) =>
                u.locations.includes(channel.location) &&
                u.interests.includes(channel.interest)
        )
    }

    static async updateById(userId: string, update: UserUpdateReq): Promise<void> {
        const user = UserModel.users.find(u => u.id === userId)
        if (!user) throw new HttpError(404, `Could not find user: ${userId}`)

        Object.assign(user, update)

        return UserModel.save()
    }
}
