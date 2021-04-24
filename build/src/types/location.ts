export const locations = ['cincinnati', 'sacremento', 'chicago'] as const
export type Location = typeof locations[number]
