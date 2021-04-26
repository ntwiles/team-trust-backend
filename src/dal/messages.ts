import { Channel } from '../types/channel'
import { Message, messageSchema } from '../types/message'
import { readFile, writeFile } from '../fileIO'
import { UserModel } from './users'
import { HttpError } from '../types/error'
import { array } from 'yup'

export class MessageModel {
    static messages: Message[]
    static filePath: string

    constructor() {
        throw new Error('Initialize using MessageModel.init()')
    }

    static async save(): Promise<void> {
        return writeFile(MessageModel.filePath, JSON.stringify(MessageModel.messages))
            .catch(err => { throw new HttpError(500, err) })
    }

    static async init(path: string): Promise<void> {
        MessageModel.filePath = path
        return readFile(MessageModel.filePath)
            .then(async buffer => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const data: any = JSON.parse(buffer.toString())
                MessageModel.messages = await array().of(messageSchema).required().validate(data)

            })
            .catch(err => { throw new HttpError(500, err) })
    }

    static add(message: Message): Promise<void> {
        MessageModel.messages.push(message)
        return MessageModel.save()
    }

    static getByChannel(channel: Channel): Message[] {
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
