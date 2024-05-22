import { combineReducers } from '@reduxjs/toolkit';
import admins from './AdminSlice';

const reducer = combineReducers({
  admins
});

export default reducer;
