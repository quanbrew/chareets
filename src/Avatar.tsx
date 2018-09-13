import * as React from 'react';
import {SyntheticEvent} from 'react';
import AvatarEditor from 'react-avatar-editor'
import Dropzone from "react-dropzone";


interface State {
  image?: File,
  scale: number
}


export class Avatar extends React.Component<{}, State> {
  handleDrop = (dropped: Array<File>) => this.setState({image: dropped[0]});
  handleRange = (e: SyntheticEvent<HTMLInputElement>) =>
    this.setState({scale: Number(e.currentTarget.value)});

  constructor(props: {}) {
    super(props);
    this.state = {scale: 1.2};
  }

  render() {
    const size = 200;
    const border = 25;
    const zone_size = size + border * 2;
    const avatar = this.state.image;
    const scale = this.state.scale;
    const color = [255, 255, 255, 0.6];

    return (
      <div>
        <Dropzone
          onDrop={this.handleDrop}
          disableClick
          style={{width: `${zone_size}px`, height: `${zone_size}px`}}
        >
          {avatar ?
            (<AvatarEditor image={avatar} width={size} height={size} border={border}
                           color={color} scale={scale} rotate={0}/>) :
            (<div>请将角色的图片拖进这里</div>)}
        </Dropzone>
        <input type="range" value={this.state.scale} min={1.0} max={6.0} step={0.01} onChange={this.handleRange}/>
      </div>
    );
  }
}
