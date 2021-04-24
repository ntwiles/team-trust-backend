export const interests = [
    'gaming',
    'reading',
    'hiking',
    'programming',
    'travel',
    'cooking',
] as const

export type Interest = typeof interests[number]
