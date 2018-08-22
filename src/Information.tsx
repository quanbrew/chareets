import * as React from 'react';
import NumberField from "./fields/NumberField";
import BasicField from "./fields/BasicField";


interface AgeProps {
  name: "age";
  label: string;
  value: number;
  setValue: (value: number) => void;
}


class AgeField extends React.Component<AgeProps, {}> {
  render() {
    return <NumberField
      label={this.props.label}
      name={this.props.name}
      value={this.props.value}
      updater={this.props.setValue}
    />;
  }
}


interface InfoProps {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
}

class InformationField extends React.Component<InfoProps, {}> {
  static defaultProps: Partial<InfoProps> = {
    value: "",
  };

  render() {

    return (
      <BasicField
        label={this.props.label}
        name={this.props.name}
        value={this.props.value}
        updater={this.props.setValue}/>
    )
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
      if (key === "age") {
        return <AgeField
          value={this.state[key]}
          name={key} key={key} label={label}
          setValue={(value: number) => this.setInformation({[key]: value})}
        />;
      }
      else {
        return (
          <InformationField
            label={label}
            name={key}
            key={key}
            value={this.state[key]}
            setValue={(value: string) => {
              const data = {};
              data[key] = value;
              this.setInformation(data);
            }}
          />)
      }
    });
    return (
      <div>
        <h2>信息</h2>
        {information}
      </div>
    );
  }

  private setInformation<K extends keyof InformationData>(data: Pick<InformationData, K>) {
    this.setState(data, () => {
      this.props.updater(this.state)
    });
  }
}

export default Information;
