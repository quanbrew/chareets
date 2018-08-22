import * as React from 'react';
import {CharacterData, SheetContext} from "./CharacterData";
import NumberField from "./fields/NumberField";
import BasicField from "./fields/BasicField";


interface AgeProps {
  label: string;
}


class AgeField extends React.Component<AgeProps, {}> {
  render() {
    return (
      <SheetContext.Consumer>
        {
          (character: CharacterData) => (
            <NumberField
              label={this.props.label}
              name="age"
              value={character.age}
              updater={(x) => character.updater({age: x})}
            />)
        }
      </SheetContext.Consumer>
    )
  }
}


interface InfoProps {
  label: string;
  name: string;
}


class InformationField extends React.Component<InfoProps, {}> {

  render() {
    const name = this.props.name;
    return (
      <SheetContext.Consumer>{(character: CharacterData) => (
        <BasicField
          label={this.props.label}
          name={this.props.name}
          value={character[name]}
          updater={(v: string) => {
            character.updater({[name]: v})
          }}
        />
      )}</SheetContext.Consumer>);
  }
}



export class Information extends React.Component {
  public render() {

    return (
      <div>
        <h2>信息</h2>
        <InformationField label="名称" name="name"/>
        <InformationField label="玩家" name="player"/>
        <InformationField label="职业" name="occupation"/>
        <AgeField label="年龄"/>
        <InformationField label="性别" name="sex"/>
        <InformationField label="居住地" name="residence"/>
        <InformationField label="出生地" name="birthplace"/>
      </div>
    );
  }
}

export default Information;
