import { interests } from './interest'
import { locations } from './location'
import { InferType, object, SchemaOf, string } from 'yup'

export const channelSchema = object({
    interest: string()
        .oneOf([...interests])
        .required(),
    location: string()
        .oneOf([...locations])
        .required(),
})

export type Channel = InferType<typeof channelSchema>
