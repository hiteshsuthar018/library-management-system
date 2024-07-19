import { createSlice } from "@reduxjs/toolkit";
import { createNewBook } from "../../utils/api";

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
  };

const newBookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Add case for pending action
      builder.addCase(createNewBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      });
      // Add case for fulfilled action
      builder.addCase(createNewBook.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // Assuming the API returns a success message
      });
      // Add case for rejected action
      builder.addCase(createNewBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Assuming the API returns an error message
      });
    },
  });
  
  
// Exporting the reducer
export default newBookSlice.reducer;
