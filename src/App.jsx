import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/add-task' element={<ContactForm />}></Route>
      
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
