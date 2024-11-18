import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user data
export const fetchUsers = createAsyncThunk(
  "messages/fetchUsers",
  async (page) => {
    const response = await axios.get(
      `https://gorest.co.in/public/v1/users?page=${page}`
    );
    return response.data.data;
  }
);

// slice
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    page: 1,
    loading: false,
  },

  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const newMessages = action.payload.map((user, index) => ({
          id: user.id,
          message: user.name,
          type: index % 2 === 0 ? "incoming" : "outgoing",
        }));
        state.messages = [...newMessages, ...state.messages]; //Appending new messages at top
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
