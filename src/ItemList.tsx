import * as React from 'react';
import {List} from "immutable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {getId} from "./utils";


interface State {
  id: string;
  current: string;
}


interface Props {
  defaults?: Array<string>;
  items: List<string>;
  data?: Array<string>;
  setter: (next: List<string>) => void;
}


export class ItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const defaults = props.defaults;
    if (defaults !== undefined && props.items.count() === 0) {
      props.setter(List(defaults));
    }
    this.state = {current: "", id: getId()};
  }

  render() {
    const dataId = this.props.data !== undefined ? this.state.id + "-data" : undefined;
    const mapper = (item: string, id: number) => (
      <span className="tag is-large" key={id}>{item}
        <button
          className="delete is-small"
          onClick={() => this.props.setter(this.props.items.remove(id))}/>
      </span>
    );
    return (
      <div className="ItemList">
        <div className="field has-addons">
          <div className="control">
            <input type="text" value={this.state.current} className="input" list={dataId}
                   onChange={e => this.setState({current: e.currentTarget.value})}/>
            {this.props.data !== undefined ? (
              <datalist id={dataId}>
                {this.props.data.map((x, i) => <option key={i} value={x}/>)}
              </datalist>) : null}
          </div>

          <div className="control">
            <button className="button" onClick={() => {
              const current = this.state.current.trim();
              if (current !== "") {
                this.setState({current: ""});
                this.props.setter(this.props.items.push(current));
              }
            }}><FontAwesomeIcon icon={faPlus}/></button>
          </div>
        </div>
        <div className="tags">{this.props.items.map(mapper)}</div>
      </div>
    );
  }
}
