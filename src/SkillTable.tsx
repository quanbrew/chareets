import * as React from 'react';
import {List} from "immutable";
import {Skill, skills} from "./skillData";
import {Props as SkillItemProps, SkillItem} from "./SkillItem";
import {Attributes} from "./Sheet";
import {div} from "./utils";

interface Props {
  attributes: Attributes;
}


interface State {
  filter: string;
  skills: List<Skill>;
  editing: number | null;
}


export class SkillTable extends React.Component<Props, State> {
  addSkill = (skill: Skill) => {
    if (skill.label !== "") {
      // skill.name = "";
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

  dispatch(skill: Skill, index: number) {
    const name = skill.name;
    if (name === "Dodge") {
      const dex = this.props.attributes.get("dex");
      if (dex !== undefined) skill.initial = div(dex, 2);
    }
    else if (name === "Language (Own)") {
      skill.initial = this.props.attributes.get("edu");
    }

    const props: SkillItemProps = {
      skill: skill,
      editing: this.state.editing === index,
      startEdit: this.startEditSkill(index),
      addSkill: this.addSkill,
      cancelEdit: this.cancelEdit,
      submitEdit: this.editSkill(index)
    };
    return <SkillItem
      key={index}
      {...props}
    />;
  }

  totalSkillPoint(): { occupation: number, interest: number, growth: number } {
    let occupation = 0;
    let interest = 0;
    let growth = 0;
    for (let skill of this.state.skills.toArray()) {
      if (skill.occupation !== undefined) occupation += skill.occupation;
      if (skill.growth !== undefined) growth += skill.growth;
      if (skill.interest !== undefined) interest += skill.interest;
    }
    return {occupation: occupation, growth: growth, interest: interest}
  }

  render() {
    const skillList = this.state.skills
      .filter(this.isSkillMatch)
      .toArray()
      .map((skill: Skill, index: number) => this.dispatch(skill, index))
      .sort((a, b) => {
        const m = a.props.skill.name.concat(a.props.skill.label);
        const n = b.props.skill.name.concat(b.props.skill.label);
        return m.localeCompare(n);
      });

    const total = this.totalSkillPoint();

    return (
      <div className="SkillTable">
        <div>已花费 {total.occupation} 职业点，{total.interest} 兴趣点</div>
        {this.skillFilter()}
        <div>{skillList}</div>
      </div>
    );
  }
}
