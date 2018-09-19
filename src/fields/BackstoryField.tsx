import * as React from "react";
import {getId} from "../utils";

interface Props {
  value: string,
  label: string,
  name: string,
  hint: string;
  onChange: (next: string) => void;
}


interface State {
  id: string;
}


export class BackstoryField extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {id: getId()};
  }

  render() {
    const id = this.state.id;
    return (
      <div className="field">
        <div><label className="label" htmlFor={id}>{this.props.label}</label></div>
        <div className="control">
          <textarea value={this.props.value} id={id} className="textarea" placeholder={this.props.hint}
                    onChange={e => this.props.onChange(e.currentTarget.value)}/>
        </div>
      </div>
    );
  }

}
