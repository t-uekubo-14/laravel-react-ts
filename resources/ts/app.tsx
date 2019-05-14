import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { ApplicationState } from './store'
import configureStore from './configureStore'
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker'

import './config'

import { App } from './components/App'

const history = createBrowserHistory()
const store = configureStore(history, {} as ApplicationState)

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
