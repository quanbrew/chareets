import * as React from 'react';
import {Map} from 'immutable';
import './App.css';

import logo from './logo.svg';
import Information from './Information';
import Characteristics from './Characteristics';
import {Status} from './Status';


type Updater = <K extends keyof SheetData>(data: Pick<SheetData, K>) => void;

export class SheetData {
  attributes: Map<string, number>;
  information: Map<string, string>;
  update: Updater;

  constructor(f: Updater) {
    this.attributes = Map();
    this.information = Map();
    this.update = f;
  }
}

export const SheetContext = React.createContext(new SheetData(console.log));


class Sheet extends React.Component<{}, SheetData> {
  constructor(props: {}) {
    super(props);
    this.state = new SheetData((x) => this.setState(x));
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

export default Sheet;
