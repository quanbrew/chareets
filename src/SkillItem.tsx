import {Skill, SubSkill} from "./skillData";
import * as React from "react";
import {SyntheticEvent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faCodeBranch, faDesktop, faPlusSquare, faSave, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {faPagelines} from "@fortawesome/free-brands-svg-icons";
import {PointInput} from "./fields/PointInput";
import cls from "classnames";


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
}


export class SkillItem extends React.Component<Props, State> {
  startEdit = () => this.setState({skill: this.props.skill}, this.props.startEdit);

  editSkill = (skill: Partial<Skill>) =>
    this.setState({skill: {...this.state.skill, ...skill}});


  private skillPointInputs = () => {
    const isCthulhuMythos = this.isCthulhuMythos();
    const disableInitial = this.state.skill.selected !== "other";
    const disableOccupation = isCthulhuMythos;
    const disableInterest = isCthulhuMythos;
    const disableGrowth = false;

    const initial = (<div className="field">
      <label className="label" htmlFor="skill-initial">初始</label>
      <div className="control">
        <PointInput
          className="input"
          id="skill-initial"
          value={this.initial()}
          disable={disableInitial}
          onChange={x => this.editSkill({initial: x})}
        />
      </div>
    </div>);
    const occupation = (<div className="field">
      <label className="label" htmlFor="skill-occupation">职业</label>

      <div className="control">
        <PointInput
          className="input"
          id="skill-occupation"
          value={this.state.skill.occupation}
          disable={disableOccupation}
          onChange={x => this.editSkill({occupation: x})}
        />
      </div>
    </div>);
    const interest = (<div className="field">
      <label className="label" htmlFor="skill-interest">兴趣</label>

      <div className="control">
        <PointInput
          className="input"
          id="skill-interest"
          value={this.state.skill.interest}
          disable={disableInterest}
          onChange={x => this.editSkill({interest: x})}
        />
      </div>
    </div>);
    const growth = (<div className="field">
      <label className="label" htmlFor="skill-growth">成长</label>

      <div className="control">
        <PointInput
          className="input"
          id="skill-growth"
          value={this.state.skill.growth}
          disable={disableGrowth}
          onChange={x => this.editSkill({growth: x})}
        />
      </div>

    </div>);
    return (
      <div>
        <div className="columns">
          <div className="column">{initial}{occupation}</div>
          <div className="column">{interest}{growth}</div>
        </div>
        {this.mark()}
      </div>
    );
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
          this.editSkill({selected: selected});
        }
        else {
          const i = Number(selected);
          this.editSkill({selected: i, initial: contains[i].initial});
        }
      };
      const selected = this.state.skill.selected;
      select = (
        <select
          className="select"
          value={selected === undefined ? 0 : selected}
          onChange={updateSelect}>
          {options}
          <option value="other">其他...</option>
        </select>);
    }
    return select;
  };
  private buttons = () => {
    const editButton = (
      <a className="card-footer-item" title="保存" onClick={() => this.props.submitEdit(this.state.skill)}>
        <FontAwesomeIcon icon={faSave}/>
      </a>);

    const addButton = (
      <a className="card-footer-item" title="新增" onClick={() => this.props.addSkill(this.state.skill)}>
        <FontAwesomeIcon icon={faPlusSquare}/>
      </a>);

    const cancelButton = (
      <a className="card-footer-item" title="取消" onClick={this.props.cancelEdit}>
        <FontAwesomeIcon icon={faTimesCircle}/>
      </a>);

    return (
      <div className="card-footer">
        {editButton}
        {this.props.skill.contains !== undefined ? addButton : null}
        {cancelButton}
      </div>
    );
  };

  constructor(props: Skill & Props) {
    super(props);
    this.state = {skill: this.props.skill};
  }

  render() {
    const skill = this.props.skill;
    const hasOccupation = skill.occupation !== undefined && skill.occupation > 0;
    const hasInterest = skill.interest !== undefined && skill.interest > 0;
    const hasGrowth = skill.growth !== undefined && skill.growth > 0;
    const className = cls("card", "non-edit", {
      "hasGrowth": hasGrowth,
      "hasInterest": hasInterest,
      "hasOccupation": hasOccupation,
      "modified": hasGrowth || hasInterest || hasOccupation,
    });

    return (
      <div className="SkillItem column">
        {this.props.editing ? this.editing() : null}
        <div className={className}
             onClick={e => {
               e.stopPropagation();
               this.startEdit();
             }}>
          <div className="card-header">
            <div className="card-header-title">{this.label()}</div>
            <span className="card-header-icon">{this.icon()}</span>
          </div>
          <div className="card-content">
            {this.props.skill.mark === true ?
              <span className="skill-mark tag"><FontAwesomeIcon icon={faCheck}/></span> : null}
            <div className="total">{this.total()}</div>
          </div>
        </div>
      </div>);
  }

  private isCthulhuMythos() {
    return this.props.skill.name === "Cthulhu Mythos";
  }

  private isCreditRating() {
    return this.props.skill.name === "Credit Rating";
  }

  private mark() {
    if (this.isCthulhuMythos() || this.isCreditRating()) {
      return null;
    }
    else {
      return (
        <div className="field">
          <div className="control">
            <label className="checkbox" htmlFor="skill-growth-mark">
              <input id="skill-growth-mark"
                     checked={this.state.skill.mark === true}
                     onChange={(e) => {
                       this.editSkill({mark: e.currentTarget.checked});
                     }}
                     type="checkbox"/> 成长标记
            </label>
          </div>
        </div>
      );
    }
  }

  private label() {
    const subSkill = this.subSkill();
    const subSkillName = subSkill !== null ? subSkill.label : null;

    return (<div className="skill-label" title={this.props.skill.name}>
      <span>{this.props.skill.label}{subSkillName ? " : " : null}{subSkillName}</span>
    </div>);
  }

  private total(): number {
    const initial = this.initial();
    const skill = this.props.editing ? this.state.skill : this.props.skill;
    const occupation = skill.occupation;
    const interest = skill.interest;
    const growth = skill.growth;
    let total = 0;
    if (initial) total += initial;
    if (occupation) total += occupation;
    if (interest) total += interest;
    if (growth) total += growth;
    return total;
  }

  private icon() {
    const tag = this.props.skill.tag;
    const modern = tag !== undefined && tag.includes("modern");
    const irregular = tag !== undefined && tag.includes("irregular");
    const subSkills = this.props.skill.contains !== undefined;
    let icon = null;
    if (subSkills) {
      icon = <FontAwesomeIcon title="分支" icon={faCodeBranch}/>;
    }
    else if (irregular) {
      icon = <FontAwesomeIcon title="现代" icon={faDesktop}/>;
    }
    else if (modern) {
      icon = <FontAwesomeIcon title="非常规" icon={faPagelines}/>;
    }
    return icon;
  }

  private editing() {
    let label = null;
    if (this.state.skill.selected === "other") {
      label = (
        <div className="field">
          <div className="control">
            <input
              className="input"
              onChange={(e) => this.editSkill({label: e.currentTarget.value})}
              value={this.state.skill.label}
            />
          </div>
        </div>
      );
    }
    else {
      label = this.label();
    }
    return (
      <div onClick={e => e.stopPropagation()} className="editing card">
        <div className="card-header">
          <div className="card-header-title">{label}</div>
        </div>
        <div className="card-content">
          <div>{this.select()}</div>
          {this.skillPointInputs()}
          <div className="total">{this.total()}</div>
        </div>
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
      const selected = this.state.skill.selected;
      if (selected === "other") return 0;
      return this.state.skill.contains[selected === undefined ? 0 : selected].initial;
    }
    else {
      return this.props.skill.initial;
    }
  }

  private subSkill(): null | SubSkill {
    const contains = this.props.skill.contains;
    const selected = this.state.skill.selected;
    if (contains === undefined) {
      return null
    }
    else if (selected === "other") {
      return null
    }
    else if (selected === undefined) {
      return contains[0];
    }
    else {
      return contains[selected];
    }
  }
}
