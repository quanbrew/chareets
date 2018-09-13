import * as React from 'react';
import {SyntheticEvent} from 'react';
import {Map} from "immutable";
import AvatarEditor from 'react-avatar-editor'
import Dropzone from "react-dropzone";


interface FieldProps {
  label: string;
  name: string;
  value: string;
  set: (value: string) => void;
}


class Field extends React.PureComponent<FieldProps, {}> {
  render() {
    const id = this.props.name;
    const value = this.props.value;
    return (
      <div className="">
        <label className="" htmlFor={id}>{this.props.label}</label>
        <input
          value={value} id={id}
          onChange={(e) => this.props.set(e.currentTarget.value)}
          className=""
        />

      </div>
    )
  }
}


interface Props {
  information: Map<string, string>;
  set: (key: string) => (value: string) => void;
}


interface State {
  image?: File,
  scale: number
}


export class Information extends React.Component<Props, State> {
  handleDrop = (dropped: Array<File>) => this.setState({image: dropped[0]});
  handleRange = (e: SyntheticEvent<HTMLInputElement>) =>
    this.setState({scale: Number(e.currentTarget.value)});

  constructor(props: Props) {
    super(props);
    this.state = {scale: 1.2};
  }

  public render() {
    const size = 200;
    const border = 25;
    const zone_size = size + border * 2;
    const avatar = this.state.image;
    const scale = this.state.scale;
    const name = (k: string) =>
      ({name: k, value: this.props.information.get(k, ""), set: this.props.set(k)});
    return (
      <div className="">
        <Dropzone
          onDrop={this.handleDrop}
          disableClick
          style={{width: `${zone_size}px`, height: `${zone_size}px`}}
        >
          {avatar ? (<AvatarEditor
            image={avatar}
            width={size}
            height={size}
            border={border}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            rotate={0}
          />) : (<div>请将角色的图片拖进这里</div>)}

        </Dropzone>
        <input type="range" value={this.state.scale} min={1.0} max={6.0} step={0.01} onChange={this.handleRange}/>

        <Field label="名称" {...name("name")}/>
        <Field label="玩家" {...name("player")}/>
        <Field label="职业" {...name("occupation")}/>
        <Field label="性别" {...name("sex")}/>
        <Field label="居住地" {...name("residence")}/>
        <Field label="出生地" {...name("birthplace")}/>
      </div>
    );
  }
}

export default Information;
