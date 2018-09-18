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
    const border = 0;
    const avatar = this.state.image;
    const scale = this.state.scale;
    const color = [255, 255, 255, 0.6];

    const clear = (
      <div className="control">
        <button className="button is-small" onClick={this.clearImage}><FontAwesomeIcon icon={faTrash}/></button>
      </div>
    );
    const scale_input = (
      <div className="control">
        <input type="range" value={this.state.scale} onChange={this.handleRange}
               min={1.0} max={6.0} step={0.01} className="scale"/>
      </div>
    );

    return (
      <div className="Avatar">
        <Dropzone onDrop={this.handleDrop} disableClick={avatar !== undefined}
                  className="avatar-drop" accept="image/*">
          {avatar !== undefined ?
            (<div className="editor"><AvatarEditor image={avatar} border={border}
                                                   color={color} scale={scale} rotate={0}/></div>) :
            (<div className="help">
              <FontAwesomeIcon style={{width: "5em", height: "5em"}} className="upload-avatar" icon={faCloudUploadAlt}/>
              <div>请将角色的图片拖进这里，或者点击上传</div>
            </div>)
          }
        </Dropzone>
        {avatar ? <div className="tool">{scale_input}{clear}</div> : null}
      </div>
    );
  }
}
