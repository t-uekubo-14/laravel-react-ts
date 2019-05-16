import { Reducer, AnyAction } from 'redux'

import ActionTypes from '../actionTypes'
import { TalksState, Talk } from './types'

// Type-safe initialState!
export const initialState: TalksState = {
  data: [],
  errors: undefined,
  loading: false,

  newTalk: {
    message: '',
  } as Talk,
}

const request = (state: TalksState, action: AnyAction, objects?: any) => {
  console.log(`Request ${JSON.stringify(action)}`)
  return { ...state, loading: true }
}

const successRequest = (
  state: TalksState,
  action: AnyAction,
  objects?: any
) => {
  console.log(`Request Success type:${action.type}`)
  return { ...state, loading: false, ...objects }
}

const failureRequest = (
  state: TalksState,
  action: AnyAction,
  objects?: any
) => {
  console.log(`Request Error type:${action.type}`)
  return { ...state, loading: false, ...objects }
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<TalksState> = (state = initialState, action) => {
  // console.log({ action: action, state: state })
  switch (action.type) {
    // Input New Talk
    case ActionTypes.INPUT_NEW_TALK: {
      return { ...state, newTalk: action.newTalk }
    }

    // Fetch Talk
    case ActionTypes.FETCH_TALKS_REQUEST: {
      return request(state, action)
    }
    case ActionTypes.FETCH_TALKS_SUCCESS: {
      return successRequest(state, action, { data: action.data })
    }
    case ActionTypes.FETCH_TALKS_FAILURE: {
      return failureRequest(state, action, { errors: action.payload })
    }

    // Insert Talk
    case ActionTypes.INSERT_TALK_REQUEST: {
      return request(state, action)
    }
    case ActionTypes.INSERT_TALK_SUCCESS: {
      return successRequest(state, action, {
        data: action.data,
        newTalk: { message: '' } as Talk,
      })
    }
    case ActionTypes.INSERT_TALK_FAILURE: {
      return failureRequest(state, action, { errors: action.payload })
    }

    // Delete Talk
    case ActionTypes.DELETE_TALK_REQUEST: {
      return request(state, action)
    }
    case ActionTypes.DELETE_TALK_SUCCESS: {
      return successRequest(state, action, { data: action.data })
    }
    case ActionTypes.DELETE_TALK_FAILURE: {
      return failureRequest(state, action, { errors: action.payload })
    }

    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as talksReducer }
