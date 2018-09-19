import * as React from 'react';
import {SyntheticEvent} from 'react';
import {getId} from "./utils";


interface State {
  id: string;
  value: string;
}


export class Note extends React.Component<{}, State> {
  handleChange = (e: SyntheticEvent<HTMLTextAreaElement>) =>
    this.setState({value: e.currentTarget.value});

  constructor(props: {}) {
    super(props);
    this.state = {value: "", id: getId()};
  }

  render() {
    return (
      <div className="box">
        <div className="field">
          <label className="label title is-5" htmlFor={this.state.id}>调查员笔记</label>
          <textarea className="textarea" value={this.state.value} id={this.state.id} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}
