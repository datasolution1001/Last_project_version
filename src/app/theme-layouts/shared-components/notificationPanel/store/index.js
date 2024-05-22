import { combineReducers } from '@reduxjs/toolkit';
import data from './dataSlice';
import state from './stateSlice';
import items from './itemsSlice'

const reducer = combineReducers({
  data,
  state,
  items,
});
export default reducer;
