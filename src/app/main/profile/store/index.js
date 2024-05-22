import { combineReducers } from '@reduxjs/toolkit';
import admins from './ProfielSlice';

const reducer = combineReducers({
  admins
});

export default reducer;
