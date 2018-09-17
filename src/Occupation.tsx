import * as React from 'react';
import NumberInput from "./fields/NumberInput";


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
    return (
      <div>
        <div>
          <label>职业</label>
          <input
            value={this.state.name}
            onChange={e => this.setState({name: e.currentTarget.value})}
          />
        </div>
        <div>
          <label>信用等级范围</label>
          <NumberInput
            value={this.state.credit_min}
            onChange={x => this.setState({credit_min: x})}
          /> - <NumberInput
          value={this.state.credit_max}
          onChange={x => this.setState({credit_max: x})}
        />
        </div>
        <div>
          <textarea
            value={this.state.remark}
            onChange={(e) => this.setState({remark: e.currentTarget.value})}
          />
        </div>
      </div>
    );
  }
}
