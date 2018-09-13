import {Skill, SubSkill} from "./skillData";
import * as React from "react";
import {SyntheticEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCodeBranch, faDesktop, faPlusSquare, faSave, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import NumberInput from "./fields/NumberInput";
import {faPagelines} from "@fortawesome/free-brands-svg-icons";


export interface Props {
  editing: boolean;
  startEdit: () => void;
  submitEdit: (skill: Skill) => void;
  addSkill: (skill: Skill) => void;
  cancelEdit: () => void;
  skill: Skill;
}


interface State {
  skill: Skill;
  selected: number | "other";
  mark: boolean;
}


export class SkillItem extends React.Component<Props, State> {
  startEdit = () => this.setState({skill: this.props.skill}, this.props.startEdit);

  editSkill = (skill: Partial<Skill>) =>
    this.setState({skill: {...this.state.skill, ...skill}});
  private skillPointInputs = () => {
    const isCthulhuMythos = this.props.skill.name === "Cthulhu Mythos";
    const isCreditRating = this.props.skill.name === "Credit Rating";
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
            this.setState({mark: e.currentTarget.checked});
          }} type="checkbox"/>
        </div>
      )}

    </div>);
    return (<div>{initial}{occupation}{interest}{growth}</div>)
  };
  private select = () => {
    let select = null;
    // Is this skill contains many variant.
    const contains = this.props.skill.contains;
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
        <FontAwesomeIcon icon={faSave}/> 保存
      </button>);

    const addButton = (
      <button onClick={() => this.props.addSkill(this.state.skill)}>
        <FontAwesomeIcon icon={faPlusSquare}/> 新增
      </button>);

    const cancelButton = (
      <button onClick={this.props.cancelEdit}>
        <FontAwesomeIcon icon={faTimesCircle}/> 取消
      </button>);

    return <div>{editButton}{this.props.skill.contains !== undefined ? addButton : null}{cancelButton}</div>;
  };

  constructor(props: Skill & Props) {
    super(props);
    this.state = {skill: this.props.skill, selected: 0, mark: false};
  }

  render() {
    if (this.props.editing) {
      return this.editing();
    }
    else {
      return (
        <div className="SkillItem" onClick={this.startEdit}>
          {this.label()}
          {this.props.skill.name ? <div>{this.props.skill.name}</div> : null}
          <div>{this.total()}</div>
        </div>);
    }
  }

  private label() {
    const subSkill = this.subSkill();
    const tag = this.props.skill.tag;
    const modern = tag !== undefined && tag.includes("modern");
    const irregular = tag !== undefined && tag.includes("irregular");
    const variantIcon = <span>{subSkill ? <FontAwesomeIcon title="分支" icon={faCodeBranch}/> : null}</span>;
    const subSkillName = <span>{subSkill !== null ? subSkill.label : null}</span>;

    return (<div>
      <span>{this.props.skill.label}{variantIcon}{subSkillName}</span>
      {modern ? (<span><FontAwesomeIcon title="现代" icon={faDesktop}/></span>) : null}
      {irregular ? <span><FontAwesomeIcon title="非常规" icon={faPagelines}/></span> : null}
    </div>);
  }

  private total(): number {
    const initial = this.initial();
    const occupation = this.props.skill.occupation;
    const interest = this.props.skill.interest;
    const growth = this.props.skill.growth;
    let total = 0;
    if (initial) total += initial;
    if (occupation) total += occupation;
    if (interest) total += interest;
    if (growth) total += growth;
    return total;
  }

  private editing() {
    let label = null;
    if (this.state.selected === "other") {
      label = <input
        onChange={(e) => this.editSkill({label: e.currentTarget.value})}
        value={this.state.skill.label}
      />;
    }
    else {
      label = this.label();
    }
    return (
      <div>
        {label}
        <div>{this.select()}</div>
        {this.skillPointInputs()}
        <div>{this.total()}</div>
        {this.buttons()}
      </div>
    );
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
      return this.props.skill.initial;
    }
  }

  private subSkill(): null | SubSkill {
    const contains = this.props.skill.contains;
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
