import * as React from 'react';
import NumberField from './fields/NumberField';


interface FieldProps {
  label: string;
  name: keyof CharacteristicsData;
  value?: number;
  setValue: (x: number) => void;
}


class Field extends React.Component<FieldProps> {
  public render() {
    const label = this.props.label;
    const name = this.props.name;
    return (
      <NumberField label={label} value={this.props.value} name={name}
                   updater={this.props.setValue}
      />
    );
  }
}


export class CharacteristicsData {
  str?: number;
  con?: number;
  siz?: number;
  dex?: number;
  app?: number;
  int?: number;
  pow?: number;
  edu?: number;
  luck?: number;
  mov?: number;
}


interface Props {
  updateCharacteristics: (next: CharacteristicsData) => void;
}


class Characteristics extends React.Component<Props, CharacteristicsData> {
  constructor(props: Props) {
    super(props);
    this.state = new CharacteristicsData();
  }

  public render() {
    type Item = [keyof CharacteristicsData, string]
    const characteristics: Array<Item> = [
      ["str", "力量"],
      ["con", "体质"],
      ["siz", "体型"],
      ["dex", "敏捷"],
      ["app", "外貌"],
      ["int", "智力"],
      ["pow", "意志"],
      ["edu", "教育"],
      ["luck", "幸运"],
      ["mov", "移动力"],
    ];

    const field = (item: Item) => {
      const name: keyof CharacteristicsData = item[0];
      const label: string = item[1];
      return <Field
        label={label} name={name} key={name}
        value={this.state[name]}
        setValue={(value: number) => this.setCharacteristic(name, value)}
      />
    };
    return (
      <div>
        <h2>特征</h2>
        {characteristics.map(field)}
      </div>
    )
  }

  private setCharacteristic(name: keyof CharacteristicsData, value: number) {
    this.setState({[name]: value}, () => {
      this.props.updateCharacteristics(this.state)
    })
  }
}


export default Characteristics;
