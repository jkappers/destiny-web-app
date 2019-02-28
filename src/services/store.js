import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import reducerFactory from '../reducers/factory';

export default (history, initialState = {}) => 
  createStore(
    reducerFactory(history),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      )
    )
  );