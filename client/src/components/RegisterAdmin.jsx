import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAdmin } from '../utils/api';
import { Link } from 'react-router-dom';

const RegisterAdmin = () => {
  const dispatch = useDispatch();

  // State variables for form input values and error messages
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the registerAdmin action with form data
    try {
      await dispatch(registerAdmin({ username, name, email, password }));
      // Handle success scenario (redirect, show success message, etc.)
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '100vh' }}>
      <form method='POST' style={{ width: '295px' }} onSubmit={handleSubmit}>
        <div className='d-flex flex-column align-items-center'>
          <img className='mb-4' src='/images/admin.png' alt='' width='100' height='85' />
          <h1 className='h3 mb-3 fw-normal'>Sign In</h1>
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
            type='text'
            className='form-control'
            name='name'
            id='name'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='floatingInput'>Name</label>
        </div>
        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            name='email'
            id='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='floatingEmail'>Email</label>
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
        {error && <p className='text-danger'>{error}</p>} 
        <Link to={'/login'}>
        <button className='btn btn-primary w-100 my-2 py-2' type='submit'>
          Sign in
        </button>
        </Link>
        <p className='mt-5 mb-3 text-body-secondary'>© spsu</p>
      </form>
    </div>
  );
};

export default RegisterAdmin;
