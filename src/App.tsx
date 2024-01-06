import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={'/sweeper'}>mine sweeper</Link>
      </header>
    </div>
  );
}

export default App;
