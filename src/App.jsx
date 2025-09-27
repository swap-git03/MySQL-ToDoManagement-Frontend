import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Navbar from './components/Navbar';
import Home from './components/Home';
import TaskForm from './components/TaskForm';
import Footer from './components/Footer';  

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar onSearch={setSearchTerm} /> {/* Pass search handler */}
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home searchTerm={searchTerm} />} />
            <Route path='/add-task' element={<TaskForm />} />
          </Routes>
        </main>
        <Footer /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
