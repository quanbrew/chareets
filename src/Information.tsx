import * as React from 'react';
import InformationField from './fields/InformationField';
import AgeField from './fields/AgeField';


export class Information extends React.Component {
  public render() {

    return (
      <div>
        <h2>信息</h2>
        <InformationField label="名称" name="name"/>
        <InformationField label="玩家" name="player"/>
        <InformationField label="职业" name="occupation"/>
        <AgeField label="年龄" name="age"/>
        <InformationField label="性别" name="sex"/>
        <InformationField label="居住地" name="residence"/>
        <InformationField label="出生地" name="birthplace"/>
      </div>
    );
  }
}

export default Information;
