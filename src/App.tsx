import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={'/mineSweep'}>mine sweep</Link>
      </header>
    </div>
  );
}

export default App;
