import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents } from "../../utils/api";

const initialState = {
    students: [],
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload.data; // Accessing the 'data' array from the payload
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; // Accessing the 'message' property from the payload
            });
    },
});

export default studentSlice.reducer;
