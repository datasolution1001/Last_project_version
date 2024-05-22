import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';
import BoardModel from '../model/BoardModel';

/**
 * Get Boards
 */
const url = process.env.REACT_APP_BACKEND_IP_ADDRESS


export const approvedUser = createAsyncThunk(
  'scrumboardApp/boards/addUserInProgress',
   async (id) => {
  console.log("created");
  console.log(id)
  const response = await axios.get(`${url}/usersInprocess/Parking/Approved_Processing/${id}`);
  await response.data;

  return id;
});

export const getBoards = createAsyncThunk('scrumboardApp/boards/getusersInProcess', async () => {
  const response = await axios.get(`${url}/usersInprocess/Parking/Processing`);
  const data = await response.data;

  return data;
});
export const deleteUserInProgress = createAsyncThunk(
  'scrumboardApp/boards/deleteUserInProgress',
   async (id) => {
  console.log("created");
  const response = await axios.delete(`${url}/usersInprocess/Parking/delete_user_in_progress${id}`);
  await response.data;

  return id;
});

/**
 * Create New Board
 */
export const newBoard = createAsyncThunk(
  'scrumboardApp/boards/newBoard',
  async (board, { dispatch }) => {
    const response = await axios.post('/api/scrumboard/boards', BoardModel(board));
    const data = await response.data;

    history.push({
      pathname: `/apps/scrumboard/boards/${data.id}`,
    });

    return data;
  }
);

const boardsAdapter = createEntityAdapter({});

export const { selectAll: selectBoards, selectById: selectBoardById } = boardsAdapter.getSelectors(
  (state) => state.scrumboardApp.boards
);

const boardsSlice = createSlice({
  name: 'scrumboardApp/boards',
  initialState: boardsAdapter.getInitialState({}),
  reducers: {
    resetBoards: (state, action) => {},
  },
  extraReducers: {
    [getBoards.fulfilled]: boardsAdapter.setAll,
  },
});

export const { resetBoards } = boardsSlice.actions;

export default boardsSlice.reducer;



