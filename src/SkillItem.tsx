import {Skill} from "./skillData";
import * as React from "react";
import {SyntheticEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSave, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import NumberInput from "./fields/NumberInput";


export interface Props {
  editing: boolean;
  startEdit: () => void;
  submitEdit: (skill: Skill) => void;
  addSkill: (skill: Skill) => void;
  cancelEdit: () => void;
}


interface State {
  skill: Skill;
  selected: number | "other";
  mark: boolean;
}


export class SkillItem extends React.Component<Skill & Props, State> {
  private skillPointInputs = () => {
    const isCthulhuMythos = this.props.name === "Cthulhu Mythos";
    const isCreditRating = this.props.name === "Credit Rating";
    const disableInitial = this.state.selected !== "other";
    const disableOccupation = isCthulhuMythos;
    const disableInterest = isCthulhuMythos;
    const disableGrowth = false;

    const initial = (<div>
      <label htmlFor="skill-initial">初始</label>
      <NumberInput
        id="skill-initial"
        value={this.initial()}
        editable={!disableInitial}
        onChange={x => this.editSkill({initial: x})}
      />
    </div>);
    const occupation = (<div>
      <label htmlFor="skill-occupation">职业</label>
      <NumberInput
        id="skill-occupation"
        value={this.state.skill.occupation}
        editable={!disableOccupation}
        onChange={x => this.editSkill({occupation: x})}
      />
    </div>);
    const interest = (<div>
      <label htmlFor="skill-interest">兴趣</label>
      <NumberInput
        id="skill-interest"
        value={this.state.skill.interest}
        editable={!disableInterest}
        onChange={x => this.editSkill({interest: x})}
      />
    </div>);
    const growth = (<div>
      <label htmlFor="skill-growth">成长</label>
      <NumberInput
        id="skill-growth"
        value={this.state.skill.growth}
        editable={!disableGrowth}
        onChange={x => this.editSkill({growth: x})}
      />
      {isCthulhuMythos || isCreditRating ? null : (
        <div>
          <label htmlFor="skill-growth-mark">标记</label>
          <input id="skill-growth-mark" checked={this.state.mark} onChange={(e) => {
            // console.log(e.currentTarget.checked);
            this.setState({mark: e.currentTarget.checked});
          }} type="checkbox"/>
        </div>
      )}

    </div>);
    return (<div>{initial}{occupation}{interest}{growth}</div>)
  };

  editSkill = (skill: Partial<Skill>) =>
    this.setState({skill: {...this.state.skill, ...skill}});

  startEdit = () => this.setState({skill: this.props}, this.props.startEdit);
  private select = () => {
    let select = null;
    // Is this skill contains many variant.
    const contains = this.props.contains;
    if (contains !== undefined) {
      const options = contains.map((x, i) => (<option key={i} value={i}>{x.label}</option>));
      const updateSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
        const selected: string = e.currentTarget.value;
        if (selected === "other") {
          this.setState({selected: selected});
        }
        else {
          const i = Number(selected);
          this.setState({selected: i});
          this.editSkill({initial: contains[i].initial})
        }
      };
      select = (
        <select value={this.state.selected} onChange={updateSelect}>
          {options}
          <option value="other">其他...</option>
        </select>);
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

    return <div>{editButton}{addButton}{cancelButton}</div>;
  };

  constructor(props: Skill & Props) {
    super(props);
    this.state = {skill: this.props, selected: 0, mark: false};
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

  render() {
    if (this.props.editing) {
      return this.editing();
    }
    else {
      const subSkill = this.subSkill();
      return <div onClick={this.startEdit}>
        <div>{this.props.label}{subSkill !== null ? ": " + subSkill.label : null}</div>
        {this.props.name ? <div>{this.props.name}</div> : null}
        <div>{this.total()}</div>
      </div>;
    }
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

  private initial(): number | undefined {
    const initial = this.state.skill.initial;
    if (initial !== undefined) {
      return initial;
    }
    else if (this.state.skill.contains !== undefined) {
      const selected = this.state.selected;
      if (selected === "other") return 0;
      return this.state.skill.contains[selected].initial;
    }
    else {
      return this.props.initial;
    }
  }

  private subSkill() {
    const contains = this.props.contains;
    const selected = this.state.selected;
    if (contains === undefined) {
      return null
    }
    else if (selected === "other") {
      return null
    }
    else {
      return contains[selected];
    }
  }
}


// export class Dodge extends React.Component<Skill & Props, State> {
//   render() {
//     return null;
//   }
// }
