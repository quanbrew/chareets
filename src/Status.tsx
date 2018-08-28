import * as React from 'react';
import {Map} from "immutable";
import {div} from "./utils";
import NumberInput from "./fields/NumberInput";


interface FieldProps {
  label: string;
  max?: number;
}


interface FieldState {
  value?: number;
  edited: boolean;
}


class Field extends React.Component<FieldProps, FieldState> {
  constructor(props: FieldProps) {
    super(props);
    if (props.max !== undefined) {
      this.state = {value: props.max, edited: false};
    }
    else {
      this.state = {edited: false};
    }
  }

  render() {
    const max = this.props.max;
    const value = this.state.value;
    const label = this.props.label;
    const onChange = (v: number) => this.setState({value: v, edited: true});
    const upperLimitHint = <span className=""> / {max === undefined ? "?" : max}</span>;

    return (
      <div className="">
        <label className="" htmlFor={label}>{label}</label>
        <NumberInput upper={max} id={label} className="input"
                     value={this.state.edited ? value : max} onChange={onChange}/>
        {upperLimitHint}
      </div>);
  }
}


interface Props {
  attributes: Map<string, number>;
}


export class Status extends React.Component<Props, {}> {
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

  render() {
    const [db, build] = this.db_and_build();
    const db_field = db === null ? null : <p>伤害加深（DB）：{db}</p>;
    const build_field = build === null ? null : <p>体格：{build}</p>;
    return (
      <div className="status">
        <div className="">
          <Field label="HP" max={this.hp()}/>
          <Field label="SAN" max={this.san()}/>
          <Field label="MP" max={this.mp()}/>
          <Field label="移动" max={this.mov()}/>
          {db_field}{build_field}
        </div>
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

  private mov(): number | undefined {

    const dex = this.props.attributes.get("dex");
    const str = this.props.attributes.get("str");
    const siz = this.props.attributes.get("siz");
    const age = this.props.attributes.get("age", 20);
    if ([dex, str, siz].some((x?: number) => x === undefined)) {
      return undefined;
    }
    let mov = 0;
    if (dex < siz && str < siz) {
      mov = 7
    }
    if (dex >= siz || str >= siz) {
      mov = 8
    }
    if (dex > siz && str > siz) {
      mov = 9
    }
    if (age >= 80) {
      mov -= 5
    }
    else if (age >= 70) {
      mov -= 4
    }
    else if (age >= 60) {
      mov -= 3
    }
    else if (age >= 50) {
      mov -= 2
    }
    else if (age >= 40) {
      mov -= 1
    }
    return mov;
  }
}
