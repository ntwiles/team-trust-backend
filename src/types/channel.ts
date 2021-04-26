import { string, array, object, InferType } from 'yup'

export const channelSchema = object({
    interest: string().required(),
    location: string().required(),
})

export type Channel = InferType<typeof channelSchema>

export const interestsSchema = array().of(string().required()).required()
export const locationsSchema = array().of(string().required()).required()