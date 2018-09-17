import * as React from 'react';
import {List} from "immutable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";


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
  constructor(props: {}) {
    super(props);
    // physical_normal: "身体正常",
    // psychological_normal: "心理正常",
    // insanity_indefinite: "不定时疯狂",
    // insanity_permanent: "永久疯狂",
    // insanity_temporary: "临时疯狂",
    // major_wound: "重伤",
    // dying: "濒死",
    // dead: "死亡"
    this.state = {tags: List(["身体正常", "心理正常", "非神话相信者"]), current: ""}
  }


  render() {
    const input = <input type="text" value={this.state.current} onChange={
      (e) => {
        this.setState({current: e.currentTarget.value})
      }
    }/>;
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
        <div>{input}{submit}</div>
      </div>
    );
  }
}


