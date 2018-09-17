import * as React from 'react';
import {SyntheticEvent} from 'react';
import AvatarEditor from 'react-avatar-editor'
import Dropzone from "react-dropzone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt, faTrash} from "@fortawesome/free-solid-svg-icons";


interface State {
  image?: File,
  scale: number
}


export class Avatar extends React.Component<{}, State> {
  handleDrop = (dropped: Array<File>) => this.setState({image: dropped[0]});
  handleRange = (e: SyntheticEvent<HTMLInputElement>) =>
    this.setState({scale: Number(e.currentTarget.value)});
  clearImage = () => this.setState({image: undefined});

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

    const clear = (<button onClick={this.clearImage}><FontAwesomeIcon icon={faTrash}/></button>);
    const scale_input = (
      <input type="range" value={this.state.scale} onChange={this.handleRange}
             min={1.0} max={6.0} step={0.01}/>
    );

    return (
      <div className="Avatar">
        <Dropzone
          onDrop={this.handleDrop}
          disableClick={avatar !== undefined}
          className="avatar-drop"
          style={{width: `${zone_size}px`, height: `${zone_size}px`}}
        >
          {avatar ?
            (<AvatarEditor image={avatar} width={size} height={size} border={border}
                           color={color} scale={scale} rotate={0}/>) :
            (<div className="help">请将角色的图片拖进这里，或者点击上传<FontAwesomeIcon icon={faCloudUploadAlt}/></div>)}
        </Dropzone>
        {avatar ? <div className="tool">{clear}{scale_input}</div> : null}
      </div>
    );
  }
}
