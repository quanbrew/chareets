import * as React from 'react';
import NumberInput from "./fields/NumberInput";


interface Props {
  label: string;
  upper?: number;
}


interface State {
  value?: number;
  edited: boolean;
}


export class StatusItem extends React.Component<Props, State> {
  constructor(props: Props) {
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
