import * as React from 'react';
import {Map} from 'immutable';
import 'bulma/bulma.sass';
import './Sheet.sass';

import logo from './logo.svg';
import Information from './Information';
import Characteristics from './Characteristics';
import {Status} from './Status';
import {Skills} from "./Skills";


export class SheetData {
  attributes: Map<string, number>;
  information: Map<string, string>;

  constructor() {
    this.attributes = Map();
    this.information = Map();
  }
}

export const SheetContext = React.createContext(new SheetData());


class Sheet extends React.Component<{}, SheetData> {
  setInformation = (key: string) => (value: string) =>
    this.setState({...this.state, information: this.state.information.set(key, value)});
  setAttributes = (next: Map<string, number>): void =>
    this.setState({...this.state, attributes: next});

  constructor(props: {}) {
    super(props);
    this.state = new SheetData();
  }

  public render() {
    return (
      <React.StrictMode><SheetContext.Provider value={this.state}>
        <div className="Sheet">
          <header className="hero is-primary">
            <div className="hero-body">
              <div className="container">
                <img src={logo} className="Sheet-logo" alt="logo"/>
                <h1 className="Sheet-title title is-3">Chareets</h1>
                <p className="S-intro subtitle">目前是一个 CoC 7 Edition 人物卡生成器</p>
                <p>欢迎你，{this.state.information.get("name", "不知名的冒险者")}</p>
              </div>
            </div>
          </header>

          <section className="section">
            <div className="container">
              <Information information={this.state.information} set={this.setInformation}/>
              <div className="columns">
                <div className="column"><Characteristics attributes={this.state.attributes} set={this.setAttributes}/>
                </div>
                <div className="column"><Status attributes={this.state.attributes}/></div>
              </div>


            </div>
          </section>
          <section className="section">
            <Skills attributes={this.state.attributes}/>
          </section>
        </div>
      </SheetContext.Provider></React.StrictMode>
    );
  }
}

export default Sheet;
