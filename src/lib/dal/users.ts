import { IChannel } from '../../types/channel'
import { IUser } from '../../types/user'
import * as fs from 'fs'

export class User {
    static users: IUser[]

    constructor() {
        throw new Error('Initialize using User.init()')
    }

    static init() {
        fs.readFile('data/users.json', (err, data) => {
            if (err) throw err
            User.users = JSON.parse(data.toString())
        })
    }

    static getById(userId: string): IUser {
        return User.users.find((u) => u.id === userId)
    }

    static getByChannel = (channel: IChannel): IUser[] => {
        return User.users.filter(
            (u) =>
                u.locations.includes(channel.location) &&
                u.interests.includes(channel.interest)
        )
    }
}
