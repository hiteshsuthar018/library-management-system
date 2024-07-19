import React from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <>
      <div className="d-flex justify-content-center flex-wrap align-items-center vh-100">
        <Link to={'/Login'}>
      <div className="card mx-2 l-bg-green" style={{ width: '300px', height: '300px' }}>
        <div className="card-body flex-column d-flex justify-content-center align-items-center">
          <img className="image" src="/images/admin.png" alt="" />
          <h1 className="card-title">Admin</h1>
        </div>
      </div>
        </Link>
      <Link to={'/registerStudent'}>
      <div className="card mx-2 l-bg-orange-dark" style={{ width: '300px', height: '300px' }}>
        <div className="card-body flex-column d-flex justify-content-center align-items-center">
        <img className="image" src="/images/student.png" alt="" />
          <h1 className="card-title">Student</h1>
        </div>
      </div>
      </Link>
    </div>
    </>
  );
};

export default Cards;
