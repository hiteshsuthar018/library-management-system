import { createSlice} from '@reduxjs/toolkit';
import { registerStudent } from '../../utils/api';

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const registerStudentSlice = createSlice({
  name: 'registerStudent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerStudent.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(registerStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default registerStudentSlice.reducer;
