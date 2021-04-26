import { IChannel } from '../types/channel'
import { IMessage } from '../types/message'
import { readFile, writeFile } from '../fileIO'
import { UserModel } from './users'
import { HttpError } from '../types/error'

export class MessageModel {
    static messages: IMessage[]

    constructor() {
        throw new Error('Initialize using Message.init()')
    }

    static async save() {
        return writeFile('data/messages.json', JSON.stringify(MessageModel.messages))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async init() {
        return readFile('data/messages.json')
            .then((data) => (MessageModel.messages = JSON.parse(data.toString())))
            .catch(err => { throw new HttpError(500, err) })
    }

    static add(message: IMessage) {
        MessageModel.messages.push(message)
        return MessageModel.save()
    }

    static getByChannel(channel: IChannel): IMessage[] {
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
