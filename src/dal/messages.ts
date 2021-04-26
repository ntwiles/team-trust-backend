import { Channel } from '../types/channel'
import { IMessage } from '../types/message'
import { readFile, writeFile } from '../fileIO'
import { UserModel } from './users'
import { HttpError } from '../types/error'

export class MessageModel {
    static messages: IMessage[]
    static filePath: string

    constructor() {
        throw new Error('Initialize using MessageModel.init()')
    }

    static async save() {
        return writeFile(MessageModel.filePath, JSON.stringify(MessageModel.messages))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async init(path: string) {
        MessageModel.filePath = path
        return readFile(MessageModel.filePath)
            .then((data) => (MessageModel.messages = JSON.parse(data.toString())))
            .catch(err => { throw new HttpError(500, err) })
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
