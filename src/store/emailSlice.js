import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sent: [],
    received: [],
}

const emailSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    setSentEmails(state, action) {
      state.sent = action.payload;
    },
    updateSentEmails(state, action) {
      state.sent = [...state.sent, action.payload]
    },
    deleteSentEmail(state, action) {
      state.sent = state.sent.filter((email) => email.id !== action.payload);
    },
    setReceivedEmails(state, action) {
      state.received = action.payload;
    },
  }
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;