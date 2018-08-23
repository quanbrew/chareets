import * as React from 'react';
import NumberField from './fields/NumberField';
import {CharacterData, SheetContext} from "./CharacterData";


interface FieldProps {
  label: string;
  name: string;
}


class Field extends React.Component<FieldProps> {
  public render() {
    const label = this.props.label;
    const name = this.props.name;
    return (

      <SheetContext.Consumer>
        {(data: CharacterData) => (<NumberField
          label={label} value={data.attributes.get(name)} name={name}
          updater={(x: number) => data.update({attributes: data.attributes.set(name, x)})}
          className="field number-field characteristics-field"
        />)}
      </SheetContext.Consumer>

    );
  }
}

class Characteristics extends React.Component {
  public render() {
    return (
      <div className="characteristics">
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
      </div>
    )
  }
}


export default Characteristics;
