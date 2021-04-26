import { MessageModel } from "../../../src/dal/messages"
import { Channel } from "../../../src/types/channel"
import { IMessage } from "../../../src/types/message"
import faker from 'faker'
import { UserModel } from "../../../src/dal/users"
import { writeFile } from "../../../src/fileIO"
import { User } from "../../../src/types/user"

const messagesFilePath = 'tests/data/messages.json'
const usersFilePath = 'tests/data/users.json'

describe('add', () => {

    let user: User
    let channel: Channel

    beforeEach(async () => {
        await Promise.all([
            MessageModel.init(messagesFilePath),
            UserModel.init(usersFilePath)
        ])

        channel = {
            interest: faker.random.word(),
            location: faker.random.word(),
        }

        user = await UserModel.add({
            displayName: faker.name.firstName(),
            interests: [channel.interest],
            locations: [channel.location],
        } as Omit<User, 'id'>)
    })

    it('adds a new message', async () => {
        const message: IMessage = {
            user: user.id,
            body: faker.random.words(10),
            timestamp: new Date(),
            channel
        }

        expect(MessageModel.getByChannel(channel)).toEqual(
            expect.not.arrayContaining([message])
        )

        await MessageModel.add(message)

        expect(MessageModel.getByChannel(channel)).toEqual(
            expect.arrayContaining([{
                ...message,
                user,
            }])
        )
    })
})

afterEach(async () => {
    await writeFile(messagesFilePath, '[]')
    await writeFile(usersFilePath, '[]')
})