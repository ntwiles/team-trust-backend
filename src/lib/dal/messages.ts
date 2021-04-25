import { IChannel } from '../../types/channel'
import { IMessage } from '../../types/message'
import * as fs from 'fs'
import { User } from './users'

export class Message {
    static messages: IMessage[]

    constructor() {
        throw new Error('Initialize using Message.init()')
    }

    static init() {
        fs.readFile('data/messages.json', (err, data) => {
            if (err) throw err
            Message.messages = JSON.parse(data.toString())
        })
    }

    static getByChannel(channel: IChannel): IMessage[] {
        return Message.messages
            .filter(
                (m) =>
                    m.channel.interest === channel.interest &&
                    m.channel.location === channel.location
            )
            .map((m) => ({
                ...m,
                user: User.getById(m.user as string),
            }))
    }
}
