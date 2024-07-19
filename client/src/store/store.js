import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import studentReducer from "../features/listData/studentSlice";
import registerStudentReducer from '../features/auth/registerStudentSlice';
import adminRegistrationReducer from '../features/auth/registerAdminSlice';
import issueBookReducer from '../features/bookdata/issueBookSlice'; 
import newBookReducer from '../features/bookdata/bookSlice'; // Import the newBookReducer

export default configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    registerStudent: registerStudentReducer,
    issueBook: issueBookReducer,
    adminRegistration: adminRegistrationReducer,
    newBook: newBookReducer // Add the newBookReducer to the reducer object
  },
});
