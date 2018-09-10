import * as React from 'react';
import {List, Map} from "immutable";
import {Skill, skills} from "./skillData";
import {SkillItem} from "./SkillItem";

interface Props {
  attributes: Map<string, number>;
}


interface State {
  filter: string;
  skills: List<Skill>;
  editing: number | null;
}


export class SkillTable extends React.Component<Props, State> {
  addSkill = (skill: Skill) => {
    if (skill.label !== "") {
      this.setState({skills: this.state.skills.push(skill), editing: null});
    }
  };

  editSkill = (index: number) => (skill: Skill) => {
    if (skill.label !== "") {
      const nextList = this.state.skills.set(index, skill);
      this.setState({skills: nextList, editing: null});
    }
  };

  cancelEdit = () => this.setState({editing: null});

  startEditSkill = (index: number) => () => this.setState({editing: index});
  private isSkillMatch = (skill: Skill) => {
    const filter = this.state.filter.toLocaleLowerCase();
    const name = skill.name.toLocaleLowerCase();
    const label = skill.label.toLocaleLowerCase();
    return name.includes(filter) || label.includes(filter);
  };
  private skillFilter = () => {
    const filter = this.state.filter;
    const placeholder = "克苏鲁神话 或者 Cthulhu Mythos";
    return (
      <div className="">
        <label className="" htmlFor="skill-filter">筛选</label>
        <input id="skill-filter" className="" value={filter} placeholder={placeholder}
               onChange={e => this.setState({filter: e.currentTarget.value})}/>
      </div>);
  };

  constructor(props: Props) {
    super(props);
    this.state = {filter: "", skills: List(skills), editing: null};
  }

  render() {
    const skillList = this.state.skills
      .filter(this.isSkillMatch).toArray()
      .map((skill: Skill, index: number) => (
        <SkillItem
          {...skill}
          key={index}
          editing={this.state.editing === index}
          startEdit={this.startEditSkill(index)}
          addSkill={this.addSkill}
          cancelEdit={this.cancelEdit}
          submitEdit={this.editSkill(index)}
        />))
      .sort((a, b) => {
        const m = a.props.name.concat(a.props.label);
        const n = b.props.name.concat(b.props.label);
        return m.localeCompare(n);
      });

    return (
      <div>
        {this.skillFilter()}
        <div>{skillList}</div>
      </div>
    );
  }
}
