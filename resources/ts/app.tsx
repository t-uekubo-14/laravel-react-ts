import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { ApplicationState } from './store'
import { configureHttp, configureStore, history, serviceWorker } from './utils'

import App from './components/App'

// Configuration HTTP (Axios)
configureHttp()

// Configuration Store (including Middleware)
const store = configureStore(history, {} as ApplicationState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
