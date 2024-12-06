import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Diagnosis from './components/Diagnosis';
import History from './components/History';
import TentangKami from './components/TentangKami'
import Layanan from './components/Layanan'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import HasilDiagnosis from './components/HasilDiagnosis';


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/history" element={<History />} />
        <Route path="/tentangKami" element={<TentangKami />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hasilDiagnosis" element={<HasilDiagnosis />} />
      </Routes>
    </Router>
  );
}

export default App;
