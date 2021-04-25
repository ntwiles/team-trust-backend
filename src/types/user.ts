import { object, string, array, InferType } from 'yup'

export const userSchema = object({
    avatar: string(),
    bio: string(),
    displayName: string().required(),
    id: string().required(),
    interests: array()
        .of(string().required())
        .required(),
    locations: array()
        .of(string().required())
        .required(),
}).defined()

export type User = InferType<typeof userSchema>
