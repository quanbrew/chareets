import * as React from 'react';
import {Map} from "immutable";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  set: (value: string) => void;
}


class Field extends React.PureComponent<FieldProps, {}> {
  // componentDidUpdate() {console.log("updated")}
  render() {
    const id = this.props.name;
    return (
      <p>
        <label htmlFor={id}>{this.props.label}</label>
        <input
          value={this.props.value} id={id}
          onChange={(e) => this.props.set(e.currentTarget.value)}
          className="field information"
        />
      </p>
    )
  }
}


interface Props {
  information: Map<string, string>;
  set: (key: string) => (value: string) => void;
}


export class Information extends React.Component<Props, {}> {
  public render() {
    const name = (k: string) =>
      ({name: k, value: this.props.information.get(k), set: this.props.set(k)});
    return (
      <div className="information">
        <Field label="名称" {...name("name")}/>
        <Field label="玩家" {...name("player")}/>
        <Field label="职业" {...name("occupation")}/>
        <Field label="性别" {...name("sex")}/>
        <Field label="居住地" {...name("residence")}/>
        <Field label="出生地" {...name("birthplace")}/>
      </div>
    );
  }
}

export default Information;
