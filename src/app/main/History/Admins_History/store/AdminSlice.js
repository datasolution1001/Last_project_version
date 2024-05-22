import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

const url = process.env.REACT_APP_BACKEND_IP_ADDRESS

export const getRecords = createAsyncThunk(
  'adminApp/admins/getRecords',
  async (params, { getState }) => {
    console.log("haboub");
    
    const response = await axios.get(`${url}/records/Parking/get_records_all`);
    console.log("hab");
    console.log(response.data);
    console.log("habi");

    const data = await response.data;

    return { data };
  }
);

const contactsAdapter = createEntityAdapter({});

export const selectSearchText = ({ adminApp }) => adminApp.admins.searchText;

export const { selectAll: selectContacts, selectById: selectContactsById } =
  contactsAdapter.getSelectors((state) => state.adminApp.admins);

export const selectFilteredContacts = createSelector(
  [selectContacts, selectSearchText],
  (admins, searchText) => {
    if (searchText.length === 0) {
      return admins;
    }
    return FuseUtils.filterArrayByString(admins, searchText);
  }
);
export const selectSortedContacts = createSelector(
  [selectFilteredContacts],
  (admins) => {
    // Sort admins by actionTime
    return admins.sort((a, b) => {
      // Assuming there's an actionTime property in your contact object
      return new Date(b.time) - new Date(a.time);
    });
  }
);


export const selectGroupedFilteredContacts = createSelector(
  [selectFilteredContacts],
  (admins) => {
    return admins
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

const AdminSlice = createSlice({
  name: 'adminApp/admins',
  initialState: contactsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getRecords.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.searchText = '';
    },
  },
});

export const { setContactsSearchText } = AdminSlice.actions;

export default AdminSlice.reducer;
