import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  logs: [],
  status: 'idle',
  error: null,
};

const logsAdapter = createEntityAdapter({});
export const fetchLogs = createAsyncThunk('logs/fetchLogs', async (nb, { getState }) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/reports/Parking/get_logs', { params :{nb}});
    console.log('Fetched data:', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch logs');
  }
});

const logsSlice = createSlice({
  name: 'logs/state',
  initialState: logsAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        logsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { } = logsSlice.actions;


export default logsSlice.reducer;

