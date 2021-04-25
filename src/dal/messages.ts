import { Channel } from '../types/channel'
import { IMessage } from '../types/message'
import { readFile, writeFile } from '../fileIO'
import { UserModel } from './users'

export class MessageModel {
    static messages: IMessage[]

    constructor() {
        throw new Error('Initialize using Message.init()')
    }

    static async save() {
        return writeFile('data/messages.json', JSON.stringify(MessageModel.messages))
    }

    static async init() {
        return readFile('data/messages.json').then(
            (data) => (MessageModel.messages = JSON.parse(data.toString()))
        )
    }

    static add(message: IMessage) {
        MessageModel.messages.push(message)
        return MessageModel.save()
    }

    static getByChannel(channel: Channel): IMessage[] {
        return MessageModel.messages
            .filter(
                (m) =>
                    m.channel.interest === channel.interest &&
                    m.channel.location === channel.location
            )
            .map((m) => ({
                ...m,
                user: UserModel.getById(m.user as string),
            }))
    }
}
