import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
   addMessage: (state, action) => {
  state.messages.push(action.payload);
  if (state.messages.length > 6) {
    state.messages.splice(0, state.messages.length - 6);
  }
},

  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
