import { Store, createStore, applyMiddleware } from 'redux'
import { ApplicationState, createRootReducer } from './store'
import { History } from 'history'
import thunk from 'redux-thunk'

export default function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(thunk)
  )

  return store
}
