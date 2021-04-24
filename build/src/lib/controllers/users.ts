import { getUserById, getUsersByChannel } from '../dal/users'

export const UsersController = {
  async index(req, res) {
    const { interest, location } = req.params
    const users = getUsersByChannel({ interest, location })
    res.send(users)
  },

  async show(req, res) {
    const { userId } = req.params
    const user = getUserById(userId)
    res.send(user)
  },
}
