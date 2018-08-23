import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import Information from './Information';
import {CharacterData, SheetContext} from './CharacterData';
import Characteristics from './Characteristics';
import {Status} from './Status';


class App extends React.Component<{}, CharacterData> {
  constructor(props: {}) {
    super(props);
    this.state = new CharacterData((x) => this.setState(x));
  }
  public render() {
    return (
      <React.StrictMode><SheetContext.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Chareets</h1>
          </header>
          <p className="App-intro">
            A RPG character sheets generator.
          </p>
          <p>欢迎你，{this.state.information.get("name", "不知名的冒险者")}</p>
          <Information/>
          <Characteristics/>
          <Status/>
        </div>
      </SheetContext.Provider></React.StrictMode>
    );
  }
}

export default App;
