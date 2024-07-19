import { createSlice } from "@reduxjs/toolkit";
import { issueBook } from "../../utils/api";

const issueBookSlice = createSlice({
  name: 'issueBook',
  initialState: {
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(issueBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(issueBook.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = 'Book issued successfully';
      })
      .addCase(issueBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default issueBookSlice.reducer;
