import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDice, faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import NumberInput from './fields/NumberInput';
import {Map} from "immutable";
import {div, randomIntFromInterval, roll} from "./utils";
import {StatusItem} from "./StatusItem";
import {StatusMark} from "./StatusMark";


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
        <button className="" onClick={() => this.props.set(this.autoAge())}>
          <FontAwesomeIcon icon={faDice}/>
        </button>
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
  armor: number;
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

  private db_and_build_table: Array<[number, string | null, number | null]> = [
    [1, null, null],
    // STR+SIZ DB BUILD
    [64, "-2", -2],
    [84, "-1", -1],
    [124, "0", 0],
    [164, "+1d4", 1],
    [204, "+1d6", 2],
    [284, "+2d6", 3],
    [364, "+3d6", 4],
    [444, "+4d6", 5],
    [524, "+5d6", 6],
    [Number.POSITIVE_INFINITY, null, null]
  ];

  sum() {
    const sumValue = ["str", "con", "siz", "dex", "app", "int", "pow", "edu"]
      .map((key: string) => this.props.attributes.get(key, 0))
      .reduce((a, b) => a + b);
    return <div>所有属性之和为{sumValue}</div>;
  }

  constructor(props: Props) {
    super(props);
    this.state = {rollAttr: 0, eduEnhance: 0, armor: 0}
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
        {this.otherAttributes()}
        <StatusMark/>
      </div>

    )
  }

  private db_and_build(): [string | null, number | null] {
    const str = this.props.attributes.get("str", 0);
    const siz = this.props.attributes.get("siz", 0);
    const v = str + siz;
    for (let [m, db, build] of this.db_and_build_table) {
      if (v <= m) {
        return [db, build];
      }
    }
    return [null, null];
  }

  private san(): number | undefined {
    return this.props.attributes.get("pow");
  }

  private mp(): number | undefined {
    const pow = this.props.attributes.get("pow");
    if (pow !== undefined) {
      return div(pow, 5);
    }
    else {
      return undefined;
    }
  }

  private hp(): number | undefined {
    const siz = this.props.attributes.get("siz");
    const con = this.props.attributes.get("con");
    if (siz !== undefined && con !== undefined) {
      return Math.floor((siz + con) / 10);
    }
    else {
      return undefined;
    }
  }

  private mov(): number | null {

    const dex = this.props.attributes.get("dex");
    const str = this.props.attributes.get("str");
    const siz = this.props.attributes.get("siz");
    const age = this.props.attributes.get("age", 20);
    if ([dex, str, siz].some((x?: number) => x === undefined)) {
      return null;
    }
    let mov = 0;
    if (dex < siz && str < siz) mov = 7;
    if (dex >= siz || str >= siz) mov = 8;
    if (dex > siz && str > siz) mov = 9;
    if (age >= 80) mov -= 5;
    else if (age >= 70) mov -= 4;
    else if (age >= 60) mov -= 3;
    else if (age >= 50) mov -= 2;
    else if (age >= 40) mov -= 1;
    return mov;
  }

  private otherAttributes() {
    const [db, build] = this.db_and_build();
    const mov = this.mov();
    const db_field = db === null ? null : <p>伤害加深（DB）：{db}</p>;
    const build_field = build === null ? null : <p>体格（Build）：{build}</p>;
    const mov_field = mov === null ? null : <p>移动力（MOV）：{mov}</p>;
    return (<div className="other-attributes">
      <div className="">
        <StatusItem label="HP" upper={this.hp()}/>
        <StatusItem label="SAN" upper={this.san()}/>
        <StatusItem label="MP" upper={this.mp()}/>
        {db_field}{build_field}{mov_field}
        <div>
          <label htmlFor="armor">护甲</label>
          <NumberInput id="armor" value={this.state.armor}
                       onChange={n => this.setState({armor: n})}
          />
        </div>
        {/*<StatusSelect/>*/}
      </div>
    </div>)
  }
}


export default Attributes;
