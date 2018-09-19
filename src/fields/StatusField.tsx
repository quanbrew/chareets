import * as React from 'react';
import NumberInput from "./NumberInput";
import cls from "classnames";
import {getId} from "../utils";

interface Props {
  label: string;
  upper?: number;
  initial?: number;
}


interface State {
  id: string;
  value?: number;
  edited: boolean;
}


export class StatusField extends React.Component<Props, State> {
  handleChange = (new_value: number) =>
    this.setState({value: new_value, edited: true});

  constructor(props: Props) {
    super(props);
    this.state = {value: props.upper, edited: false, id: getId()};
  }

  render() {
    const upper = this.props.upper;
    const value = this.state.value;
    const label = this.props.label;
    const id = this.state.id;
    const upperLimit = <span className="button is-static"> / {upper === undefined ? "??" : upper}</span>;
    const initial = this.props.initial;
    const initialValue = initial !== undefined ? initial : upper;

    const outOfRange = value !== undefined && upper !== undefined && value > upper;
    const inputClassName = cls("input", {"is-danger": outOfRange});

    return (
      <div className={cls("StatusField", {"out-of-range": outOfRange})}>
        <label className="label" htmlFor={id}>{label}</label>
        <div className="field has-addons">
          <div className="control">
            <NumberInput value={this.state.edited ? value : initialValue} onChange={this.handleChange} id={id}
                         className={inputClassName}/>
          </div>
          <div className="control">{upperLimit}</div>
        </div>
      </div>
    );
  }
}
