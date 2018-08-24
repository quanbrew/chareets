import * as React from 'react';
import NumberInput from './fields/NumberInput';
import {Map} from "immutable";
import {randomIntFromInterval, roll} from "./utils";


interface FieldProps {
  label: string;
  name: string;
  max?: number;
  value?: number;
  set: (v: number) => void;
}


class Field extends React.PureComponent<FieldProps> {
  public render() {
    const label = this.props.label;
    const value = this.props.value;
    const id = this.props.name;
    const set = this.props.set;
    const max = this.props.max;
    let hint = this.props.children;
    if (hint === undefined && max !== undefined && value !== undefined && value > max) {
      hint = <span>{label}最多{max}</span>;
    }
    return (
      <p>
        <label htmlFor={id}>{label}</label>
        <NumberInput value={value} onChange={set} id={id}
                     className="field number-field characteristics-field"/>
        {hint}
      </p>)
  }
}


class AgeField extends React.PureComponent<FieldProps> {


  auto_age = (): number => [0, 0, 0, 0]
    .map((): number => randomIntFromInterval(15, 90))
    .reduce((a, b) => Math.min(a, b), 100);


  public render() {
    const age = this.props.value;
    let hint = null;
    if (age !== undefined) {
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
    }
    return <Field {...this.props}>
      <button onClick={() => this.props.set(this.auto_age())}>随机年龄</button>
      {hint}</Field>
  }
}


interface Props {
  attributes: Map<string, number>;
  set: (next: Map<string, number>) => void;
}


class Characteristics extends React.Component<Props, {}> {
  shouldComponentUpdate(next: Props) {
    return !this.props.attributes.equals(next.attributes)
  }

  auto_roll = () => {
    const r = (n: number, face: number): number =>
      roll(n, face).reduce((x, y) => x + y);
    const attr = this.props.attributes;
    const next = attr.merge({
      str: r(3, 6) * 5,
      con: r(3, 6) * 5,
      siz: (r(2, 6) + 6) * 5,
      dex: r(3, 6) * 5,
      app: r(3, 6) * 5,
      int: (r(2, 6) + 6) * 5,
      pow: r(3, 6) * 5,
      edu: 5 * (r(2, 6) + 6),
      luck: 5 * r(3, 6),
    });
    this.props.set(next);
  };

  public render() {
    const name = (k: string) =>
      ({
        name: k,
        value: this.props.attributes.get(k),
        set: (v: number) => this.props.set(this.props.attributes.set(k, v))
      });
    return (
      <div className="characteristics">
        <AgeField label="年龄" max={99} {...name("age")}/>
        <p>点一下这里
          <button onClick={this.auto_roll}>自动 roll 点</button>
        </p>
        <Field label="力量" max={99} {...name("str")}/>
        <Field label="体质" max={99} {...name("con")}/>
        <Field label="体型"          {...name("siz")}/>
        <Field label="敏捷" max={99} {...name("dex")}/>
        <Field label="外貌" max={99} {...name("app")}/>
        <Field label="智力" max={99} {...name("int")}/>
        <Field label="意志"          {...name("pow")}/>
        <Field label="教育" max={99} {...name("edu")}/>
        <Field label="幸运" max={99} {...name("luck")}/>
      </div>
    )
  }
}


export default Characteristics;
