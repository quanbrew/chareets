import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import Information from './Information';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Chareets</h1>
        </header>
        <p className="App-intro">
          A RPG character sheets generator.
        </p>
        <Information/>
      </div>
    );
  }
}

export default App;
