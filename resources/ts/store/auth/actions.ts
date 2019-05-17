import { Dispatch, AnyAction } from 'redux'
import { createAction } from 'redux-actions'
import axios from 'axios'

import { history } from '../../utils'
import { User, AuthActionTypes as ActionTypes } from './types'

// Login
const loginRequest = createAction(
  ActionTypes.LOGIN_REQUEST,
  (user: User | null) => user
)
const loginSuccess = createAction(
  ActionTypes.LOGIN_SUCCESS,
  (user: User) => user
)
const loginFailure = createAction(
  ActionTypes.LOGIN_FAILURE,
  (message: string) => message
)
export const login = (email: string, password: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(loginRequest(null))
    axios
      .post(`/api/authenticate`, { email, password })
      .then((res: any) => {
        dispatch(loginSuccess(res))
        history.push('/dashboard')
      })
      .catch((err: any) => dispatch(loginFailure(err)))
  }
}

// Logout
const logoutRequest = createAction(ActionTypes.LOGOUT_REQUEST)
const logoutSuccess = createAction(ActionTypes.LOGOUT_SUCCESS)
const logoutFailure = createAction(
  ActionTypes.LOGOUT_FAILURE,
  (message: string) => message
)
export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch(logoutRequest())
    axios
      .get(`/api/logout`)
      .then(() => {
        dispatch(logoutSuccess())
        localStorage.removeItem('jwt-token')
        history.push('/welcome')
      })
      .catch(err => dispatch(logoutFailure(err)))
  }
}

// Get Me (Current User)
const getMeRequest = createAction(ActionTypes.GET_ME_REQUEST)
const getMeSuccess = createAction(
  ActionTypes.GET_ME_SUCCESS,
  (user: User) => user
)
const getMeFailure = createAction(
  ActionTypes.GET_ME_FAILURE,
  (message: string) => message
)
export const getMe = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(getMeRequest())
    axios
      .get(`/api/me`)
      .then((res: any) => dispatch(getMeSuccess(res)))
      .catch((err: any) => dispatch(getMeFailure(err)))
  }
}
