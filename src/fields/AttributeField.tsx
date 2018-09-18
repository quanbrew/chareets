import * as React from "react";
import {getId} from "../utils";
import cls from "classnames";
import {PointInput} from "./PointInput";

export interface Props {
  label: string;
  name: string;
  upper?: number;
  value?: number;
  set: (v: number) => void;
  hint?: JSX.Element;
}


export class AttributeField extends React.PureComponent<Props, { id: string }> {
  constructor(props: Props) {
    super(props);
    this.state = {id: getId()};
  }

  public render() {
    const label = this.props.label;
    const value = this.props.value;
    const id = this.state.id;
    const set = this.props.set;
    const upper = this.props.upper;
    const name = this.props.name.toLocaleUpperCase();
    const outOfRange = upper !== undefined && value !== undefined && value > upper;
    const className = cls("AttributeField", `attr-${name}`, {"out-of-range": outOfRange});
    const hint = this.props.hint;
    return (
      <div className={className}>
        <label htmlFor={id}><span>{label}</span><span>{name}</span></label>
        <PointInput value={value} onChange={set} id={id}/>
        {this.props.children}
        {hint !== undefined ? <div className="help">{hint}</div> : null}
      </div>
    );
  }
}
