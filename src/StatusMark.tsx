import * as React from 'react';
import {List} from "immutable";
import {ItemList} from "./ItemList";


interface State {
  tags: List<string>,
}


const defaults = ["身体正常", "心理正常", "非神话相信者"];
const data = ["身体正常", "心理正常", "神话相信者", "永久疯狂", "临时疯狂", "重伤", "濒死", "死亡"];


export class StatusMark extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {tags: List()}
  }

  render() {
    return (
      <ItemList items={this.state.tags} setter={next => this.setState({tags: next})}
                defaults={defaults} data={data}/>
    );
  }
}


