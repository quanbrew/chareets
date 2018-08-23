import * as React from 'react';
import {Map} from "immutable";
import BasicField from "./fields/BasicField";

interface FieldProps {
  label: string;
  name: string;
  value: string;
  set: (value: string) => void;
}


class Field extends React.PureComponent<FieldProps, {}> {
  // componentDidUpdate() {console.log("updated")}
  render() {
    const name = this.props.name;
    return (
      <BasicField
        label={this.props.label}
        name={name}
        value={this.props.value}
        updater={this.props.set}
        className="field information"
      />
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
