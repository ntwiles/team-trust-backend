import { Message } from '../dal/messages'

export const MessagesController = {
    async index(req, res) {
        const { interest, location } = req.params
        const messages = Message.getByChannel({ interest, location })
        res.send(messages)
    },
}
