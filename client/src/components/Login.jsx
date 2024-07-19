import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response  = await dispatch(loginAdmin({ username, password }));
      console.log(response);
      if (response.meta.requestStatus === 'fulfilled') {
        navigate('/adminPotel'); // Navigate to the '/adminPotel' route only if login is successful
      } else {
        setError('Invalid username or password'); // Set error message
      }
    } catch (error) {
      setError('Invalid username or password'); // Set error message
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '100vh' }}>
      <form method='POST' style={{ width: '295px' }} onSubmit={handleSubmit}>
        <div className='d-flex flex-column align-items-center'>
          <img className='mb-4' src='/images/admin.png' alt='' width='100' height='85' />
          <h1 className='h3 mb-3 fw-normal'>Log In</h1>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            name='username'
            id='username'
            placeholder='name@example.com'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='floatingInput'>Username</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='floatingPassword'>Password</label>
        </div>
        {error && <p className='text-danger'>{error}</p>} {/* Render error message */}
        <button className='btn btn-primary w-100 my-2 py-2' type='submit'>
          Login
        </button>
        <p className='mt-5 mb-3 text-body-secondary'>© spsu</p>
      </form>
    </div>
  );
};

export default Login;
