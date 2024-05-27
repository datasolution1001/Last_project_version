import { combineReducers } from '@reduxjs/toolkit';
import parkings from './ParkingSlice';

const reducer = combineReducers({
  parkings
});

export default reducer;
