import * as React from "react";
import NumberInput from "./NumberInput";

export interface Props {
  label: string;
  name: string;
  upper?: number;
  value?: number;
  set: (v: number) => void;
  hint?: JSX.Element;
}


export class AttributeField extends React.PureComponent<Props> {
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
