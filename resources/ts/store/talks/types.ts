// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /heroes
// https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
export interface Talk extends ApiResponse {
  id: number
  message: string
  contributer_id: number
  contributer_name: string
  created_at: Date
  // name: string
  // localized_name: string
  // primary_attr: string
  // attack_type: string
  // roles: string[]
  // img: string
  // icon: string
  // legs: number
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface TalksState {
  readonly loading: boolean
  readonly data: Talk[]
  readonly errors?: string

  readonly newTalk: Talk
}
