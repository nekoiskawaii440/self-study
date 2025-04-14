import React, { useState } from 'react';
import './App.css';
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <div className="contents">
        <Timer />
      </div>
    </div>
  );
}

export default App;
