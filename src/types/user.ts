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
}).required()

export type User = InferType<typeof userSchema>

export const userUpdateReqSchema = object({
    avatar: string(),
    bio: string(),
    displayName: string(),
    interests: array()
        .of(string().required()),
    locations: array()
        .of(string().required())
}).noUnknown().required()

export type UserUpdateReq = InferType<typeof userUpdateReqSchema>
