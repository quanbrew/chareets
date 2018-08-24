import * as React from 'react';
import {NumberInput} from "./fields/NumberInput";
import {Map} from "immutable";
import {div} from "./utils";

interface SubSkill {
  label: string;
  en: string;
  initial: number;
}


interface ISkill {
  label: string;
  en: string;
  initial: number | "dex/2" | "edu"
  contains?: Array<SubSkill>;
  tag: Array<"blank" | "modern" | "irregular">;
}


const skills: Array<ISkill> = [
  {label: "心理学", en: "Psychology", initial: 10, tag: []},
  {label: "信用评级", en: "Credit Rating", initial: 0, tag: []},
  {label: "话术", en: "Fast Talk", initial: 5, tag: []},
  {label: "恐吓", en: "Intimidate", initial: 15, tag: []},
  {label: "魅惑", en: "Charm", initial: 15, tag: []},
  {label: "说服", en: "Persuade", initial: 10, tag: []},
  {label: "领航", en: "Navigate", initial: 10, tag: []},
  {label: "生存", en: "Survival", initial: 10, tag: ["blank"]},
  {label: "跳跃", en: "Jump", initial: 20, tag: []},
  {label: "攀爬", en: "Climb", initial: 15, tag: []},
  {label: "游泳", en: "Swim", initial: 20, tag: []},
  {label: "汽车驾驶", en: "Drive Auto", initial: 20, tag: []},
  {label: "驾驶", en: "Pilot", initial: 1, tag: ["blank"]},
  {label: "骑术", en: "Ride", initial: 5, tag: []},
  {label: "潜行", en: "Stealth", initial: 20, tag: []},
  {label: "追踪", en: "Track", initial: 10, tag: []},
  {label: "乔装", en: "Disguise", initial: 5, tag: []},
  {label: "锁匠", en: "Locksmith", initial: 1, tag: []},
  {label: "妙手", en: "Sleight of Hand", initial: 10, tag: []},
  {label: "会计", en: "Accounting", initial: 5, tag: []},
  {label: "法律", en: "Law", initial: 5, tag: []},
  {label: "神秘学", en: "Occult", initial: 5, tag: []},
  {label: "历史", en: "History", initial: 5, tag: []},
  {label: "人类学", en: "Anthropology", initial: 1, tag: []},
  {label: "考古学", en: "Archaeology", initial: 1, tag: []},
  {label: "博物学", en: "Natural World", initial: 10, tag: []},
  {label: "电子学", en: "Electronics", initial: 1, tag: ["modern"]},
  {
    label: "科学", en: "Science", initial: 1, tag: [], contains: [
      {label: "天文学", en: "Astronomy", initial: 1},
      {label: "地质学", en: "Geology", initial: 1},
      {label: "气象学", en: "Meteorology", initial: 1},
      {label: "生物学", en: "Biology", initial: 1},
      {label: "司法科学", en: "Forensics", initial: 1},
      {label: "药学", en: "Pharmacy", initial: 1},
      {label: "植物学", en: "Botany", initial: 1},
      {label: "物理学", en: "Physics", initial: 1},
      {label: "化学", en: "Chemistry", initial: 1},
      {label: "密码学", en: "Cryptography", initial: 1},
      {label: "动物学", en: "Zoology", initial: 1},
      {label: "数学", en: "Mathematics", initial: 1},
    ]
  },
  {label: "侦查", en: "Spot Hidden", initial: 25, tag: []},
  {label: "聆听", en: "Listen", initial: 20, tag: []},
  {label: "图书馆利用", en: "Library Use", initial: 20, tag: []},
  {label: "估价", en: "Appraise", initial: 5, tag: []},
  {label: "克苏鲁神话", en: "Cthulhu Mythos", initial: 0, tag: []},
  {label: "精神分析", en: "Psychoanalysis", initial: 1, tag: []},
  {label: "急救", en: "First Aid", initial: 30, tag: []},
  {label: "医学", en: "Medicine", initial: 1, tag: []},
  {label: "催眠", en: "Hypnosis", initial: 1, tag: ["irregular"]},
  {label: "闪避", en: "Dodge", initial: "dex/2", tag: []},
  {
    label: "格斗", en: "Fighting", initial: 10, tag: [], contains: [
      {label: "斗殴", en: "Brawl", initial: 25},
      {label: "剑", en: "Sword", initial: 20},
      {label: "矛", en: "Spear", initial: 20},
      {label: "斧头", en: "Axe", initial: 15},
      {label: "绞索", en: "Garrote", initial: 15},
      {label: "电锯", en: "Chainsaw", initial: 10},
      {label: "连枷", en: "Flail", initial: 10},
      {label: "鞭子", en: "Whip", initial: 5},
    ]
  },
  {label: "投掷", en: "Throw", initial: 20, tag: []},
  {
    label: "射击", en: "Firearms", initial: 10, tag: [], contains: [
      {label: "弓术", en: "Bow", initial: 15},
      {label: "手枪", en: "Handgun", initial: 20},
      {label: "步枪/霰弹枪", en: "Rifle/Shotgun", initial: 25},
      {label: "冲锋枪", en: "Submachine Gun", initial: 15},
      {label: "火焰喷射器", en: "Flamethrower", initial: 10},
      {label: "重武器", en: "Heavy Weapons", initial: 10},
      {label: "机关枪", en: "Machine Gun", initial: 10},
    ]
  },
  {label: "操作重型机械", en: "Operate Heavy Machinery", initial: 1, tag: []},
  {label: "机械维修", en: "Mechanical Repair", initial: 10, tag: []},
  {label: "电气维修", en: "Electrical Repair", initial: 10, tag: []},
  {label: "计算机使用", en: "Computer Use", initial: 5, tag: ["modern"]},
  {label: "艺术与手艺", en: "Art and Craft", initial: 5, tag: ["blank"]},
  {label: "动物驯养", en: "Animal Handling", initial: 5, tag: ["irregular"]},
  {label: "读唇", en: "Read Lips", initial: 1, tag: ["irregular"]},
  {label: "潜水", en: "Diving", initial: 1, tag: ["irregular"]},
  {label: "炮术", en: "Artillery", initial: 1, tag: ["irregular"]},
  {label: "爆破", en: "Demolitions", initial: 1, tag: ["irregular"]},
  {label: "语言（其他）", en: "Language (Other)", initial: 1, tag: ["blank"]},
  {label: "语言（母语）", en: "Language (Own)", initial: "edu", tag: ["blank"]},
];


class SuperSkill extends React.Component<ISkill> {
  render() {
    return null;
  }
}


class BlankSkill extends React.Component<ISkill> {
  render() {
    return null;
  }
}


interface SkillData {
  occupation?: number;
  interest?: number;
  grow?: number;
}


class Skill extends React.Component<ISkill, SkillData> {
  constructor(props: ISkill) {
    super(props);
    this.state = {}
  }

  render() {
    if (this.props.contains !== undefined) {
      return <SuperSkill {...this.props}/>
    }
    if (this.props.tag.some((tag) => tag === "blank")) {
      return <BlankSkill {...this.props}/>
    }
    const initial = this.props.initial;
    const occupation = this.state.occupation;
    const interest = this.state.interest;
    const grow = this.state.grow;
    let sum = 0;
    if (typeof initial === "number") sum += initial;
    if (occupation !== undefined) sum += occupation;
    if (interest !== undefined) sum += interest;
    if (grow !== undefined) sum += grow;
    const is_mythos = this.props.en === "Cthulhu Mythos";
    const change = sum === initial;
    return <tr className={change ? "skill-row changed" : "skill-row"}>
      <td><input type="checkbox" disabled={is_mythos}/></td>
      <td>
        <ruby>{this.props.label}
          <rt>{this.props.en}</rt>
        </ruby>
      </td>
      <td>{initial}</td>
      <td><NumberInput max={100} value={occupation}
                       editable={!is_mythos}
                       onChange={(n) => this.setState({occupation: n})}/></td>
      <td><NumberInput max={100} value={interest}
                       editable={!is_mythos}
                       onChange={(n) => this.setState({interest: n})}/></td>
      <td><NumberInput max={100} value={grow}
                       onChange={(n) => this.setState({grow: n})}/></td>
      <td className={sum >= 100 ? "skill-out-range" : undefined}>{sum}</td>
    </tr>;
  }
}


interface Props {
  attributes: Map<string, number>;
}


interface State {
  filter: string;
}


export class Skills extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {filter: ""}
  }

  render() {
    const filter = this.state.filter;
    const rows = skills
      .filter((row) => row.en.includes(filter) || row.label.includes(filter))
      .map((row) => {
        const props = {...row};
        if (props.initial == "edu") props.initial = this.props.attributes.get("edu", 0);
        else if (row.initial == "dex/2") props.initial = div(this.props.attributes.get("dex", 0), 2);
        return <Skill key={row.en} {...props}/>;
      });
    const skill_filter = <p>
      <label htmlFor="skill-filter">筛选</label>
      <input id="skill-filter" value={filter} placeholder="筛选技能名"
             onChange={(e) => this.setState({filter: e.currentTarget.value})}/>
    </p>;
    return (
      <div>
        <h2>技能</h2>
        {skill_filter}
        <table>
          <tbody>
          <tr>
            <th></th>
            <th>名称</th>
            <th>初始值</th>
            <th>本职</th>
            <th>兴趣</th>
            <th>成长</th>
            <th>合计</th>
          </tr>
          {rows}
          </tbody>
        </table>
      </div>
    )
  }
}
