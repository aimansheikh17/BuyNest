import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './assets/login.css';
export default function Login() {

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:9090/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',

                },
                credentials: 'include',
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User logged in successfully', data);

                if (data.role === 'CUSTOMER') {
                    navigate('/customerhome');
                } else if (data.role === 'ADMIN') {
                    navigate('/adminhome');
                } else {
                    throw new Error('Invalid user role');
                }
            } else {
                throw new Error(data.error || 'Login failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };
  return (
    <div className='page-container1'>
         <div className='form-container1'>
         <h1 className='form-title1'>Login</h1>
         {error && <p className='error-message'>{error}</p>}
         <form onSubmit={handleSignIn} className='form-content'>
            <div className='form-group1'>
                <label htmlFor='username' className='form-label1'>Username</label>
                <input id='username' 
                type='text' 
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='form-input1'/>
            </div>
            <div className='form-group1'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input id='password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='form-input1'/>
            </div>
            <button type='submit' className='form-button18'>Sign In</button>

         </form>
         <div className='form-footer1'>
            <a href='/register' className='form-link1'>New User? Sign up here</a>
         </div>
         </div>

    </div>
  )
}
