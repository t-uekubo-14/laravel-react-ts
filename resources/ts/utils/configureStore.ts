import { Store, createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { History } from 'history'

import { ApplicationState, createRootReducer } from '../store'

export function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  // Reducer
  const rootReducer = createRootReducer(history)

  // Middlewares
  const logger = createLogger()
  const router = routerMiddleware(history)

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(router, thunk, logger)
  )

  return store
}
