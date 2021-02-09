import { combineReducers } from 'redux'
import * as types from './types'

// COUNTER REDUCER
const menuReducer = (state = false, { type }) => {
  switch (type) {
    case types.OPEN:
      return state = !state
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  menu: menuReducer
}

export default combineReducers(reducers)