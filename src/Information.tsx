import * as React from 'react';
import {Map} from "immutable";
import {Avatar} from "./Avatar";
import {getId} from "./utils";


interface FieldProps {
  label: string;
  value: string;
  set: (value: string) => void;
}


class Field extends React.PureComponent<FieldProps, {}> {
  render() {
    const id = getId();
    const value = this.props.value;
    return (
      <div>
        <label htmlFor={id}>{this.props.label}</label>
        <input value={value} id={id} onChange={e => this.props.set(e.currentTarget.value)}/>
      </div>
    )
  }
}


interface Props {
  information: Map<string, string>;
  set: (key: string) => (value: string) => void;
}


export class Information extends React.Component<Props> {
  public render() {
    const name = (k: string) =>
      ({value: this.props.information.get(k, ""), set: this.props.set(k)});
    return (
      <div className="Information section">
        <Avatar/>
        <div className="Information-fields">
          <Field label="名称" {...name("name")}/>
          <Field label="玩家" {...name("player")}/>
          <Field label="职业" {...name("occupation")}/>
          <Field label="性别" {...name("sex")}/>
          <Field label="居住地" {...name("residence")}/>
          <Field label="出生地" {...name("birthplace")}/>
        </div>
      </div>
    );
  }
}
