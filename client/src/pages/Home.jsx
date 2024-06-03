import React, { useState } from 'react';
import axios, { Axios } from 'axios'; 
import Navbar from '../components/Navbar';
import { ReactTyped } from "react-typed";
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animation/motion';
import taxi from '../assets/Taxi.gif';
import About from '../components/About';
import Drowsy from './Drowsy';
import LearnMore from '../components/LearnMore';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [numberPlate, setNumberPlate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetStarted = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   axios.post('https://server-879d.onrender.com/store-details', { numberPlate, phoneNumber })
  };
  
  

  return (
    <div className='bg-black'>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className='flex'
      >
        <motion.div variants={fadeIn("left", "tween", 0.2, 1)} className='flex-1 justify-center mt-[200px]' style={{ textAlign: 'center' }}>
          <ReactTyped strings={['Nazar hati durgatna ghati', 'Apni shuraksha aapne hath']} typeSpeed={100} backSpeed={50} loop className='text-5xl pl-2 md:pl-4 text-yellow-300' />
          <p className='text-3xl mt-[1.5rem] ml-2 text-left text-white font-thin '> Dont let drivers risk your life,Use our app and sleep peacefully,let our app alarm you and your driver for his carelessness</p>
          <button onClick={handleGetStarted} className='bg-transparent text-white  border-[#7D7FB0] border-[3px] rounded-xl py-2 mt-10  px-4'>Get Started</button>
          <Link to='/learn-more' className='bg-[#7D7FB0] text-white rounded-xl py-2 px-4 ml-6'>Learn More</Link>
        </motion.div>
        <motion.div variants={fadeIn("left", "tween", 0.2, 1)} className='flex-1'>
          <img src={taxi} alt="" className='w-50 h-auto' />
        </motion.div>
      </motion.div>
      {isFormVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
        >
          <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">Enter Number Plate and Phone Number</h2>
            <input
              type="text"
              placeholder="Number Plate"
              name="numberPlate"
              onChange={(e) => setNumberPlate(e.target.value)}
              className="block w-full border-gray-300 rounded-md mb-4 px-4 py-2"
            />
            <input
              type="number"
              placeholder="Phone Number"
              name='phoneNumber'
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full border-gray-300 rounded-md mb-4 px-4 py-2"
            />
            <Link to="/" type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</Link>
          </form>
        </motion.div>
      )}
      <About />
    </div>
  )
}
