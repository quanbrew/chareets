import * as React from 'react';
import {List} from "immutable";


interface TagProps {
  text: string,
  remove: () => void;
}


class Tag extends React.Component<TagProps> {
  render() {
    const remove = <button onClick={this.props.remove}>x</button>;
    return (<div><span>{this.props.text}</span>{remove}</div>)
  }
}


interface State {
  tags: List<string>,
  current: string,
}


export class StatusMark extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {tags: List(), current: ""}
  }


  render() {
    const input = <input type="text" value={this.state.current} onChange={
      (e) => {
        this.setState({current: e.currentTarget.value})
      }
    }/>;
    const submit = <button onClick={() => {
      const next = this.state.tags.push(this.state.current);
      this.setState({current: "", tags: next});
    }}>+</button>;

    const tags = this.state.tags
      .toArray()
      .map((tag: string, i: number) =>
        (<Tag key={i} text={tag}
              remove={() => {
                this.setState({tags: this.state.tags.remove(i)})
              }}/>)
      );
    return (
      <div>
        {tags}
        {input}{submit}
      </div>
    );
  }
}


