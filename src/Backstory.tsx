import * as React from 'react';


interface FieldProps {
  value: string,
  label: string,
  name: string,
  onChange: (next: string) => void;
}


function Field(props: FieldProps) {
  const label = <label htmlFor={props.name}>{props.label}</label>;
  const input = <textarea value={props.value} id={props.name}
                          onChange={e => props.onChange(e.currentTarget.value)}/>;
  return <div>
    <div>{label}</div>
    <div>{input}</div>
  </div>
}


interface State {
  personalDescription: string,
  ideologyOrBeliefs: string,
  significantPeople: string,
  meaningfulLocations: string,
  treasuredPossessions: string,
  traits: string,
  injuriesAndScars: string,
  phobiasAndManias: string,
  other: string
}


export class Backstory extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      personalDescription: "",
      ideologyOrBeliefs: "",
      significantPeople: "",
      meaningfulLocations: "",
      treasuredPossessions: "",
      traits: "",
      injuriesAndScars: "",
      phobiasAndManias: "",
      other: ""
    };
  }


  render() {
    const make = (name: keyof State, label: string) =>
      <Field
        value={this.state[name]} label={label} name={name}
        onChange={(s: string) => this.setState((prev: State) => ({...prev, [name]: s}))}
      />;
    return (
      <div>
        {make("personalDescription", "个人描述")}
        {make("ideologyOrBeliefs", "思想/信念")}
        {make("significantPeople", "重要之人")}
        {make("meaningfulLocations", "意义非凡之地")}
        {make("treasuredPossessions", "宝贵之物")}
        {make("traits", "特质")}
        {make("injuriesAndScars", "伤口与疤痕")}
        {make("phobiasAndManias", "恐惧症和狂躁症")}
      </div>
    );
  }
}
