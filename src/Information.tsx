import * as React from 'react';
import InformationField from './fields/InformationField';
import AgeField from './fields/AgeField';


export class InformationState {
  name: string;
  player: string;
  occupation: string;
  age: number;
  sex: string;
  residence: string;
  birthplace: string;
}


export class Information extends React.Component<{}, InformationState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      player: "",
      occupation: "",
      age: 20,
      sex: "",
      residence: "",
      birthplace: ""
    }
  }

  public render() {
    const updater = (data: any) => {
      this.setState(data)
    };
    return (
      <div>
        <InformationField label="名称" name="name" state={this.state} updateState={updater}/>
        <InformationField label="玩家" name="player" state={this.state} updateState={updater}/>
        <InformationField label="职业" name="occupation" state={this.state} updateState={updater}/>
        <AgeField label="年龄" name="age" state={this.state} updateState={updater}/>
        <InformationField label="性别" name="sex" state={this.state} updateState={updater}/>
        <InformationField label="居住地" name="residence" state={this.state} updateState={updater}/>
        <InformationField label="出生地" name="birthplace" state={this.state} updateState={updater}/>
      </div>
    );
  }
}

export default Information;
