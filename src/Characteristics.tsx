import * as React from 'react';
import NumberField from './fields/NumberField';
import {Map} from "immutable";


interface FieldProps {
  label: string;
  name: string;
  max?: number;
  value?: number;
  set: (v: number) => void;
}


class Field extends React.Component<FieldProps> {
  public render() {
    const label = this.props.label;
    const name = this.props.name;
    const value = this.props.value;
    const set = this.props.set;
    return <NumberField
      label={label} value={value} name={name} updater={set}
        className="field number-field characteristics-field"/>
  }
}


interface Props {
  attributes: Map<string, number>;
  set: (key: string) => (value: number) => void;
}


class Characteristics extends React.Component<Props, {}> {
  public render() {
    const name = (k: string) =>
      ({name: k, value: this.props.attributes.get(k), set: this.props.set(k)});
    return (
      <div className="characteristics">
        <h2>特征</h2>
        <Field label="年龄" max={99} {...name("age")}/>
        <Field label="力量" max={99} {...name("str")}/>
        <Field label="体质" max={99} {...name("con")}/>
        <Field label="体型" {...name("siz")}/>
        <Field label="敏捷" max={99} {...name("dex")}/>
        <Field label="外貌" max={99} {...name("app")}/>
        <Field label="智力" max={99} {...name("int")}/>
        <Field label="意志" {...name("pow")}/>
        <Field label="教育" max={99} {...name("edu")}/>
        <Field label="幸运" max={99} {...name("luck")}/>
      </div>
    )
  }
}


export default Characteristics;
