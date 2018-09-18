import * as React from 'react';
import {SyntheticEvent} from 'react';


interface State {
  value: string;
}


export class Note extends React.Component<{}, State> {
  handleChange = (e: SyntheticEvent<HTMLTextAreaElement>) =>
    this.setState({value: e.currentTarget.value});

  constructor(props: {}) {
    super(props);
    this.state = {value: ""};
  }

  render() {
    return (
      <div>
        <p>调查员笔记</p>
        <textarea value={this.state.value} onChange={this.handleChange}/>
      </div>
    );
  }
}
