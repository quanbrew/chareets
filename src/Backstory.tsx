import * as React from 'react';
import {Map} from "immutable";
import {BackstoryField as Field} from "./fields/BackstoryField";

interface State {
  backstory: Map<string, string>
}


export class Backstory extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {backstory: Map()};
  }


  render() {
    const name = (name: string) => ({
      value: this.state[name],
      name: name,
      onChange: (value: string) =>
        this.setState({backstory: this.state.backstory.set(name, value)})
    });
    return (
      <div className="Backstory container">
        <div className="columns">
          <div className="column">

            <Field label="个人描述" {...name("personalDescription")}/>
            <Field label="思想/信念" {...name("ideologyOrBeliefs")}/>
            <Field label="重要之人" {...name("significantPeople")}/>
            <Field label="意义非凡之地" {...name("meaningfulLocations")}/>
          </div>
          <div className="column">

            <Field label="宝贵之物" {...name("treasuredPossessions")}/>
            <Field label="特质" {...name("traits")}/>
            <Field label="伤口与疤痕" {...name("injuriesAndScars")}/>
            <Field label="恐惧症和狂躁症" {...name("phobiasAndManias")}/>
          </div>

        </div>
      </div>
    );
  }
}
