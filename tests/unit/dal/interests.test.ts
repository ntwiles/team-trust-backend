import { InterestModel } from "../../../src/dal/interests"
import { writeFile } from "../../../src/fileIO"

const filePath = 'tests/data/interests.json'

describe('add', () => {

    beforeEach(async () => {
        await InterestModel.init(filePath)
    })

    it('adds a new interest', async () => {
        expect(InterestModel.get()).not.toContain('foo')
        await InterestModel.add('foo')
        expect(1).toEqual(1)
        expect(InterestModel.get()).toContain('foo')
    })

    it('will not add empty interests', async () => {
        await expect(InterestModel.add('')).rejects.toThrow(
            expect.objectContaining({ status: 400 }))

        expect(InterestModel.get()).toHaveLength(0)
    })

    it('will not add duplicate interests', async () => {
        await InterestModel.add('foo')

        await expect(InterestModel.add('foo')).rejects.toThrow(
            expect.objectContaining({ status: 400 }))
        expect(InterestModel.get()).not.toEqual(["foo", "foo"])
    })
})

afterEach(async () => {
    await writeFile(filePath, '[]')
})