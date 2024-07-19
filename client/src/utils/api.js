import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1";

// Login admin
const loginAdmin = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      localStorage.clear();
      const response = await axios.post(
        `${BASE_URL}/admin/loginAdmin`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const { accessToken } = response.data.data; // Assuming your backend returns the access token
      localStorage.setItem('accessToken', accessToken);
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch student data
const fetchStudents = createAsyncThunk(
  'students/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`${BASE_URL}/list/`, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//fetch student borrowed books
const fetchBorrowedList = createAsyncThunk(
  'students/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`${BASE_URL}/list/borrowedList`, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchdueList = createAsyncThunk(
  'students/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`${BASE_URL}/list/dueList`, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const registerStudent = createAsyncThunk(
  'students/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/students/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const issueBook = createAsyncThunk(
  'issueBook/issue',
  async ({ studentId, bookId }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.post(
        `${BASE_URL}/moveStudent/${studentId}`,
        { book_id: bookId },
        {
          headers
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


const registerAdmin = createAsyncThunk(
  'admin/register',
  async ({ username, password, name, email }, { rejectWithValue }) => {
    try {
      // Making the API request to register the admin
      const response = await axios.post(
        `${BASE_URL}/admin/registerAdmin`,
        { username, password, name, email },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const createNewBook = createAsyncThunk(
  'books/createNewBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      // Call the API function to post the new book
      const response = await axios.post(`${BASE_URL}/books`, bookData,{headers});
      return response.data; // Assuming the API returns a success message
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error response
    }
  }
);
export { loginAdmin, fetchStudents ,registerStudent , issueBook ,fetchBorrowedList,fetchdueList,registerAdmin ,createNewBook};
