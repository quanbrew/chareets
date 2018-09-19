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
    const size = 230;
    const border = 10;
    const avatar = this.state.image;
    const scale = this.state.scale;
    const color = [255, 255, 255, 0.6];

    const slider = (
      <div className="control">
        <div className="field">
          <input type="range" value={this.state.scale} onChange={this.handleRange}
                 min={1.0} max={10.0} step={0.01} width={size} height={size}
                 style={{width: size + border * 2}}
                 className="scale-slider slider"/>
        </div>
      </div>
    );


    if (avatar === undefined) {
      return (
        <div className="Avatar">
          <div className="upload">
            <Dropzone onDrop={this.handleDrop} disableClick={avatar !== undefined}
                      className="avatar-drop" accept="image/*">
              <div className="upload-hint">
                <FontAwesomeIcon className="avatar-upload-icon" icon={faCloudUploadAlt}/>
                <div>请将角色的图片拖进这里，或者点击上传</div>
              </div>
            </Dropzone>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="Avatar">
          <div className="editor">
            {slider}
            <AvatarEditor image={avatar} border={border} color={color} style={{}}
                          scale={scale} rotate={0} width={size} height={size}/>
            <div className="field">
              <div className="control">
                <button className="button is-small" onClick={this.clearImage}>
                  <span className="icon is-small"><FontAwesomeIcon icon={faTrash}/></span>
                  <span>清除当前</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
