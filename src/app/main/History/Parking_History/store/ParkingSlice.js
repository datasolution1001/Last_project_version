import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getLogs = createAsyncThunk(
  'parkingApp/parking/getlogs',
  async (params, { getState }) => {
    console.log("haboub");
    
    const response = await axios.get('http://192.168.25.30:8000/reports/Parking/get_all_logs');
    console.log("hab");
    console.log(response.data);
    console.log("habi");

    const data = await response.data;

    return { data };
  }
);

const parkingsAdapter = createEntityAdapter({});

export const selectSearchText = ({ ParkingApp }) => ParkingApp.parkings.searchText;

export const { selectAll: selectparkings, selectById: selectparkingsById } =
  parkingsAdapter.getSelectors((state) => state.ParkingApp.parkings);

export const selectFilteredparkings = createSelector(
  [selectparkings, selectSearchText],
  (parkings, searchText) => {
    if (searchText.length === 0) {
      return parkings;
    }
    return FuseUtils.filterArrayByString(parkings, searchText);
  }
);
export const selectSortedparkings = createSelector(
  [selectFilteredparkings],
  (parkings) => {
    // Sort parkings by actionTime
    return parkings.sort((a, b) => {
      // Assuming there's an actionTime property in your contact object
      return new Date(b.actionTime) - new Date(a.actionTime);
    });
  }
);


export const selectGroupedFilteredparkings = createSelector(
  [selectFilteredparkings],
  (parkings) => {
    return parkings
      .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
      .reduce((r, e) => {
        // get first letter of name of current element
        const group = e.name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] };
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
        // return accumulator
        return r;
      }, {});
  }
);

const parkingSlice = createSlice({
  name: 'parkingApp/parking',
  initialState: parkingsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setparkingsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getLogs.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      parkingsAdapter.setAll(state, data);
      state.searchText = '';
    },
  },
});

export const { setparkingsSearchText } = parkingSlice.actions;

export default parkingSlice.reducer;
