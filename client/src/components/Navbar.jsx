import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <div className="d-flex align-items-center p-3 flex-row  justify-content-between shadow-sm">
          
        <div className="d-flex align-items-center ">
        <img className="me-3" src="http://spsu.ac.in//wp-content/uploads/2022/12/Header-Logo-01.jpg" alt="" width="100" height="40" />
         <div>
          <h1 className="h6 mb-0 text-dark lh-1">Library</h1>
          <small>Since 2013</small>
         </div>
          </div>
        
          
          <Link to={'/registerAdmin'}>
          <button type="button" class="btn btn-warning">Add New Admin</button>
          </Link>
         
      </div>
    </div>
  );
};

export default Navbar;
