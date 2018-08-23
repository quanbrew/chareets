import * as React from 'react';
import BasicField from './BasicField';


class Props {
  label: string;
  name: string;
  value?: number;
  updater: (x: number) => void;
  className?: string;
}


class NumberField extends React.PureComponent<Props, {}> {
  render() {
    const name = this.props.name;
    const label = this.props.label;
    const update = (value: string) => {
      if (/^\d+$/.test(value)) {
        const number = Number(value);
        // const range = 1000000000000000;
        if (!isNaN(number) && number < 1e21) {
          this.props.updater(Number(value));
        }
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
      return this.props.value.toFixed()
    }
  }
}

export default NumberField;
