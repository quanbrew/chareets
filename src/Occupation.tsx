import * as React from 'react';
import {getId} from "./utils";
import {PointInput} from "./fields/PointInput";


interface State {
  name: string;
  remark: string;
  credit_min: number;
  credit_max: number;
}


export class Occupation extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {remark: "", credit_max: 100, credit_min: 0, name: ""};
  }

  render() {
    const occupationId = getId();
    const remarkId = getId();
    return (
      <div className="Occupation">
        <div>
          <label htmlFor={occupationId}>职业</label>
          <input value={this.state.name} id={occupationId}
                 onChange={e => this.setState({name: e.currentTarget.value})}/>
        </div>
        <div>
          <label>信用等级范围</label>
          <PointInput
            value={this.state.credit_min}
            onChange={x => this.setState({credit_min: x})}
          />
          -
          <PointInput
            value={this.state.credit_max}
            onChange={x => this.setState({credit_max: x})}
          />
        </div>
        <div>
          <label htmlFor={remarkId}>职业备注</label>
          <textarea value={this.state.remark} id={remarkId}
                    onChange={(e) => this.setState({remark: e.currentTarget.value})}/>
        </div>
      </div>
    );
  }
}
