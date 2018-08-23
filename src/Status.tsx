import * as React from 'react';
import {CharacteristicsData} from "./Characteristics";
import {div} from "./utils";

// import Select from 'react-select';


interface Props {
  characteristics: CharacteristicsData;
}


export class StatusData {
  san?: number;
  mp?: number;
  hp?: number;
  status: Array<string>;


  constructor() {
    this.status = [];
  }
}


export class Status extends React.Component<Props, StatusData> {
  constructor(props: Props) {
    super(props);
    this.state = new StatusData();
  }

  render() {

    return (
      <div className="status">
        <h2>状态</h2>
        <p>SAN: {this.san()}</p>
        <p>MP: {this.mp()}</p>
        <p>HP: {this.hp()}</p>
      </div>
    );
  }

  private san(): number | undefined {
    return this.props.characteristics.pow
  }

  private mp(): number | undefined {
    const pow = this.props.characteristics.pow;
    if (pow === undefined) {
      return pow;
    }
    return div(pow, 5);
  }

  private hp(): number | undefined {
    const siz = this.props.characteristics.siz;
    const con = this.props.characteristics.con;
    if (siz === undefined || con === undefined) {
      return
    }
    else {
      return Math.floor((siz + con) / 10);
    }
  }
}

export default Status;
