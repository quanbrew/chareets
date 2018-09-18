import * as React from 'react';
import {List, Map} from 'immutable';

import logo from './logo.svg';
import {Information} from './Information';
import {Stats} from './Stats';
import {SkillTable} from "./SkillTable";
import {Backstory} from "./Backstory";
import {ItemList} from "./ItemList";
import {Note} from "./Note";
import {Skill, skills} from "./skillData";

export type Attributes = Map<string, number>;

export class SheetData {
  attributes: Map<string, number>;
  information: Map<string, string>;
  skills: List<Skill>;

  constructor() {
    this.attributes = Map();
    this.information = Map();
    this.skills = List(skills);
  }
}

export const SheetContext = React.createContext(new SheetData());


class Sheet extends React.Component<{}, SheetData> {
  setInformation = (key: string) => (value: string) =>
    this.setState({information: this.state.information.set(key, value)});

  setAttributes = (next: Map<string, number>) =>
    this.setState({attributes: next});

  setSkills = (next: List<Skill>) =>
    this.setState({skills: next});

  constructor(props: {}) {
    super(props);
    this.state = new SheetData();
  }

  public render() {
    return (
      <SheetContext.Provider value={this.state}>
        <div className="Sheet">
          <header className="Sheet-header section">
            <img src={logo} className="Sheet-logo" alt="logo"/>
            <p>欢迎你，{this.state.information.get("name", "不知名的冒险者")}</p>
          </header>

          <Information information={this.state.information} set={this.setInformation}/>
          <Stats attributes={this.state.attributes} set={this.setAttributes}/>

          <SkillTable skills={this.state.skills} set={this.setSkills} attributes={this.state.attributes}/>

          <Backstory/>
          <div className="section">
            <div>
              <p>随身物品</p>
              <ItemList/>
            </div>
            <Note/>
          </div>
        </div>
      </SheetContext.Provider>
    );
  }
}

export default Sheet;
