import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerStudent } from '../utils/api';

const Register = () => {
  const [userData, setUserData] = useState({
    student_id: '',
    username: '',
    name: '',
    course: '',
    branch: '',
    section: '',
    password: '',
    email: '',
  });
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.registerStudent);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerStudent(userData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '100vh' }}>
          <div style={{ width: '400px' }}>
            <div className='d-flex flex-column align-items-center'>
              <img className='mb-4' src='/images/student.png' alt='' width='100' height='85' />
              <h1 className='h3 mb-3 fw-normal'>Register User</h1>
            </div>
            <div className='d-flex justify-content-center'>
              <div>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    name='student_id'
                    placeholder='Enrollment ID'
                    value={userData.student_id}
                    onChange={handleChange}
                  />
                  <label htmlFor='student_id'>Enrollment ID</label>
                </div>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    name='username'
                    placeholder='Username'
                    value={userData.username}
                    onChange={handleChange}
                  />
                  <label htmlFor='username'>Username</label>
                </div>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    placeholder='Name'
                    value={userData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor='name'>Name</label>
                </div>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    name='course'
                    placeholder='Course'
                    value={userData.course}
                    onChange={handleChange}
                  />
                  <label htmlFor='course'>Course</label>
                </div>
              </div>
              <div>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    name='branch'
                    placeholder='Branch'
                    value={userData.branch}
                    onChange={handleChange}
                  />
                  <label htmlFor='branch'>Branch</label>
                </div>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    name='section'
                    placeholder='Section'
                    value={userData.section}
                    onChange={handleChange}
                  />
                  <label htmlFor='section'>Section</label>
                </div>
                <div className='form-floating'>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    placeholder='Email'
                    value={userData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor='email'>Email</label>
                </div>
                <div className='form-floating'>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    placeholder='Password'
                    value={userData.password}
                    onChange={handleChange}
                  />
                  <label htmlFor='password'>Password</label>
                </div>
              </div>
            </div>
            <button className='btn btn-primary w-100 my-2 py-2' type='submit' disabled={loading}>
              {loading ? 'Registering...' : 'Register Now'}
            </button>
            <p className="mt-3 mb-0 text-muted cursor-pointer">Already have an account?</p>


            {error && <p className='text-danger'>{error}</p>}
            {success && <p className='text-success'>Registration successful!</p>}
            <p className='mt-5 mb-3 text-body-secondary'>© spsu</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
