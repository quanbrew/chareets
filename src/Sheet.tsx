import * as React from 'react';
import {Map} from 'immutable';
import './Sheet.sass';

import logo from './logo.svg';
import {Information} from './Information';
import {Stats} from './Stats';
import {SkillTable} from "./SkillTable";
import {Backstory} from "./Backstory";
import {ItemList} from "./ItemList";
import {Note} from "./Note";

export type Attributes = Map<string, number>;


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
      <SheetContext.Provider value={this.state}>
        <div className="Sheet">
          <header className="">
            <img src={logo} className="" alt="logo"/>
            <h1 className="">Chareets</h1>
            <p className="">目前是一个 CoC 7 Edition 人物卡生成器</p>
            <p>欢迎你，{this.state.information.get("name", "不知名的冒险者")}</p>
          </header>

          <Information information={this.state.information} set={this.setInformation}/>
          <Stats attributes={this.state.attributes} set={this.setAttributes}/>

          <Backstory/>
          <SkillTable attributes={this.state.attributes}/>

          <div>
            <p>随身物品</p>
            <ItemList/>
          </div>
          <Note/>
        </div>
      </SheetContext.Provider>
    );
  }
}

export default Sheet;
