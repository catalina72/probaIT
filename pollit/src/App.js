
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { useState } from 'react';

const App = () => {

  return (
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
  </Router>
  );
};

export default App;  