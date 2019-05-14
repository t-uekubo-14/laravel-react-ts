import { Reducer } from 'redux'

import ActionTypes from '../actionTypes'
import { TalksState } from './types'

// Type-safe initialState!
export const initialState: TalksState = {
  data: [],
  errors: undefined,
  loading: false,
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<TalksState> = (state = initialState, action) => {
  // console.log({ action: action, state: state })
  switch (action.type) {
    // Fetch Talk
    case ActionTypes.FETCH_TALKS_REQUEST: {
      return { ...state, loading: true }
    }
    case ActionTypes.FETCH_TALKS_SUCCESS: {
      return { ...state, loading: false, data: action.data }
    }
    case ActionTypes.FETCH_TALKS_FAILURE: {
      return { ...state, loading: false, errors: action.payload }
    }

    // Insert Talk
    case ActionTypes.INSERT_TALK_REQUEST: {
      return { ...state, loading: true }
    }
    case ActionTypes.INSERT_TALK_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case ActionTypes.INSERT_TALK_FAILURE: {
      return { ...state, loading: false, errors: action.payload }
    }

    // Delete Talk
    case ActionTypes.DELETE_TALK_REQUEST: {
      return { ...state, loading: true }
    }
    case ActionTypes.DELETE_TALK_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case ActionTypes.DELETE_TALK_FAILURE: {
      return { ...state, loading: false, errors: action.payload }
    }

    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as talksReducer }
