import {Skill} from "./skillData";
import * as React from "react";
import {SyntheticEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import NumberInput from "./fields/NumberInput";


interface Props {
  editing: boolean;
  startEdit: () => void;
  submitEdit: (skill: Skill) => void;
  addSkill: (skill: Skill) => void;
  cancelEdit: () => void;
}


interface State {
  skill: Skill;
  selected: number;
}


export class SkillItem extends React.Component<Skill & Props, State> {
  editSkill = (skill: Partial<Skill>) =>
    this.setState({skill: {...this.state.skill, ...skill}});
  startEdit = () => this.setState({skill: this.props}, this.props.startEdit);
  private skillPointInputs = () => {
    const initial = (<div>
      <label>初始</label>
      <NumberInput
        value={this.initial()}
        onChange={x => this.editSkill({initial: x})}
      />
    </div>);
    const occupation = (<div>
      <label>职业</label>
      <NumberInput
        value={this.state.skill.occupation}
        onChange={x => this.editSkill({occupation: x})}
      />
    </div>);
    const interest = (<div>
      <label>兴趣</label>
      <NumberInput
        value={this.state.skill.interest}
        onChange={x => this.editSkill({interest: x})}
      />
    </div>);
    const growth = (<div>
      <label>成长</label>
      <NumberInput
        value={this.state.skill.growth}
        onChange={x => this.editSkill({growth: x})}
      />
    </div>);
    return (<div>{initial}{occupation}{interest}{growth}</div>)
  };
  private select = () => {
    let select = null;
    // Is this skill contains many variant.
    const contains = this.props.contains;
    if (contains !== undefined) {
      const options = contains.map((x, i) => (<option key={i} value={i}>{x.label}</option>));
      const updateSelect = (e: SyntheticEvent<HTMLSelectElement>) =>
        this.setState({selected: Number(e.currentTarget.value)});
      select = <select onChange={updateSelect}>{options}
        <option value={-1}>其他...</option>
      </select>
    }
    return select;
  };
  private buttons = () => {
    const editButton = (
      <button onClick={() => this.props.submitEdit(this.state.skill)}>
        <FontAwesomeIcon icon={faSave}/>
      </button>);

    const addButton = (
      <button onClick={() => this.props.addSkill(this.state.skill)}>
        <FontAwesomeIcon icon={faPlusSquare}/>
      </button>);

    const cancelButton = (
      <button onClick={this.props.cancelEdit}>
        <FontAwesomeIcon icon={faTimesCircle}/>
      </button>);

    return <div>{cancelButton}{editButton}{addButton}</div>;
  };

  constructor(props: Skill & Props) {
    super(props);
    this.state = {skill: this.props, selected: 0};
  }

  render() {
    if (this.props.editing) {
      return this.editing();
    }
    else {
      return <div onClick={this.startEdit}>
        <div>{this.props.label}</div>
        {this.props.name ? <div>{this.props.name}</div> : null}
        <div>{this.total()}</div>
      </div>;
    }
  }

  private initial(): number | undefined {
    const v = this.state.skill.initial;
    if (v !== undefined) {
      return v;
    }
    else if (this.state.skill.contains !== undefined) {
      const selected = this.state.selected;
      if (selected === -1) return undefined;
      return this.state.skill.contains[selected].initial;
    }
    else {
      return undefined
    }
  }

  private total(): number {
    const initial = this.initial();
    const occupation = this.props.occupation;
    const interest = this.props.interest;
    const growth = this.props.growth;
    let total = 0;
    if (initial) total += initial;
    if (occupation) total += occupation;
    if (interest) total += interest;
    if (growth) total += growth;
    return total;
  }

  private editing() {
    return (<div>
      <input
        onChange={(e) => this.editSkill({label: e.currentTarget.value})}
        value={this.state.skill.label}
      />
      <div>{this.select()}</div>
      {this.skillPointInputs()}
      <div>{this.total()}</div>
      {this.buttons()}
    </div>);
  }
}
