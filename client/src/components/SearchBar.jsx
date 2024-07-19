import React from 'react';

const SearchBar = () => {
  return (
    <div className='m-4'>
      <div className="d-flex gap-4">
        <div className="input-group">
        <span className="input-group-text">Enrollment Id</span>
        <input type="text" aria-label="First name" className="form-control" />
        <button className="btn btn-outline-secondary" type="button">Search</button>
        </div>
        <div className="input-group">
        <span className="input-group-text">Student Name</span>
        <input type="text" aria-label="Last name" className="form-control" />
        <button className="btn btn-outline-secondary" type="button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;