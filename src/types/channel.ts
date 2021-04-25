import { Asserts, object, string } from 'yup'

export const channelSchema = object({
    interest: string().required(),
    location: string().required(),
}).required()

export interface IChannel extends Asserts<typeof channelSchema> {
    interest: string,
    location: string,
}
