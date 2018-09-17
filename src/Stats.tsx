import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDice, faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import NumberInput from './fields/NumberInput';
import {div, roll} from "./utils";
import {StatusItem} from "./StatusItem";
import {StatusMark} from "./StatusMark";
import {Attributes} from "./Sheet";
import {AttributeField as Field} from "./fields/AttributeField";
import {ageAffect, AgeField} from "./fields/AgeField";


interface Props {
  attributes: Attributes;
  set: (next: Attributes) => void;
}


class AutoRoll extends React.Component<Props> {
  static KEY = "_AutoRollTimes";

  autoRoll = () => {
    const r = (n: number, face: number): number =>
      roll(n, face).reduce((x, y) => x + y);
    const attr = this.props.attributes;
    const affect = ageAffect(attr.get("age", 0));
    let luck1 = 5 * r(3, 6);
    let luck2 = 5 * r(3, 6);
    if (affect.type === "Young" && luck2 > luck1) {
      [luck1, luck2] = [luck2, luck1];
    }

    const count = attr.get(AutoRoll.KEY, 0);
    const next = attr
      .set(AutoRoll.KEY, count + 1)
      .set(EduEnhance.KEY, 0)
      .merge({
        str: 5 * r(3, 6),
        con: 5 * r(3, 6),
        siz: 5 * (r(2, 6) + 6),
        dex: 5 * r(3, 6),
        app: 5 * r(3, 6),
        int: 5 * (r(2, 6) + 6),
        pow: 5 * r(3, 6),
        edu: 5 * (r(2, 6) + 6),
        luck: luck1,
        luck2: luck2
      });
    this.props.set(next);
  };

  render() {
    const times = this.props.attributes.get(AutoRoll.KEY, 0);
    return (
      <div>
        <button onClick={this.autoRoll}>
          <FontAwesomeIcon icon={faDice}/>属性
        </button>
        {times > 1 ? <span>已roll {times} 次</span> : null}
      </div>
    );
  }
}


class EduEnhance extends React.Component<Props> {
  static KEY = "_EduEnhanceTimes";

  eduEnhance = () => {
    const times = this.props.attributes.get(EduEnhance.KEY, 0);
    let edu = this.props.attributes.get("edu");
    if (edu === undefined) return;
    if (roll(1, 100)[0] > edu)
      edu = Math.min(99, edu + roll(1, 10)[0]);
    const next = this.props.attributes
      .set(EduEnhance.KEY, times + 1)
      .set("edu", edu);
    this.props.set(next);
  };

  render() {
    const count = this.props.attributes.get(EduEnhance.KEY, 0);
    return (<div>
      <button onClick={this.eduEnhance}><FontAwesomeIcon icon={faGraduationCap}/>增强检定</button>
      {this.shouldEnhanceTimes()}{count > 0 ? <span>已增强 {count} 次</span> : null}
    </div>);
  }

  private shouldEnhanceTimes() {
    const age = this.props.attributes.get("age");
    if (age === undefined) return null;
    const affect = ageAffect(age);
    if (affect.type === "Normal") {
      const times = affect.eduEnhance;
      return <span>需要增强 {times} 次 </span>;
    }
    else return null;
  }
}


class AppDeduct extends React.Component<Props> {
  render() {
    const age = this.props.attributes.get("age");
    if (age === undefined) return null;
    const affect = ageAffect(age);
    const attr = this.props.attributes;
    const app = attr.get("app");
    if (affect.type !== "Normal" || affect.appDeduct === 0 || app === undefined)
      return null;
    const sub = affect.appDeduct;
    return <button onClick={() => {
      this.props.set(attr.set("app", app - sub))
    }}>-{sub}</button>;
  }
}


function Armor(props: Props) {
  const KEY = "_Armor";
  return (
    <div>
      <label htmlFor="armor">护甲</label>
      <NumberInput id="armor" value={props.attributes.get(KEY, 0)}
                   onChange={n => props.set(props.attributes.set(KEY, n))}/>
    </div>
  );
}


function dbAndBuild(attr: Attributes): [string | null, number | null] {
  const str = attr.get("str", 0);
  const siz = attr.get("siz", 0);
  const v = str + siz;
  if (v <= 1) return [null, null];
  else if (v <= 64) return ["-2", -2];
  else if (v <= 84) return ["-1", -1];
  else if (v <= 124) return ["0", 0];
  else if (v <= 164) return ["+1d4", 1];
  else if (v <= 204) return ["+1d6", 2];
  else if (v <= 284) return ["+2d6", 3];
  else if (v <= 364) return ["+3d6", 4];
  else if (v <= 444) return ["+4d6", 5];
  else if (v <= 524) return ["+5d6", 6];
  else return [null, null];
}


class Db extends React.Component<Props> {
  render() {
    const db = dbAndBuild(this.props.attributes)[0];
    const value = <span>{db === null ? "??" : db}</span>;
    return <p>伤害加深（DB）：{value}</p>
  }
}


class Build extends React.Component<Props> {
  render() {
    const build = dbAndBuild(this.props.attributes)[1];
    const value = <span>{build === null ? "??" : build}</span>;
    return <p>体格（Build）：{value}</p>
  }
}


class Mov extends React.Component<Props> {
  static calculate(attr: Attributes): number | null {
    const dex = attr.get("dex");
    const str = attr.get("str");
    const siz = attr.get("siz");
    const age = attr.get("age", 20);
    if (dex === undefined || str === undefined || siz === undefined)
      return null;

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

  render() {
    const mov = Mov.calculate(this.props.attributes);
    if (mov === null) return null;
    else return (<p>移动力（MOV）：{mov}</p>);
  }
}


class Hp extends React.Component<Props> {
  static upperLimit(attr: Attributes): number | undefined {
    const siz = attr.get("siz");
    const con = attr.get("con");
    if (siz !== undefined && con !== undefined) {
      return div((siz + con), 10);
    }
    else return undefined;
  }

  render() {
    const hp = Hp.upperLimit(this.props.attributes);
    return <StatusItem label="HP" upper={hp}/>;
  }
}


class Mp extends React.Component<Props> {
  static upperLimit(attr: Attributes): number | undefined {
    const pow = attr.get("pow");
    if (pow !== undefined) {
      return div(pow, 5);
    }
    else {
      return undefined;
    }
  }

  render() {
    const mp = Mp.upperLimit(this.props.attributes);
    return <StatusItem label="MP" upper={mp}/>;
  }
}


class San extends React.Component<Props> {
  static upperLimit(attr: Attributes): number | undefined {
    return attr.get("pow");
  }

  render() {
    const san = San.upperLimit(this.props.attributes);
    return <StatusItem label="SAN" upper={san}/>;
  }
}


class Sum extends React.Component<Props> {
  static calculate(attr: Attributes) {
    return ["str", "con", "siz", "dex", "app", "int", "pow", "edu"]
      .map((key: string) => attr.get(key, 0))
      .reduce((a, b) => a + b);
  }

  render() {
    return (<div>所有属性之和为{Sum.calculate(this.props.attributes)}</div>);
  }
}


export class Stats extends React.Component<Props> {
  public render() {
    const attr = this.props.attributes;
    const affect = ageAffect(attr.get("age", 0));
    const luck2 = attr.get("luck2");
    const name = (k: string) =>
      ({
        name: k,
        set: (v: number) => this.props.set(attr.set(k, v)),
        value: attr.get(k)
      });

    return (
      <div className="section Stats">
        <div>
          <AgeField label="年龄" {...name("age")} upper={99}/>
          <AutoRoll {...this.props}/>
          <Field label="力量" {...name("str")} upper={99}/>
          <Field label="体质" {...name("con")} upper={99}/>
          <Field label="体型" {...name("siz")}/>
          <Field label="敏捷" {...name("dex")} upper={99}/>
          <Field label="外貌" {...name("app")} upper={99}><AppDeduct {...this.props}/></Field>
          <Field label="智力" {...name("int")} upper={99}/>
          <Field label="意志" {...name("pow")}/>
          <Field label="教育" {...name("edu")} upper={99}><EduEnhance {...this.props}/></Field>
          <Sum {...this.props}/>
          <Field label="幸运" {...name("luck")} upper={99}/>
          {affect.type === "Young" && luck2 !== undefined ? <p>已投两次幸运取大值（较小 {luck2}）。</p> : null}
        </div>
        <StatusMark/>
        <div className="other-attributes">
          <Hp {...this.props}/>
          <San {...this.props}/>
          <Mp {...this.props}/>
          <Db {...this.props}/>
          <Build {...this.props}/>
          <Mov {...this.props}/>
          <Armor {...this.props}/>
        </div>
      </div>

    )
  }
}

