import * as React from 'react';
import {InformationState} from '../Information';


class Props {
  label: string;
  name: string;
  state: InformationState;
  updateState: any;
}


class AgeField extends React.Component<Props, {}> {
  setValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const new_value = Number(e.currentTarget.value);
    if (!isNaN(new_value)) {
      this.props.updateState({age: new_value});
    }
  };

  render() {
    const name = this.props.name;
    const value = this.props.state[name];
    return (<p>
      <label htmlFor={name}>{this.props.label}: </label>
      <input name={name} id={name} type="number" value={value} onChange={this.setValue}/>
    </p>);
  }
}

export default AgeField;
