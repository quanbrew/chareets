import * as React from 'react';
import {List} from "immutable";
import {Skill} from "./skillData";
import {Props as SkillItemProps, SkillItem} from "./SkillItem";
import {Attributes} from "./Sheet";
import {div} from "./utils";

// import {Occupation} from "./Occupation";

interface Props {
  attributes: Attributes;
  skills: List<Skill>;
  set: (skills: List<Skill>) => void;
}


interface State {
  filter: string;
  editing: number | null;
}


export class SkillTable extends React.Component<Props, State> {
  addSkill = (skill: Skill) => {
    if (skill.label !== "") {
      this.props.set(this.props.skills.push(skill));
      this.setState({editing: null});
    }
  };

  editSkill = (index: number) => (skill: Skill) => {
    if (skill.label !== "") {
      const nextList = this.props.skills.set(index, skill);
      this.props.set(nextList);
      this.setState({editing: null});
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
    const placeholder = "筛选克苏鲁神话 或者 Cthulhu Mythos";
    return (
      <div className="field">
        {/*<label className="label" htmlFor="skill-filter">筛选</label>*/}
        <input id="skill-filter" className="input" value={filter} placeholder={placeholder}
               onChange={e => this.setState({filter: e.currentTarget.value})}/>
      </div>);
  };

  constructor(props: Props) {
    super(props);
    this.state = {filter: "", editing: null};
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
    for (let skill of this.props.skills.toArray()) {
      if (skill.occupation !== undefined) occupation += skill.occupation;
      if (skill.growth !== undefined) growth += skill.growth;
      if (skill.interest !== undefined) interest += skill.interest;
    }
    return {occupation: occupation, growth: growth, interest: interest}
  }

  render() {
    const skillList = this.props.skills
      .filter(this.isSkillMatch)
      .toArray()
      .map((skill: Skill, index: number) => this.dispatch(skill, index))
      .sort((a, b) => {
        const m = a.props.skill.name.concat(a.props.skill.label);
        const n = b.props.skill.name.concat(b.props.skill.label);
        return m.localeCompare(n);
      });

    const total = this.totalSkillPoint();
    const interestPoint = this.props.attributes.get("int", 0) * 2;

    return (
      <div className="SkillTable container" onClick={this.cancelEdit}>
        <p className="title is-4">技能</p>
        {/*<Occupation/>*/}
        <div className="field is-grouped is-grouped-multiline">
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark is-medium">职业点</span>
              <span className="tag is-info is-medium">{total.occupation}</span>
              <span className="tag is-primary is-medium">/ ??</span>
            </div>
          </div>

          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark is-medium">兴趣点</span>
              <span className="tag is-info is-medium">{total.interest}</span>
              <span className="tag is-primary is-medium">/ {interestPoint}</span>
            </div>
          </div>
        </div>
        {this.skillFilter()}
        <div className="columns  is-gapless is-multiline is-mobile">{skillList}</div>
      </div>
    );
  }
}
