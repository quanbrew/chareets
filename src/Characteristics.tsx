import * as React from 'react';
import {SyntheticEvent} from 'react';
import {CharacterData, SheetContext} from "./CharacterData";

class Prop {
  label: string;
  name: string;
}


class Field extends React.Component<Prop> {
  public render() {
    const label = this.props.label;
    const name = this.props.name;
    return (
      <SheetContext.Consumer>
        {(character: CharacterData) => (<p>
          <label htmlFor={name}>{label}: </label>
          <input type="text" name={name} id={name}
                 onChange={(e: SyntheticEvent<HTMLInputElement>) => {
                   let data = {};
                   const value = Number(e.currentTarget.value);
                   if (!isNaN(value)) {
                     data[name] = e.currentTarget.value;
                     character.updater(data);
                   }
                 }}
                 value={character[name] === undefined ? "" : character[name]}
          />
        </p>)}
      </SheetContext.Consumer>
    );
  }
}


export class Characteristics extends React.Component {
  public render() {
    return (
      <div>
        <h2>特征</h2>
        <Field label="力量" name="str"/>
        <Field label="体质" name="con"/>
        <Field label="体型" name="siz"/>
        <Field label="敏捷" name="dex"/>
        <Field label="外貌" name="app"/>
        <Field label="智力" name="int"/>
        <Field label="意志" name="pow"/>
        <Field label="教育" name="edu"/>
        <Field label="幸运" name="luck"/>
        <Field label="移动力" name="mov"/>
      </div>
    )
  }
}


export default Characteristics;
