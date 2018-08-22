import * as React from 'react';

class Props {
  label: string;
  name: string;
  type?: string;
  value?: string;
  className?: string;
  updater: (value: string) => void;
}


class BasicField extends React.Component<Props, {}> {

  public static defaultProps: Partial<Props> = {
    type: "text",
    value: "",
  };

  render() {
    const name = this.props.name;
    const value = this.props.value;
    const type = this.props.type;
    const id = "field-" + name;
    const label = <label htmlFor={id}>{this.props.label}: </label>;
    const update = (e: React.SyntheticEvent<HTMLInputElement>) => this.props.updater(e.currentTarget.value);
    return (
      <p className={this.props.className}>
        {label}
        <input name={id} type={type} id={id} value={value} onChange={update}/>
      </p>
    );
  }
}

export default BasicField;
