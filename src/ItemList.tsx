import * as React from 'react';
import {List} from "immutable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";


interface State {
  items: List<string>;
  current: string;
}


interface Props {
  defaults?: Array<string>;
}


export class ItemList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const defaults = props.defaults;
    const xs: List<string> = defaults === undefined ? List([]) : List(defaults);
    this.state = {items: xs, current: ""};
  }

  render() {
    const mapper = (item: string, id: number) => (
      <span className="tag is-large" key={id}>{item}
        <button
          className="delete is-small"
          onClick={() => this.setState({items: this.state.items.remove(id)})}/>
      </span>
    );
    return (
      <div className="ItemList">
        <div className="field has-addons">
          <div className="control">
            <input type="text" value={this.state.current} className="input"
                   onChange={e => this.setState({current: e.currentTarget.value})}/>

          </div>

          <div className="control">
            <button className="button" onClick={() => {
              const current = this.state.current.trim();
              if (current !== "") {
                this.setState({current: "", items: this.state.items.push(current)});
              }
            }}><FontAwesomeIcon icon={faPlus}/></button>
          </div>
        </div>
        <div className="tags">{this.state.items.map(mapper)}</div>
      </div>
    );
  }
}
