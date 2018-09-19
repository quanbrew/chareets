import * as React from 'react';
import {List, Map} from 'immutable';

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
    const playerName = this.state.information.get("name", "不知名的冒险者");
    return (
      <SheetContext.Provider value={this.state}>
        <div className="Sheet">
          <header className="Sheet-header hero is-primary is-bold">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Chareets</h1>
                <p className="subtitle">欢迎你，{playerName}</p>
              </div>
            </div>
          </header>

          <section className="section">
            <Information information={this.state.information} set={this.setInformation}/>
          </section>

          <section className="section">
            <Stats attributes={this.state.attributes} set={this.setAttributes}/>
          </section>
          <section className="section">
            <SkillTable skills={this.state.skills} set={this.setSkills} attributes={this.state.attributes}/>
          </section>

          <section className="section">
            <Backstory/>
          </section>
          <section className="section">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="card">
                    <div className="card-header"><p className="card-header-title">随身物品</p></div>
                    <div className="card-content">

                      <ItemList/>
                    </div>
                  </div>
                </div>
                <div className="column"><Note/></div>
              </div>
            </div>

          </section>
        </div>
      </SheetContext.Provider>
    );
  }
}

export default Sheet;
