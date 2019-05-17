// This file holds our state type, as well as any other types related to this Redux store.
export interface User extends ApiResponse {
  id: number
  name: string
  email: string
  created_at: Date
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

//
const namespace = 'auth'
export const AuthActionTypes = {
  // LOGIN_REQUEST: `LOGIN_REQUEST`,
  LOGIN_REQUEST: `${namespace}/LOGIN_REQUEST`,
  LOGIN_SUCCESS: `${namespace}/LOGIN_SUCCESS`,
  LOGIN_FAILURE: `${namespace}/LOGIN_FAILURE`,
  LOGOUT_REQUEST: `${namespace}/LOGOUT_REQUEST`,
  LOGOUT_SUCCESS: `${namespace}/LOGOUT_SUCCESS`,
  LOGOUT_FAILURE: `${namespace}/LOGOUT_FAILURE`,
  GET_ME_REQUEST: `${namespace}/GET_ME_REQUEST`,
  GET_ME_SUCCESS: `${namespace}/GET_ME_SUCCESS`,
  GET_ME_FAILURE: `${namespace}/GET_ME_FAILURE`,
}

// Declare state types with `readonly` modifier to get compile time immutability.
export interface AuthState {
  readonly loading: boolean
  readonly errors?: string
  readonly user: User
  readonly authenticated: boolean
}
