import * as React from "react";
import {getId} from "../utils";

interface Props {
  label: string;
  value: string;
  set: (value: string) => void;
}


export class InformationField extends React.PureComponent<Props, { id: string }> {
  constructor(props: Props) {
    super(props);
    this.state = {id: getId()};
  }

  render() {
    const id = this.state.id;
    const value = this.props.value;
    return (
      <div>
        <label htmlFor={id}>{this.props.label}</label>
        <input value={value} id={id} onChange={e => this.props.set(e.currentTarget.value)}/>
      </div>
    )
  }
}
