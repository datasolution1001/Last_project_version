import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'notificationPanel/state',
  initialState: false,
  reducers: {
    toggleNotificationPanel: (state, action) => !state,
    toggleUserDataPanel: (state, action) => !state,
    openNotificationPanel: (state, action) => true,
    closeNotificationPanel: (state, action) => false,
  },
});

export const { toggleNotificationPanel, openNotificationPanel, closeNotificationPanel, toggleUserDataPanel } =
  stateSlice.actions;

export const selectNotificationPanelState = ({ notificationPanel }) => notificationPanel.state;

export default stateSlice.reducer;