import * as React from 'react';
import {Map} from "immutable";
import {div} from "./utils";


interface Props {
  attributes: Map<string, number>;
}


export class Status extends React.Component<Props, {}> {
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
    const attr = this.props.attributes;
    return (
      <div className="status">
        <h2>状态</h2>
        <p>SAN: {Status.san(attr)}</p>
        <p>MP: {Status.mp(attr)}</p>
        <p>HP: {Status.hp(attr)}</p>
      </div>
    )
  }
}
