import * as React from 'react';


interface State {
  value: string;
}


export class Note extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {value: ""};
  }

  render() {
    return (
      <div>
        <p>调查员笔记</p>
        <textarea value={this.state.value}
                  onChange={(e) => this.setState({value: e.currentTarget.value})}/>
      </div>
    );
  }
}
