import * as React from "react";
import {getId} from "../utils";

interface Props {
  value: string,
  label: string,
  name: string,
  onChange: (next: string) => void;
}


export class BackstoryField extends React.Component<Props, { id: string }> {
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
          <textarea value={this.props.value} id={id} className="textarea"
                    onChange={e => this.props.onChange(e.currentTarget.value)}/>
        </div>
      </div>
    );
  }

}
