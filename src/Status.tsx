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
    const updater = (v: number) => this.setState({value: v, edited: true});

    return (
      <div className="field">
        <label className="label" htmlFor={label}>{label}</label>
        <div className="field has-addons">
          <div className="control">
            <NumberInput max={max} id={label} className="input"
                         value={this.state.edited ? value : max} onChange={updater}/>
          </div>
          <div className="control"><a className="button is-static">/ {max}</a></div>
        </div>
      </div>);
  }
}


interface Props {
  attributes: Map<string, number>;
}


export class Status extends React.Component<Props, {}> {
  render() {
    return (
      <div className="status">
        <h2 className="title is-4">状态</h2>

        <div className="">
          <Field label="HP" max={this.hp()}/>
          <Field label="SAN" max={this.san()}/>
          <Field label="MP" max={this.mp()}/>
          <Field label="移动力" max={this.mov()}/>
        </div>
      </div>
    )
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

  private mov(): number | undefined {

    const dex = this.props.attributes.get("dex");
    const str = this.props.attributes.get("str");
    const siz = this.props.attributes.get("siz");
    const age = this.props.attributes.get("age");
    if ([dex, str, siz, age].some((x?: number) => x === undefined)) {
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
