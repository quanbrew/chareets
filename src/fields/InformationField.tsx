import * as React from 'react';
import {InformationState} from '../Information';


class Props {
  label: string;
  name: string;
  state: InformationState;
  updateState: any;
}


class InformationField extends React.Component<Props, {}> {
  setValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = this.props.name;
    let data = {};
    data[name] = e.currentTarget.value;
    this.props.updateState(data);
  };

  render() {
    const name = this.props.name;
    const value = this.props.state[name];
    return (<p>
      <label htmlFor={name}>{this.props.label}: </label>
      <input name={name} id={name} value={value} onChange={this.setValue}/>
    </p>);
  }
}

export default InformationField;
