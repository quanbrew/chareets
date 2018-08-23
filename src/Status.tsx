import * as React from 'react';
import {SheetContext, SheetData} from "./Sheet";
import {Map} from "immutable";
// import {CharacteristicsData} from "./Characteristics";
import {div} from "./utils";
//
// // import Select from 'react-select';
//
//
// interface Props {
//   characteristics: CharacteristicsData;
// }
//
//
// export class StatusData {
//   san?: number;
//   mp?: number;
//   hp?: number;
//   status: Array<string>;
//
//
//   constructor() {
//     this.status = [];
//   }
// }
//
//

export class Status extends React.Component {
  private static san(attr: Map<string, number>): number | undefined {
    return attr.get("pow");
  }

  private static mp(attr: Map<string, number>): number | undefined {
    const pow = attr.get("pow");
    if (pow !== undefined) {
      return div(pow, 5);
    }
    else {
      return undefined;
    }
  }

  private static hp(attr: Map<string, number>): number | undefined {
    const siz = attr.get("siz");
    const con = attr.get("con");
    if (siz !== undefined && con !== undefined) {
      return Math.floor((siz + con) / 10);
    }
    else {
      return undefined;
    }
  }

  render() {
    return (
      <SheetContext.Consumer>{(data: SheetData) => (
        <div className="status">
          <h2>状态</h2>
          <p>SAN: {Status.san(data.attributes)}</p>
          <p>MP: {Status.mp(data.attributes)}</p>
          <p>HP: {Status.hp(data.attributes)}</p>
        </div>
      )}</SheetContext.Consumer>
    )
  }
}

// export class Status extends React.Component<Props, StatusData> {
//   constructor(props: Props) {
//     super(props);
//     this.state = new StatusData();
//   }
//
//   render() {
//
//     return (
//       <div className="status">
//         <h2>状态</h2>
//         <p>SAN: {this.san()}</p>
//         <p>MP: {this.mp()}</p>
//         <p>HP: {this.hp()}</p>
//       </div>
//     );
//   }
//
//   private san(): number | undefined {
//     return this.props.characteristics.pow
//   }
//
//   private mp(): number | undefined {
//     const pow = this.props.characteristics.pow;
//     if (pow === undefined) {
//       return pow;
//     }
//     return div(pow, 5);
//   }
//
//   private hp(): number | undefined {
//     const siz = this.props.characteristics.siz;
//     const con = this.props.characteristics.con;
//     if (siz === undefined || con === undefined) {
//       return
//     }
//     else {
//       return Math.floor((siz + con) / 10);
//     }
//   }
// }
//
// export default Status;
