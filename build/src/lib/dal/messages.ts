import { IChannel } from '../../types/channel'
import { IMessage } from '../../types/message'

const messages: IMessage[] = [
  {
    body: 'Hey, this is our first message!',
    channel: {
      interest: 'programming',
      location: 'cincinnati',
    },
    timestamp: new Date(),
    user: '3a374bf1-a411-43a7-b9d4-77fb2a068aca',
  },
]

export const getMessagesByChannel = (channel: IChannel) =>
  messages.filter(m => m.channel === channel)
