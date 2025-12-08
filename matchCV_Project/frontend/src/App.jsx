import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LiveCVBuilder from './components/LiveCV/LiveCVBuilder';
import CVHistory from './components/CVHistory/CVHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LiveCVBuilder />} />
      <Route path="/cv-builder" element={<LiveCVBuilder />} />
      <Route path="/cv-history" element={<CVHistory />} />
    </Routes>
  );
}

export default App;