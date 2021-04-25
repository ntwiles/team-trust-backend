import { Channel } from '../types/channel'
import { User } from '../types/user'
import { readFile, writeFile } from '../fileIO'

export class UserModel {
    static users: User[]

    constructor() {
        throw new Error('Initialize using User.init()')
    }

    static async init() {
        await readFile('data/users.json').then(
            (data) => (UserModel.users = JSON.parse(data.toString()))
        )
    }

    static async save() {
        await writeFile('data/users.json', JSON.stringify(UserModel.users))
    }

    static getById(userId: string): User {
        const user = UserModel.users.find((u) => u.id === userId)
        if (!user) throw `Could not find user: ${userId}`
        return user
    }

    static getByChannel = (channel: Channel): User[] => {
        return UserModel.users.filter(
            (u) =>
                u.locations.includes(channel.location) &&
                u.interests.includes(channel.interest)
        )
    }
}
