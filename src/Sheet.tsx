import * as React from 'react';
import {List, Map} from 'immutable';

import {Information} from './Information';
import {Stats} from './Stats';
import {SkillTable} from "./SkillTable";
import {Backstory} from "./Backstory";
import {ItemList} from "./ItemList";
import {Note} from "./Note";
import {Skill, skills} from "./skillData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo} from "@fortawesome/free-solid-svg-icons";

export type Attributes = Map<string, number>;

export interface SheetData {
  attributes: Map<string, number>;
  information: Map<string, string>;
  backstory: Map<string, string>;
  skills: List<Skill>;
  note: string;
  items: List<string>;
}


function sheetData(): SheetData {
  return (
    {
      attributes: Map(),
      information: Map(),
      backstory: Map(),
      skills: List(skills),
      note: "",
      items: List(),
    }
  );
}


function sheetDataFromJson(data: string): SheetData {
  const o = JSON.parse(data);
  return ({
    attributes: Map(o.attributes),
    information: Map(o.information),
    backstory: Map(o.backstory),
    skills: List(o.skills),
    note: o.note,
    items: List(o.items),
  });
}


export const SheetContext = React.createContext(sheetData());


class Sheet extends React.Component<{}, SheetData> {
  setInformation = (key: string) => (value: string) =>
    this.setState({information: this.state.information.set(key, value)});

  setAttributes = (next: Map<string, number>) =>
    this.setState({attributes: next});

  setSkills = (next: List<Skill>) =>
    this.setState({skills: next});

  setBackstory = (next: Map<string, string>) =>
    this.setState({backstory: next});

  setNote = (next: string) =>
    this.setState({note: next});

  setItems = (next: List<string>) =>
    this.setState({items: next});
  handleLoad = () => {
    const key = "sheet";
    const loaded = localStorage.getItem(key);
    if (loaded !== null)
      this.setState(sheetDataFromJson(loaded));
  };
  handleSave = () => {
    const key = "sheet";
    const str = JSON.stringify(this.state);
    localStorage.setItem(key, str);
  };

  constructor(props: {}) {
    super(props);
    this.state = sheetData();
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
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button" onClick={this.handleSave}>
                      <span className="icon"><FontAwesomeIcon icon={faSave}/></span><span>保存</span>
                    </button>
                  </div>
                  <div className="control">
                    <button className="button" onClick={this.handleLoad}>
                      <span className="icon"><FontAwesomeIcon icon={faUndo}/></span><span>载入</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </header>

          <section className="section">
            <Information information={this.state.information} setter={this.setInformation}/>
          </section>

          <section className="section">
            <Stats attributes={this.state.attributes} setter={this.setAttributes}/>
          </section>
          <section className="section">
            <SkillTable skills={this.state.skills} setter={this.setSkills} attributes={this.state.attributes}/>
          </section>

          <section className="section">
            <Backstory backstory={this.state.backstory} setter={this.setBackstory}/>
          </section>
          <section className="section">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="card">
                    <div className="card-header"><p className="card-header-title">随身物品</p></div>
                    <div className="card-content">
                      <ItemList items={this.state.items} setter={this.setItems}/>
                    </div>
                  </div>
                </div>
                <div className="column"><Note value={this.state.note} setter={this.setNote}/></div>
              </div>
            </div>

          </section>
        </div>
      </SheetContext.Provider>
    );
  }
}

export default Sheet;
