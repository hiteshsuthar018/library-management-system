import { createSlice } from "@reduxjs/toolkit";
import { registerAdmin } from "../../utils/api";

const adminRegistrationSlice = createSlice({
    name: 'adminRegistration',
    initialState: {
      loading: false,
      error: null,
      successMessage: null
    },
    reducers: {},
    // Use the builder callback notation
    extraReducers: (builder) => {
      builder
        .addCase(registerAdmin.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.successMessage = null;
        })
        .addCase(registerAdmin.fulfilled, (state) => {
          state.loading = false;
          state.successMessage = 'Admin registered successfully';
        })
        .addCase(registerAdmin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
});

// Exporting the reducer
export default adminRegistrationSlice.reducer;
