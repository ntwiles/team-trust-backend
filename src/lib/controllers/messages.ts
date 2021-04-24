import { getMessagesByChannel } from '../dal/messages'

export const MessagesController = {
    async index(req, res) {
        const { interest, location } = req.params
        const messages = getMessagesByChannel({ interest, location })
        res.send(messages)
    },
}
