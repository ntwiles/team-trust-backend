import { Interest } from './interest'
import { Location } from './location'

export interface IUser {
    avatar?: string
    bio?: string
    displayName: string
    id: string
    interests: Interest[]
    locations: Location[]
}
