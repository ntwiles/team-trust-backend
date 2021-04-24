import { IChannel } from '../../types/channel'
import { IUser } from '../../types/user'

const users: IUser[] = [
    {
        id: '3a374bf1-a411-43a7-b9d4-77fb2a068aca',
        displayName: 'Walter White',
        interests: ['programming', 'reading', 'gaming'],
        locations: ['cincinnati'],
    },
    {
        id: 'd8719507-9ae3-4278-9531-6d385150eb4b',
        displayName: 'Skylar White',
        interests: ['hiking', 'reading', 'travel'],
        locations: ['cincinnati'],
    },
    {
        id: '68a9a62a-2200-4cbf-8013-16cd855203da',
        displayName: 'Jesse Pinkman',
        interests: ['programming', 'reading', 'cooking'],
        locations: ['cincinnati'],
    },
    {
        id: '6462bebf-1450-49f1-bb18-d3b145f02857',
        displayName: 'Michael Ehrmantraut',
        interests: ['programming', 'cooking', 'travel'],
        locations: ['cincinnati'],
    },
    {
        id: 'c4b25ebe-a41a-431b-9265-3d2e21d4dc04',
        displayName: 'Gustavo Fring',
        interests: ['gaming', 'hiking', 'reading'],
        locations: ['cincinnati'],
    },
    {
        id: '26a15a2b-837a-478d-be07-8d3d865c6ed3',
        displayName: 'James McGill',
        interests: ['cooking', 'travel', 'reading'],
        locations: ['cincinnati'],
    },
    {
        id: '2d402411-3773-4a73-81ed-702316832cb0',
        displayName: 'Kimberly Wexler',
        interests: ['hiking', 'reading', 'gaming'],
        locations: ['cincinnati'],
    },
    {
        id: 'ebb27b7d-4137-4d7b-b8bd-e8a1cd2bf038',
        displayName: 'Lydia Rodarte-Quayle',
        interests: ['gaming', 'reading', 'cooking'],
        locations: ['cincinnati'],
    },
]

export const getUserById = (userId: string): IUser =>
    users.find((u) => u.id === userId)

export const getUsersByChannel = (channel: IChannel): IUser[] => {
    return users.filter(
        (u) =>
            u.locations.includes(channel.location) &&
            u.interests.includes(channel.interest)
    )
}
