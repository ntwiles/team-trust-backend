import { Interest, interests } from './interest'
import { Location, locations } from './location'
import { object, string, array, SchemaOf, InferType } from 'yup'

export const userSchema = object({
    avatar: string(),
    bio: string(),
    displayName: string().required(),
    id: string().required(),
    interests: array()
        .of(
            string()
                .oneOf([...interests])
                .required()
        )
        .required(),
    locations: array()
        .of(
            string()
                .oneOf([...locations])
                .required()
        )
        .required(),
}).defined()

export type User = InferType<typeof userSchema>
