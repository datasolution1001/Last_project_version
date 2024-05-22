import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';
import ContactModel from '../model/ContactModel';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';


export const getContact = createAsyncThunk(
  'contactsApp/task/getContact',
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/Parking/${id}`);
      console.log('nji lina');
      console.log(response);
      const data = await response.data;

      return data;
    } catch (error) {
      history.push({ pathname: `/apps/contacts` });

      return null;
    }
  }
);

export const addContact = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (contact, { dispatch, getState }) => {
    console.log("contact = ")
    console.log(contact)
    let response;
    const state = getState();
    const user = state.user.data;
         
    // Retrieve the adminID from the user data
    const adminID = user.id;

if (!contact.admin || Object.keys(contact.admin).length === 0 || contact.admin.passwordAdmin === "") {
    // If contact.admin is empty, doesn't exist, or passwordAdmin is empty
    response = await axios.post('http://127.0.0.1:8000/users/Parking/create', contact);
} else {
    // Otherwise, use the /Auth/create endpoint
    response = await axios.post('http://127.0.0.1:8000/Auth/create', contact);
}
    const id = await response.data;
    const response1 = await axios.get(`http://127.0.0.1:8000/users/Parking/${id}`);
    const data = await response1.data;
   
    const record = {
      "adminID":adminID,
      "userID":data.id,
      "status":"Create"
      
    }
    console.log('record = ');
    console.log(record);
    const response2 = await axios.post('http://127.0.0.1:8000/records/Parking/create_record',record );
    console.log(response2);
    return data;
  }
);

export const updateContact = createAsyncThunk(
  'contactsApp/contacts/updateContact',
  async (contact, { dispatch, getState }) => {
    console.log(contact)
    const state = getState();
    const user = state.user.data;
         
    // Retrieve the adminID from the user data
    const adminID = user.id;
    const response = await axios.put(`http://127.0.0.1:8000/users/Parking/${contact.id}`, contact);
    console.log(response)
    const response1 = await axios.get(`http://127.0.0.1:8000/users/Parking/${contact.id}`);
    const data = await response1.data;

    const record = {
      "adminID":adminID,
      "userID":data.id,
      "status":"Update"
      
    }
    console.log('record = ');
    console.log(record);
    const response2 = await axios.post('http://127.0.0.1:8000/records/Parking/create_record',record );
    console.log(response2);
    return data;

  }
);

export const removeContact = createAsyncThunk(
  'contactsApp/contacts/removeContact',
  async (id, { dispatch, getState }) => {
    console.log('delete');
    const state = getState();
    const user = state.user.data;
         
    // Retrieve the adminID from the user data
    const adminID = user.id;
    const record = {
      "adminID":adminID,
      "userID":id,
      "status":"Delete"
      
    }
    console.log('record = ');
    console.log(record);
    const response2 = await axios.post('http://127.0.0.1:8000/records/Parking/create_record',record );
    console.log(response2);


    const response = await axios.delete(`http://127.0.0.1:8000/users/Parking/${id}`);

    console.log("data =" );
    console.log(response.data);

    console.log("id =" );
    console.log(id);
   
 
    return id;
  }
);
const initialState = {
  userData: {},
};

export const selectContact = ({ contactsApp }) => contactsApp.contact;

const contactSlice = createSlice({
  name: 'contactsApp/contact',
  initialState: null,
 

  reducers: {
    newContact: (state, action) => ContactModel(),
    resetContact: () => null,
   
  },
  extraReducers: {
    [getContact.pending]: (state, action) => null,
    [getContact.fulfilled]: (state, action) => action.payload,
    [updateContact.fulfilled]: (state, action) => action.payload,
    [removeContact.fulfilled]: (state, action) => null,
  },
});

export const { resetContact, newContact } = contactSlice.actions;

export default contactSlice.reducer;
