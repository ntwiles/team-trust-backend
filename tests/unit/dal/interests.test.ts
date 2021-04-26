import faker from "faker"
import { InterestModel } from "../../../src/dal/interests"
import { writeFile } from "../../../src/fileIO"

const filePath = 'tests/data/interests.json'

describe('init', () => {
    it('loads valid interests data', async () => {
        const interests = faker.random.words(20).split(' ')
        await writeFile(filePath, JSON.stringify(interests))
        await InterestModel.init(filePath)
        const loaded = InterestModel.get()
        expect(interests).toEqual(loaded)
    })

    it('throws validation error with invalid data', async () => {
        const interests = faker.random.alphaNumeric()
        await writeFile(filePath, JSON.stringify(interests))
        await expect(InterestModel.init(filePath)).rejects.toThrow(
            expect.objectContaining({
                status: 500
            })
        )
    })
})

describe('add', () => {

    beforeEach(async () => {
        await InterestModel.init(filePath)
    })

    it('adds a new interest', async () => {
        const interest = faker.random.word()
        expect(InterestModel.get()).not.toContain(interest)
        await InterestModel.add(interest)
        expect(InterestModel.get()).toContain(interest)
    })

    it('will not add empty interests', async () => {
        await expect(InterestModel.add('')).rejects.toThrow(
            expect.objectContaining({ status: 400 }))

        expect(InterestModel.get()).toHaveLength(0)
    })

    it('will not add duplicate interests', async () => {
        const interest = faker.random.word()

        await InterestModel.add(interest)
        await expect(InterestModel.add(interest)).rejects.toThrow(
            expect.objectContaining({ status: 400 }))
        expect(InterestModel.get()).not.toEqual([interest, interest])
    })
})

afterEach(async () => {
    await writeFile(filePath, '[]')
})