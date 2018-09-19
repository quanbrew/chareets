import * as React from 'react';
import {Map} from "immutable";
import {Avatar} from "./Avatar";
import {InformationField as Field} from "./fields/InformationField";


interface Props {
  information: Map<string, string>;
  setter: (key: string) => (value: string) => void;
}


export class Information extends React.Component<Props> {
  public render() {
    const name = (k: string) =>
      ({value: this.props.information.get(k, ""), set: this.props.setter(k)});
    return (
      <div className="Information container">

        <div className="Information-fields">
          <div className="columns">
            <div className="column is-5"><Avatar/></div>
            <div className="column">
              <div className="box">

                <div className="columns is-mobile">
                  <div className="column">
                    <Field label="名称" {...name("name")}/>
                    <Field label="玩家" {...name("player")}/>
                    <Field label="职业" {...name("occupation")}/>
                  </div>
                  <div className="column">
                    <Field label="性别" {...name("sex")}/>
                    <Field label="居住地" {...name("residence")}/>
                    <Field label="出生地" {...name("birthplace")}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
