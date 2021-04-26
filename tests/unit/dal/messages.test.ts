import { MessageModel } from "../../../src/dal/messages"
import { Channel } from "../../../src/types/channel"
import { Message } from "../../../src/types/message"
import faker from 'faker'
import { UserModel } from "../../../src/dal/users"
import { writeFile } from "../../../src/fileIO"
import { User } from "../../../src/types/user"

const messagesFilePath = 'tests/data/messages.json'
const usersFilePath = 'tests/data/users.json'

beforeAll(async () => {
    await MessageModel.init(messagesFilePath)
    await UserModel.init(usersFilePath)
})

describe('add', () => {

    let user: User
    let channel: Channel

    beforeEach(async () => {
        channel = {
            interest: faker.random.word(),
            location: faker.random.word(),
        }

        const partial = {
            displayName: faker.name.firstName(),
            interests: [channel.interest],
            locations: [channel.location],
        } as Omit<User, 'id'>

        user = await UserModel.add(partial)
    })

    it('adds a new message', async () => {
        const message: Message = {
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