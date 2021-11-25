import { combineReducers } from 'redux'
import addCartReducer from './addCartReducer'

export default combineReducers({
  items: addCartReducer
})