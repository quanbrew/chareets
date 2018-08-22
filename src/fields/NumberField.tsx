import * as React from 'react';
import BasicField from './BasicField';


class Props {
  label: string;
  name: string;
  value?: number;
  updater: (x: number) => void;
  className?: string;
}


class NumberField extends React.Component<Props, {}> {
  render() {
    const name = this.props.name;
    const label = this.props.label;
    const update = (value: string) => {
      const new_value = Number(value);
      if (!isNaN(new_value)) {
        this.props.updater(new_value);
      }
    };
    return (<BasicField label={label} name={name} type="number"
                        className={this.props.className}
                        value={this.value()} updater={update}/>);
  }

  private value(): string {
    if (this.props.value === undefined) {
      return ""
    }
    else {
      return String(this.props.value)
    }
  }
}

export default NumberField;
