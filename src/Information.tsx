import * as React from 'react';
import NumberField from "./fields/NumberField";
import BasicField from "./fields/BasicField";
import {CharacterData, SheetContext} from "./CharacterData";


interface FieldProps {
  label: string;
  name: string;
}


class Age extends React.Component<FieldProps, {}> {
  render() {
    const name = this.props.name;
    return (
      <SheetContext.Consumer>
        {(data: CharacterData) => {
          return <NumberField
            label={this.props.label}
            name={name}
            value={data.attributes.get(name)}
            updater={(x: number) => data.update({attributes: data.attributes.set(name, x)})}
            className="field information-field number-field"
          />
        }}
      </SheetContext.Consumer>
    )
  }
}


class Field extends React.Component<FieldProps, {}> {
  render() {
    const name = this.props.name;

    return (
      <SheetContext.Consumer>
        {(data: CharacterData) => (
          <BasicField
            label={this.props.label}
            name={name}
            value={data.information.get(name)}
            updater={(x: string) => data.update({information: data.information.set(name, x)})}
            className="field information"
          />
        )}
      </SheetContext.Consumer>
    )
  }
}


export class Information extends React.Component {
  public render() {
    return (
      <div className="information">
        <h2>信息</h2>
        <Field label="名称" name="name"/>
        <Field label="玩家" name="player"/>
        <Field label="职业" name="occupation"/>
        <Age label="年龄" name="age"/>
        <Field label="性别" name="sex"/>
        <Field label="居住地" name="residence"/>
        <Field label="出生地" name="birthplace"/>
      </div>
    );
  }
}

export default Information;
