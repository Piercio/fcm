import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { getNotifications } from './notifications';

function App() {
 
  const notes = getNotifications().map( note => 
    <li>
      <h2>{note.title}</h2>
      {note.body} - {new Date(note.timestamp).toISOString()}
    </li>
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {notes}
        </ul>
      </header>
    </div>
  );
}

export default App;
