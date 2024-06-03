import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import login from '../assets/login.jpg';
import Navbar from "./Navbar";
export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://server-879d.onrender.com/login', { email, password })
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem('token', res.data.token); 
                navigate('/home');
                alert('Login Success');
            } else {
                alert('Login Failed');
            }
        })
        .catch(err => console.log(err));
};
  return (
    <div className='flex justify-center items-center h-[92vh] w-auto  '  style={{ 
        backgroundImage: `url(${login})`,
         backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', // Optional: This ensures the image covers the entire container
        backgroundPosition: 'center' 
    }}>
  
    <div className="bg-gray-100 p-6 rounded-[15px] shadow-md w-96 h-96 backdrop-filter  bg-opacity-50 backdrop-blur-md ">
        <h2 className="text-xl font-bold text-center ">LogIn</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
            <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder='Email' autoComplete='off' name='email' className='w-full h-[30px]' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-3'>
                <label htmlFor="password">
                    <strong>Password</strong>
                </label>
                <input type="password" placeholder='Password' name='password' className='w-full h-[30px]' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='submit' className='bg-blue-500 text-black p-2 mt-2  rounded-lg w-full'>Login</button>
        </form>
        <p className="mt-6 text-sm text-white">Don't have an account?</p>
                <Link to="/register" className="bg-blue-500 text-white p-2 rounded-lg w-full block text-center mt-4">
                    Register
                </Link>
    </div>
</div> );
}