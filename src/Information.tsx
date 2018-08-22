import * as React from 'react';
import NumberField from "./fields/NumberField";
import BasicField from "./fields/BasicField";


interface FieldProps {
  label: string;
  name: string;
  value: string | number;
  setValue: (value: string | number) => void;
}

class Field extends React.Component<FieldProps, {}> {
  static defaultProps: Partial<FieldProps> = {
    value: "",
  };

  render() {
    if (typeof this.props.value === 'number') {
      return <NumberField
        label={this.props.label}
        name={this.props.name}
        value={this.props.value}
        updater={this.props.setValue}
        className="field information-field number-field"
      />
    }
    else {
      return (
        <BasicField
          label={this.props.label}
          name={this.props.name}
          value={this.props.value}
          updater={this.props.setValue}
          className="field information"
        />
      )
    }
  }
}


export class InformationData {
  name: string;
  player: string;
  occupation: string;
  sex: string;
  residence: string;
  birthplace: string;
  age: number;

  constructor() {
    this.name = "";
    this.player = "";
    this.occupation = "";
    this.sex = "";
    this.residence = "";
    this.birthplace = "";
  }
}


interface Props {
  updater: (next: InformationData) => void;
}


export class Information extends React.Component<Props, InformationData> {

  constructor(props: Props) {
    super(props);
    this.state = new InformationData();
  }

  public render() {
    type Item = [keyof InformationData, string];
    const information_item: Array<Item> = [
      ["name", "名称"],
      ["player", "玩家"],
      ["occupation", "职业"],
      ["age", "年龄"],
      ["sex", "性别"],
      ["residence", "居住地"],
      ["birthplace", "出生地"],
    ];
    const information = information_item.map((item: Item) => {
      const key: keyof InformationData = item[0];
      const label: string = item[1];
      const setValue = (value: string | number) => {
        const data = {};
        data[key] = value;
        this.setInformation(data);
      };
      return <Field
        label={label}
        name={key}
        key={key}
        value={this.state[key]}
        setValue={setValue}
      />
    });
    return (
      <div className="information">
        <h2>信息</h2>
        {information}
      </div>
    );
  }

  private setInformation<K extends keyof InformationData>(data: Pick<InformationData, K>) {
    this.setState(data, () => this.props.updater(this.state));
  }
}

export default Information;
