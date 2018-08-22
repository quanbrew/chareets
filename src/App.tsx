import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import Information from './Information';
import {CharacterData, SheetContext} from './CharacterData';
import Characteristics from './Characteristics';


class App extends React.Component<{}, CharacterData> {
  constructor(props: {}) {
    super(props);
    this.state = new CharacterData();
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
        <p>欢迎你，{this.state.information.name === "" ? "不知名的冒险者" : this.state.information.name}</p>
        <SheetContext.Provider value={this.state}>
          <Information updater={(next) => {
            this.setState({information: next})
          }}/>
          <Characteristics updater={(next) => {
            this.setState({characteristics: next})
          }}/>
        </SheetContext.Provider>
      </div>
    );
  }
}

export default App;
