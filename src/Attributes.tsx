import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDice, faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import NumberInput from './fields/NumberInput';
import {Map} from "immutable";
import {randomIntFromInterval, roll} from "./utils";
import {Status} from "./Status";


interface FieldProps {
  label: string;
  name: string;
  upper?: number;
  value?: number;
  set: (v: number) => void;
  hint?: JSX.Element;
}


class Field extends React.PureComponent<FieldProps> {
  public render() {
    const label = this.props.label;
    const value = this.props.value;
    const id = this.props.name;
    const set = this.props.set;
    const upper = this.props.upper;
    let hint = this.props.hint;
    if (hint === undefined && upper !== undefined && value !== undefined && value > upper) {
      hint = <span>{label}最多{upper}</span>;
    }
    return (
      <div className="">
        <label className="" htmlFor={id}>{label}<span>{id.toLocaleUpperCase()}</span></label>
        <NumberInput value={value} onChange={set} id={id}
                     className="number-field characteristics-field"/>
        {this.props.children}
        <p className="help">{hint}</p>
      </div>)
  }
}


class AgeField extends React.PureComponent<FieldProps> {
  autoAge = (): number => Array.from(Array(4).keys())
    .map((): number => randomIntFromInterval(15, 90))
    .reduce((a, b) => Math.min(a, b), 100);

  private static ageHint(age: number) {
    let hint = null;
    if (age < 15 || age > 90) {
      hint = <span>超过规则范围，请咨询主持人。</span>
    }
    else if (age < 20) {
      hint = <span>力量和体型合计减 5 点。教育减5点。 决定幸运值时可以骰 2 次并取较好的一次。</span>
    }
    else if (age < 40) {
      hint = <span>对教育进行1次增强检定。</span>
    }
    else if (age < 50) {
      hint = <span>对教育进行2次增强检定。力量体质敏捷合计减 5 点。外貌减 5 点。</span>
    }
    else if (age < 60) {
      hint = <span>对教育进行3次增强检定。力量体质敏捷合计减 10 点。外貌减 10 点。</span>
    }
    else if (age < 70) {
      hint = <span>对教育进行4次增强检定。力量体质敏捷合计减 20 点。外貌减 15 点。</span>
    }
    else if (age < 80) {
      hint = <span>对教育进行4次增强检定。力量体质敏捷合计减 40 点。外貌减 20 点。</span>
    }
    else {
      hint = <span>对教育进行4次增强检定。力量体质敏捷合计减 80 点。外貌减 25 点。</span>
    }
    return hint;
  }


  public render() {
    const age = this.props.value;
    let hint = null;
    if (age !== undefined) {
      hint = AgeField.ageHint(age);
    }
    return (
      <div className="">
        <label className="" htmlFor={this.props.name}>{this.props.label}</label>
        <NumberInput value={this.props.value} id={this.props.name}
                     onChange={this.props.set}
                     className=""/>
        <button className="" onClick={() => this.props.set(this.autoAge())}><FontAwesomeIcon icon={faDice}/></button>
        <p className="help">{hint}</p>
      </div>
    )
  }
}


interface Props {
  attributes: Map<string, number>;
  set: (next: Map<string, number>) => void;
}


interface AttributesState {
  rollAttr: number;
  eduEnhance: number;
}


class Attributes extends React.Component<Props, AttributesState> {
  autoRoll = () => {
    const r = (n: number, face: number): number =>
      roll(n, face).reduce((x, y) => x + y);
    const attr = this.props.attributes;
    const next = attr.merge({
      str: 5 * r(3, 6),
      con: 5 * r(3, 6),
      siz: 5 * (r(2, 6) + 6),
      dex: 5 * r(3, 6),
      app: 5 * r(3, 6),
      int: 5 * (r(2, 6) + 6),
      pow: 5 * r(3, 6),
      edu: 5 * (r(2, 6) + 6),
      luck: 5 * r(3, 6),
    });
    this.setState((prev: AttributesState) => ({rollAttr: prev.rollAttr + 1}));
    this.props.set(next);
  };
  eduEnhance = () => {
    let edu = this.props.attributes.get("edu");
    if (edu === undefined) return;
    this.setState((prev: AttributesState) => ({eduEnhance: prev.eduEnhance + 1}));
    const a = roll(1, 100)[0];
    if (a > edu) {
      edu += roll(1, 10)[0];
      if (edu > 99) {
        edu = 99
      }
      this.props.set(this.props.attributes.set("edu", edu));
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {rollAttr: 0, eduEnhance: 0}
  }

  sum() {
    const sumValue = ["str", "con", "siz", "dex", "app", "int", "pow", "edu"]
      .map((key: string) => this.props.attributes.get(key, 0))
      .reduce((a, b) => a + b);
    return <p>所有属性之和为{sumValue}</p>;
  }

  public render() {
    const name = (k: string) => ({
      name: k,
      value: this.props.attributes.get(k),
      set: (v: number) => this.props.set(this.props.attributes.set(k, v))
    });
    const rollAttrTimes = this.state.rollAttr;
    const autoRoll = (<div>
      <button className="" onClick={this.autoRoll}>
        <FontAwesomeIcon icon={faDice}/>属性
      </button>
      {rollAttrTimes > 1 ? <span>已roll {rollAttrTimes} 次</span> : null}
    </div>);
    const eduEnhance = (<div>
      <button onClick={this.eduEnhance}><FontAwesomeIcon icon={faGraduationCap}/>增强检定</button>
      {this.state.eduEnhance > 0 ? <span>已增强{this.state.eduEnhance}次</span> : null}
    </div>);
    return (
      <div className="">
        <AgeField label="年龄" {...name("age")} upper={99}/>
        {autoRoll}
        <Field label="力量" {...name("str")} upper={99}/>
        <Field label="体质" {...name("con")} upper={99}/>
        <Field label="体型" {...name("siz")}/>
        <Field label="敏捷" {...name("dex")} upper={99}/>
        <Field label="外貌" {...name("app")} upper={99}/>
        <Field label="智力" {...name("int")} upper={99}/>
        <Field label="意志" {...name("pow")}/>
        <Field label="教育" {...name("edu")} upper={99}>{eduEnhance}</Field>
        {this.sum()}
        <Field label="幸运" {...name("luck")} upper={99}/>
        <Status attributes={this.props.attributes}/>
      </div>
    )
  }
}


export default Attributes;
