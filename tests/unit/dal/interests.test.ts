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
})

afterEach(async () => {
    await writeFile(filePath, '[]')
})