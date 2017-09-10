import { combineReducers } from 'redux'
import post from './post'
import comment from './comment'
import category from './category'

export default combineReducers({
    post,
    comment,
    category,
  })