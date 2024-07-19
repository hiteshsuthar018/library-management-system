import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './components/Login.jsx';
import AdminPotel from './components/AdminPotel.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Register from './components/Register.jsx';
import Cards from './components/Cards.jsx';
import Table from './components/Table.jsx';
import IssuedTable from './components/IssuedTable.jsx';
import DueListTable from './components/DueListTable.jsx';
import RegisterAdmin from './components/RegisterAdmin.jsx';
import Book from './components/Book.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Cards /> },
      { path: "/login", element: <Login /> },
      { path: "/registerStudent", element: <Register /> },
      { path: "/registerAdmin", element: <RegisterAdmin /> },
      {
        path: "/adminPotel", // Corrected path
        element: <AdminPotel />, // Wrap child routes in a component for organization
        children: [
          // Define your child routes for admin functionality here
          { path: "/adminPotel", element: <Table /> }, // Example child route
          { path: "/adminPotel/issuedTable", element: <IssuedTable/> }, // Example child route
          { path: "/adminPotel/dueTable", element: <DueListTable/> },
          { path: "/adminPotel/addBook", element: <Book/> },
        ],
      },
      { path: "/signup", element: <Register /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(

<Provider store={store}>

  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
</Provider>
  
)
