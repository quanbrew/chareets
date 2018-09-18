import * as React from 'react';
import {SyntheticEvent} from 'react';
import {List} from "immutable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {getId} from "./utils";


interface TagProps {
  text: string,
  remove: () => void;
}


class Tag extends React.Component<TagProps> {
  render() {
    const remove = <button onClick={this.props.remove}><FontAwesomeIcon icon={faTrash}/></button>;
    return (<li><span>{this.props.text}</span>{remove}</li>)
  }
}


interface State {
  tags: List<string>,
  current: string,
}


export class StatusMark extends React.Component<{}, State> {
  handleInput = (e: SyntheticEvent<HTMLInputElement>) =>
    this.setState({current: e.currentTarget.value});

  constructor(props: {}) {
    super(props);
    this.state = {tags: List(["身体正常", "心理正常", "非神话相信者"]), current: ""}
  }

  render() {
    const dataId = getId();
    const input = (<input type="text" list={dataId} value={this.state.current} onChange={this.handleInput}/>);
    const data = (
      <datalist id={dataId}>
        <option value="身体正常"/>
        <option value="心理正常"/>
        <option value="不定时疯狂"/>
        <option value="永久疯狂"/>
        <option value="临时疯狂"/>
        <option value="重伤"/>
        <option value="濒死"/>
        <option value="死亡"/>
        <option value="神话相信者"/>
      </datalist>
    );
    const submit = <button onClick={() => {
      const text = this.state.current.trim();
      if (text !== "") {
        const next = this.state.tags.push(this.state.current);
        this.setState({current: "", tags: next});
      }
    }}><FontAwesomeIcon icon={faPlus}/></button>;

    const tags = this.state.tags
      .map((tag: string, i: number) =>
        (<Tag key={i} text={tag}
              remove={() => {
                this.setState({tags: this.state.tags.remove(i)})
              }}/>)
      );
    return (
      <div className="StatusMark">
        <strong>状态与备注</strong>
        <ul>{tags}</ul>
        <div>{input}{data}{submit}</div>
      </div>
    );
  }
}


