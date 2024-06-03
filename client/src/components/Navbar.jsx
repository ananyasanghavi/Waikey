import React,{useState}from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false); 
    };

    return (
        <nav className="bg-white  text-black p-4">
            <ul className="flex justify-between items-center">
            <img src={logo} alt="Company Logo" className='w-10 h-10 mr-4'/>
            <Link to="/home" className="text-black text-xl pl-[9rem]">Wakiey</Link>
                <li>
                    {isLoggedIn ? (
                        <>
                        <Link to="/home" className="text-black mr-4">About</Link> 
                        <button onClick={handleLogout} className=" text-black px-4  py-2 rounded">Logout</button>
                        </>
                        ) : (
                            <div className=''>
                            <Link to='/home' className="text-black mr-4">About</Link>  
                            <Link to="/login" className="text-black">Login</Link>
                            <Link to="/register" className="text-black ml-4">Register</Link>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;