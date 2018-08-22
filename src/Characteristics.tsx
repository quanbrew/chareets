import * as React from 'react';
import {CharacterData, SheetContext} from "./CharacterData";
import NumberField from './fields/NumberField';

interface Props {
  label: string;
  name: string;
}


class Field extends React.Component<Props> {
  public render() {
    const label = this.props.label;
    const name = this.props.name;
    return (
      <SheetContext.Consumer>
        {(character: CharacterData) => (
          <NumberField label={label} value={character[name]} name={name}
                       updater={(n: number) => character.updater({[name]: n})}
          />
        )}
      </SheetContext.Consumer>
    );
  }
}


class Characteristics extends React.Component {
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
