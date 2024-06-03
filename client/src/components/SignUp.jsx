
import React, { useState } from 'react';    
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import register from '../assets/register.jpg';
export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://server-879d.onrender.com/register', { name, email, password })
            .then((res) => {
               navigate('/login');
            })
            .catch(err=>console.log(err))
    };
  
      
    return (
        <div className='flex justify-center items-center h-screen bg-cover bg-no-repeat' style={{ 
            backgroundImage: `url(${register})`
        }}>
          
        
            <div className="bg-white p-6 rounded-[15px] shadow-md w-96 backdrop-filter backdrop-blur-md bg-opacity-20">
                <h2 className='text-xl font-bold text-center '>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input type="text" placeholder='Name' autoComplete='off' name='name' className='w-full h-full' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder='Email' autoComplete='off' name='email' className='w-full' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder='Password' name='password' className='w-full' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg w-full'>Register</button>
                </form>
                <p  className="mt-4 text-sm text-white">Already have an account?</p>
                <Link to="/login" className="bg-blue-500 text-white p-2 rounded-lg w-full block text-center mt-2">Login</Link>
            </div>
        </div>
    );
}