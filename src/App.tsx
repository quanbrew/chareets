import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import Information from './Information';
import {CharacterData, SheetContext} from './CharacterData';


class App extends React.Component<{}, CharacterData> {
  constructor(props: {}) {
    super(props);
    this.state = new CharacterData((update_data: object) => {
      this.setState(update_data);
    });
  }
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
        <p>欢迎你，{this.state.name === "" ? "不知名的冒险者" : this.state.name}</p>
        <SheetContext.Provider value={this.state}>
          <Information/>
        </SheetContext.Provider>
      </div>
    );
  }
}

export default App;
