import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { History } from 'history'
import { TalksState } from './talks/types'
import { talksReducer } from './talks/reducer'

// The top-level state object
export interface ApplicationState {
  // layout: LayoutState
  talks: TalksState
  // teams: TeamsState
  // router: RouterState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const createRootReducer = (history: History) =>
  combineReducers({
    // layout: layoutReducer,
    talks: talksReducer,
    // teams: teamsReducer,
    // router: connectRouter(history)
  })

// import { compose, createStore } from 'redux'
// import reducers from '../reducers'

// export default function createFinalStore() {
//   const finalCreateStore = compose()(createStore)
//   return finalCreateStore(reducers)
// }
