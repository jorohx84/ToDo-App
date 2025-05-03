import React from 'react';
import './App.scss';
import Header from './header';
import MainContent from './maincontent';
import Footer from './footer'
import Imprint from './imprint'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/imprint" element={<Imprint />} />
        {/* weitere Seiten */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
