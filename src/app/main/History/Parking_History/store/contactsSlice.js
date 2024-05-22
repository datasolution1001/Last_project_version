import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getContacts = createAsyncThunk(
  'contactsApp/contacts/getContacts',
  async (params, { getState }) => {
    console.log("haboub");
    
    const response = await axios.get('http://127.0.0.1:8000/reports/Parking/get_all_logs');
    console.log("hab");
    console.log(response.data);
    console.log("habi");

    const data = await response.data;

    return { data };
  }
);

const contactsAdapter = createEntityAdapter({});

export const selectSearchText = ({ contactsApp }) => contactsApp.contacts.searchText;

export const { selectAll: selectContacts, selectById: selectContactsById } =
  contactsAdapter.getSelectors((state) => state.contactsApp.contacts);

export const selectFilteredContacts = createSelector(
  [selectContacts, selectSearchText],
  (contacts, searchText) => {
    if (searchText.length === 0) {
      return contacts;
    }
    return FuseUtils.filterArrayByString(contacts, searchText);
  }
);
export const selectSortedContacts = createSelector(
  [selectFilteredContacts],
  (contacts) => {
    // Sort contacts by actionTime
    return contacts.sort((a, b) => {
      // Assuming there's an actionTime property in your contact object
      return new Date(b.actionTime) - new Date(a.actionTime);
    });
  }
);


export const selectGroupedFilteredContacts = createSelector(
  [selectFilteredContacts],
  (contacts) => {
    return contacts
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

const contactsSlice = createSlice({
  name: 'contactsApp/contacts',
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
    [getContacts.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.searchText = '';
    },
  },
});

export const { setContactsSearchText } = contactsSlice.actions;

export default contactsSlice.reducer;
