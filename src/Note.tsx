import * as React from 'react';
import {SyntheticEvent} from 'react';
import {getId} from "./utils";


interface Props {
  value: string;
  setter: (next: string) => void;
}


interface State {
  id: string;
}


export class Note extends React.Component<Props, State> {
  handleChange = (e: SyntheticEvent<HTMLTextAreaElement>) =>
    this.props.setter(e.currentTarget.value);

  constructor(props: Props) {
    super(props);
    this.state = {id: getId()};
  }

  render() {
    return (
      <div className="box">
        <div className="field">
          <label className="label title is-5" htmlFor={this.state.id}>调查员笔记</label>
          <textarea className="textarea" value={this.props.value} id={this.state.id} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}
