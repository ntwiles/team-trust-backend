import { IChannel } from '../../types/channel'
import { IMessage } from '../../types/message'

const messages: IMessage[] = [
    {
        body: 'Hey, I have an idea. We should do a local hackathon.',
        channel: {
            interest: 'programming',
            location: 'cincinnati',
        },
        timestamp: new Date(),
        user: '3a374bf1-a411-43a7-b9d4-77fb2a068aca',
    },
    {
        body: "That's a great idea!",
        channel: {
            interest: 'programming',
            location: 'cincinnati',
        },
        timestamp: new Date(),
        user: '2d402411-3773-4a73-81ed-702316832cb0',
    },
    {
        body: 'We can meet up to present our projects.',
        channel: {
            interest: 'programming',
            location: 'cincinnati',
        },
        timestamp: new Date(),
        user: 'c4b25ebe-a41a-431b-9265-3d2e21d4dc04',
    },
]

export const getMessagesByChannel = (channel: IChannel) =>
    messages.filter(
        (m) =>
            m.channel.interest === channel.interest &&
            m.channel.location === channel.location
    )
