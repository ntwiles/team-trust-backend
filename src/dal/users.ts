import { Channel } from '../types/channel'
import { User, UserUpdateReq } from '../types/user'
import { readFile, writeFile } from '../fileIO'
import { HttpError } from '../types/error'
import { v4 as uuid } from 'uuid'

export class UserModel {
    static users: User[]
    static filePath: string

    constructor() {
        throw new Error('Initialize using User.init()')
    }

    static async init(path: string) {
        UserModel.filePath = path
        await readFile(UserModel.filePath)
            .then(data => (UserModel.users = JSON.parse(data.toString())))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async save() {
        await writeFile(UserModel.filePath, JSON.stringify(UserModel.users))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async add(partial: Omit<User, 'id'>) {
        const user = Object.assign(partial, { id: uuid() })
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

    static async updateById(userId: string, update: UserUpdateReq) {
        let user = UserModel.users.find(u => u.id === userId)
        if (!user) throw new HttpError(404, `Could not find user: ${userId}`)

        Object.assign(user, update)

        return UserModel.save()
    }
}
