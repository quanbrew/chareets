import * as React from 'react';
import {CharacterData, SheetContext} from "../CharacterData";


class Props {
  label: string;
  name: string;
}


class AgeField extends React.Component<Props, {}> {
  render() {
    const name = this.props.name;
    const label = <label htmlFor={name}>{this.props.label}: </label>;
    return (
      <SheetContext.Consumer>{(character: CharacterData) => (
        <p>{label}<input name={name} id={name} value={character[name]} onChange={
          (e: React.SyntheticEvent<HTMLInputElement>) => {
            let data = {};
            const value = Number(character[name]);
            if (!isNaN(value)) {
              data[name] = e.currentTarget.value;
              character.updater(data);
            }
          }
        }/></p>
      )}</SheetContext.Consumer>);
  }
}

export default AgeField;
