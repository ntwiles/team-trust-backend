import { User } from '../dal/users'

export const UsersController = {
    async index(req, res) {
        const { interest, location } = req.params
        const users = User.getByChannel({ interest, location })
        res.send(users)
    },

    async show(req, res) {
        const { userId } = req.params
        const user = User.getById(userId)
        res.send(user)
    },
}
