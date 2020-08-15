import { hot } from 'react-hot-loader'
import React from 'react'
import { Provider } from 'react-redux'

import { ErrorBoundary } from './components'
import Router from './router'
import store from './store'

import './app.scss'

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </Provider>
)

export default hot(module)(App)
