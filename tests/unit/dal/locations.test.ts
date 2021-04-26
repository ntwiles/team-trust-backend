import { LocationModel } from "../../../src/dal/locations"
import { writeFile } from "../../../src/fileIO"

const filePath = 'tests/data/locations.json'

describe('add', () => {

    beforeEach(async () => {
        await LocationModel.init(filePath)
    })

    it('adds a new interest', async () => {
        expect(LocationModel.get()).not.toContain('foo')
        await LocationModel.add('foo')
        expect(1).toEqual(1)
        expect(LocationModel.get()).toContain('foo')
    })

    it('will not add empty locations', async () => {
        await expect(LocationModel.add('')).rejects.toThrow(
            expect.objectContaining({ status: 400 }))

        expect(LocationModel.get()).toHaveLength(0)
    })

    it('will not add duplicate locations', async () => {
        await LocationModel.add('foo')

        await expect(LocationModel.add('foo')).rejects.toThrow(
            expect.objectContaining({ status: 400 }))
        expect(LocationModel.get()).not.toEqual(["foo", "foo"])
    })
})

afterEach(async () => {
    await writeFile(filePath, '[]')
})