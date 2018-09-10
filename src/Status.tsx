import * as React from 'react';
import {Map} from "immutable";
import {div} from "./utils";
import NumberInput from "./fields/NumberInput";
import Select from "react-select";


interface ItemProps {
  label: string;
  upper?: number;
}


interface ItemState {
  value?: number;
  edited: boolean;
}


class StatusItem extends React.Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);
    if (props.upper !== undefined) {
      this.state = {value: props.upper, edited: false};
    }
    else {
      this.state = {edited: false};
    }
  }

  render() {
    const upper = this.props.upper;
    const value = this.state.value;
    const label = this.props.label;
    const onChange = (v: number) => this.setState({value: v, edited: true});
    const upperLimitHint = <span className=""> / {upper === undefined ? "?" : upper}</span>;

    return (
      <div className="">
        <label className="" htmlFor={label}>{label}</label>
        <NumberInput upper={upper} id={label} className="input"
                     value={this.state.edited ? value : upper} onChange={onChange}/>
        {upperLimitHint}
      </div>);
  }
}


class StatusSelect extends React.Component {
  private status = {
    physical_normal: "身体正常",
    psychological_normal: "心理正常",
    insanity_indefinite: "不定时疯狂",
    insanity_permanent: "永久疯狂",
    insanity_temporary: "临时疯狂",
    major_wound: "重伤",
    dying: "濒死",
    dead: "死亡"
  };

  render() {
    const statusOptions = [];
    for (let key in this.status) {
      statusOptions.push({value: key, label: this.status[key]})
    }
    return <Select isMulti options={statusOptions}/>
  }
}



interface Props {
  attributes: Map<string, number>;
}


class StatusState {
  armor: number;
}


export class Status extends React.Component<Props, StatusState> {
  constructor(props: Props) {
    super(props);
    this.state = {armor: 0};
  }


  render() {
    const [db, build] = this.db_and_build();
    const mov = this.mov();
    const db_field = db === null ? null : <p>伤害加深（DB）：{db}</p>;
    const build_field = build === null ? null : <p>体格（Build）：{build}</p>;
    const mov_field = mov === null ? null : <p>移动力（MOV）：{mov}</p>;
    return (
      <div className="status">
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
          <StatusSelect/>
        </div>
      </div>
    )
  }

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
}
