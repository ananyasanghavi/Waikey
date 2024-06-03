import { useState } from 'react'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import { render } from 'react-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Store from './components/Store'
import Drowsy from './pages/Drowsy'
import LearnMore from './components/LearnMore';

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/register' element={<SignUp />}></Route>
      <Route path='/login' element={<LogIn />}></Route>
      <Route path='/store-details' element={<Store />}></Route>
      <Route path='/learn-more' element={<LearnMore />}></Route>
      <Route path='/' element={<Drowsy/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
