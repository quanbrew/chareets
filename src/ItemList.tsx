import * as React from 'react';
import {List} from "immutable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";


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
    const mapper = (gear: string, id: number) => (
      <li key={id}>{gear}
        <button onClick={() => this.setState({items: this.state.items.remove(id)})}>
          <FontAwesomeIcon icon={faTrash}/>
        </button>
      </li>
    );
    return (
      <div>
        <div>
          <input type="text" value={this.state.current}
                 onChange={e => this.setState({current: e.currentTarget.value})}/>
          <button onClick={() => {
            const current = this.state.current;
            if (current !== "") {
              this.setState({current: "", items: this.state.items.push(current)});
            }
          }}><FontAwesomeIcon icon={faPlus}/></button>
        </div>
        <ul>{this.state.items.map(mapper)}</ul>
      </div>
    );
  }
}
