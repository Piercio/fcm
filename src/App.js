import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [title, setTitle]  = useState('');
  const [body, setBody]  = useState('');
  const [icon, setIcon]  = useState('');
  const [action, setAction]  = useState('#');
  
  // messaging().then(m =>
  //   m.onMessage(payload => {
  //     console.log('[App.js] Message received', payload);
  //     setTitle(payload.data.title);
  //     setBody(payload.data.body);
  //     setIcon(payload.data.icon);
  //     setAction(payload.data.click_action);
  //   })
  // );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <>
          <h1>{title}</h1>
          {body}
          <img src={icon} />
          <a href={action}>Click Me!</a>
        </>
      </header>
    </div>
  );
}

export default App;
