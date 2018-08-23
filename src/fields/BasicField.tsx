import * as React from 'react';

class Props {
  label: string;
  name: string;
  type: string;
  value: string;
  className?: string;
  placeholder?: string;
  updater: (value: string) => void;
  editable: boolean;
}


class BasicField extends React.PureComponent<Props, {}> {

  public static defaultProps: Partial<Props> = {
    type: "text",
    value: "",
    editable: true,
  };

  render() {
    const name = this.props.name;
    const value = this.props.value;
    const type = this.props.type;
    const id = "field-" + name;
    const label = <label htmlFor={id}>{this.props.label}: </label>;
    const update = (e: React.SyntheticEvent<HTMLInputElement>) => this.props.updater(e.currentTarget.value);
    const editable = this.props.editable;
    return (
      <div className={this.props.className}>
        {label}
        <input name={id} type={type} id={id} value={value} contentEditable={editable} disabled={!editable}
               onChange={update} placeholder={this.props.placeholder}/>
        {this.props.children}
      </div>
    );
  }
}

export default BasicField;
