import React from 'react';
import './App.scss';
import Header from './header';
import MainContent from './maincontent';
import Footer from './footer'
import Imprint from './imprint'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const basename = window.location.hostname === 'localhost' ? '' : '/todoapp';
function App() {
  return (
    <Router basename={basename}>
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
