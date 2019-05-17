import { Reducer, Action, AnyAction, combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions'

import { User, AuthActionTypes, AuthState } from './types'

export const initialState: AuthState = {
  user: {} as User,
  authenticated: false,

  loading: false,
  errors: undefined,
}
interface IPayload {}

// const reducer: Reducer<AuthState> = handleActions<AuthState, IPayload>(
//   {
//     [AuthActionTypes.LOGIN_REQUEST]: state => ({
//       ...state,
//       loading: true,
//     }),
//     [AuthActionTypes.LOGIN_SUCCESS]: (state, action) => ({
//       ...state,
//       loading: false,
//       data: action.payload,
//     }),
//     [AuthActionTypes.LOGIN_FAILURE]: (state, action) => ({
//       ...state,
//       loading: false,
//       data: action.payload,
//     }),
//   },
//   initialState
// )

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  // console.log(`Reducer [${action.type}] : ${JSON.stringify(action)}`)
  switch (action.type) {
    // Login
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data.user,
        authenticated: true,
      }
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        authenticated: false,
      }

    // Logout
    case AuthActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {} as User,
        authenticated: false,
      }
    case AuthActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    // Get Me (Current User)
    case AuthActionTypes.GET_ME_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AuthActionTypes.GET_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data.user,
        authenticated: true,
      }
    case AuthActionTypes.GET_ME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: {} as User,
        authenticated: false,
      }

    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as authReducer }
