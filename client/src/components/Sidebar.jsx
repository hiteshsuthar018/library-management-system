import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({selectedTab,setSelectedTab}) => {
  return (
    <div>
      <div className="d-flex flex-column flex-shrink-0 shadow p-3 text-bg-white" style={{ width: '280px' , height:'100vh' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
          <span className="fs-4">Library</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to={'/adminPotel'} className={`nav-link ${selectedTab === 'All student' ? 'active' : 'text-dark'}`} onClick={() => setSelectedTab('All student')} aria-current="page" >
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
              All student
            </Link>
          </li>
          <li>
            <Link to={'/adminPotel/issuedTable'} className={`nav-link ${selectedTab === 'Borrowed' ? 'active' : 'text-dark'}`} onClick={() => setSelectedTab('Borrowed')}>
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
              Borrowed
            </Link>
          </li>
          <li>
            <Link to={'/adminPotel/dueTable'} className={`nav-link ${selectedTab === 'Overdue' ? 'active' : 'text-dark'}`} onClick={() => setSelectedTab('Overdue')}>
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
              Overdue
            </Link>
          </li>
          <li>
            <a href="#" className="nav-link text-dark">
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
              Blocked
            </a>
          </li>
          <li>
            
            <Link to={'/adminPotel/addBook'} href="#" className={`nav-link ${selectedTab === 'Add Book' ? 'active' : 'text-dark'}`}onClick={() => setSelectedTab('Add Book')}>
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
              Add Books
            </Link>
            
          </li>
        </ul>      
      </div>
    </div>
  );
};

export default Sidebar;
