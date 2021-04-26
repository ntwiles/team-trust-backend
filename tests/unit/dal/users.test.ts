import faker from "faker"
import { UserModel } from "../../../src/dal/users"
import { User } from "../../../src/types/user"
import { v4 as uuid } from 'uuid'

const filePath = 'tests/data/users.json'

describe('add', () => {
    beforeAll(async () => {
        await UserModel.init(filePath)
    })

    it('adds a new user', async () => {
        const channel = {
            interest: faker.random.word(),
            location: faker.random.word(),
        }

        const partialUser = {
            displayName: faker.name.firstName(),
            interests: [channel.interest],
            locations: [channel.location]
        } as Omit<User, 'id'>

        expect(UserModel.getByChannel(channel)).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining(partialUser)
            ])
        )
        const user = await UserModel.add(partialUser)

        expect(UserModel.getByChannel(channel)).toEqual(
            expect.arrayContaining([user])
        )
    })

    it('ignores supplied id if present', async () => {
        const idToIgnore = uuid()

        const channel = {
            interest: faker.random.word(),
            location: faker.random.word(),
        }

        const partialUser = {
            id: idToIgnore,
            displayName: faker.name.firstName(),
            interests: [channel.interest],
            locations: [channel.location]
        }

        const createdUser = await UserModel.add(partialUser as any)
        expect(createdUser.id).not.toEqual(idToIgnore)
    })
})