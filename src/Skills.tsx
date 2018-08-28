import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusSquare, faSave, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {List, Map} from "immutable";
import Select from 'react-select';
import {Skill, skills} from "./skill_data";


interface ItemProps {
  editing: boolean;
  startEdit: () => void;
  submitEdit: (skill: Skill) => void;
  addSkill: (skill: Skill) => void;
  cancelEdit: () => void;
}


interface ItemState {
  skill: Skill;
}


class SkillItem extends React.Component<Skill & ItemProps, ItemState> {
  setSkill = (skill: Partial<Skill>) =>
    this.setState({skill: {...this.state.skill, ...skill}});
  startEdit = () => this.setState({skill: this.props}, this.props.startEdit);

  constructor(props: Skill & ItemProps) {
    super(props);
    this.state = {skill: this.props};
  }

  render() {
    if (this.props.editing) {
      const editButton = <button onClick={() => this.props.submitEdit(this.state.skill)}><FontAwesomeIcon
        icon={faSave}/></button>;
      const addButton = <button onClick={() => this.props.addSkill(this.state.skill)}><FontAwesomeIcon
        icon={faPlusSquare}/></button>;
      const cancelButton = <button onClick={() => this.props.cancelEdit()}><FontAwesomeIcon icon={faTimesCircle}/>
      </button>;
      const contains = this.props.contains;
      let select = null;
      if (contains !== undefined) {
        const choices = contains.map((x, i) => ({label: x.label, value: i}));
        select = <Select options={choices}/>
      }
      return <div>
        <input onChange={(e) => this.setSkill({label: e.currentTarget.value})} value={this.state.skill.label}/>
        {select}{cancelButton}{editButton}{addButton}
      </div>
    }
    else {
      return <p onClick={this.startEdit}>{this.props.label}</p>;
    }
  }
}


interface Props {
  attributes: Map<string, number>;
}


interface State {
  filter: string;
  skills: List<Skill>;
  editing: number | null;
}


export class Skills extends React.Component<Props, State> {
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
  cancelEdit = () => {
    this.setState({editing: null});
  };
  startEditSkill = (index: number) => () => this.setState({editing: index});

  constructor(props: Props) {
    super(props);
    this.state = {filter: "", skills: List(skills), editing: null};
  }

  render() {
    const filter = this.state.filter;
    const isSkillMatch = (skill: Skill) =>
      skill.en.toLowerCase().includes(filter) || skill.label.includes(filter);
    const skillList = this.state.skills
      .filter(isSkillMatch).toArray()
      .map((row: Skill, index: number) => {
        return <SkillItem
          {...row}
          key={index}
          editing={this.state.editing === index}
          startEdit={this.startEditSkill(index)}
          addSkill={this.addSkill}
          cancelEdit={this.cancelEdit}
          submitEdit={this.editSkill(index)}/>;
      }).sort((a, b) => {
        const m = a.props.en.concat(a.props.label);
        const n = b.props.en.concat(b.props.label);
        return m.localeCompare(n);
      });

    const skillFilter = (<div className="">
      <label className="" htmlFor="skill-filter">筛选</label>
      <input id="skill-filter" className="" value={filter} placeholder="克苏鲁神话 或者 Cthulhu Mythos"
             onChange={(e) => this.setState({filter: e.currentTarget.value})}/>
    </div>);

    return (
      <div>
        {skillFilter}
        <div>{skillList}</div>
      </div>
    );
  }
}
