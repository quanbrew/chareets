import * as React from 'react';

class Props {
  label: string;
  name: string;
  type?: string;
  value: string;
  updater: (value: string) => void;
}


class BasicField extends React.Component<Props, {}> {
  render() {
    const name = this.props.name;
    const value = this.props.value;
    const type = this.props.type !== undefined ? this.props.type : "text";
    const id = "field-" + name;
    const label = <label htmlFor={id}>{this.props.label}: </label>;
    const update = (e: React.SyntheticEvent<HTMLInputElement>) => this.props.updater(e.currentTarget.value);
    return (
      <p>
        {label}
        <input name={id} type={type} id={id} value={value} onChange={update}/>
      </p>
    );
  }
}

export default BasicField;
