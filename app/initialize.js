import 'babel-polyfill'

import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import counterApp from './reducers'
import App from 'components/App'

import {loadString} from './actions'

const storeInitialData =
  module.hot && module.hot.data && module.hot.data.counter || undefined

const store = createStore(
  counterApp,
  storeInitialData,
  applyMiddleware(thunk)
)

if (!storeInitialData) {
  store.dispatch(loadString(`
    Ruangan
    7602;07.00;14.00;1,2,3,4,5
    7603;07.00;14.00;1,3,5
    7610;09.00;12.00;1,2,3,4,5
    Labdas2;10.00;14.00;2,4

    Jadwal
    IF2110;7602;07.00;12.00;4;1,2,3,4,5
    IF2130;-;10.00;16.00;3;3,4
    IF2150;-;09.00;13.00;2;1,3,5
    IF2170;7610;07.00;12.00;3;1,2,3,4,5
    IF3110;7602;07.00;09.00;2;1,2,3,4,5
    IF3130;-;07.00;12.00;2;3,4,5
    IF3170;7602;07.00;09.00;2;1,2,3,4,5
    IF3111;-;07.00;12.00;2;1,2,3,4,5
  `))
}

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default)
  })
  module.hot.accept()

  module.hot.dispose((data) => {
    data.counter = store.getState()
    ;[].slice.apply(document.querySelector('#app').children).forEach(function (c) { c.remove() })
  })
}

const load = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  )
}

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load)
} else {
  load()
}
