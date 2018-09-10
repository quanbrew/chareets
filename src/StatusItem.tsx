import * as React from 'react';
import NumberInput from "./fields/NumberInput";


interface Props {
  label: string;
  upper?: number;
}


interface State {
  value?: number;
  edited: boolean;
}


export class StatusItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.upper !== undefined) {
      this.state = {value: props.upper, edited: false};
    }
    else {
      this.state = {edited: false};
    }
  }

  render() {
    const upper = this.props.upper;
    const value = this.state.value;
    const label = this.props.label;
    const onChange = (v: number) => this.setState({value: v, edited: true});
    const upperLimitHint = <span className=""> / {upper === undefined ? "?" : upper}</span>;

    return (
      <div className="">
        <label className="" htmlFor={label}>{label}</label>
        <NumberInput upper={upper} id={label} className="input"
                     value={this.state.edited ? value : upper} onChange={onChange}/>
        {upperLimitHint}
      </div>);
  }
}

//
// class StatusSelect extends React.Component {
//   private status = {
//     physical_normal: "身体正常",
//     psychological_normal: "心理正常",
//     insanity_indefinite: "不定时疯狂",
//     insanity_permanent: "永久疯狂",
//     insanity_temporary: "临时疯狂",
//     major_wound: "重伤",
//     dying: "濒死",
//     dead: "死亡"
//   };
//
//   render() {
//     const statusOptions = [];
//     for (let key in this.status) {
//       statusOptions.push({value: key, label: this.status[key]})
//     }
//     return <Select isMulti options={statusOptions}/>
//   }
// }


