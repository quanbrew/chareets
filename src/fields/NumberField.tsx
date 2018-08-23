import * as React from 'react';
import BasicField from './BasicField';


class Props {
  label: string;
  name: string;
  value?: number;
  updater?: (x: number) => void;
  className?: string;
  editable: boolean;
  max: number;
}


class NumberField extends React.PureComponent<Props, number> {
  public static defaultProps: Partial<Props> = {
    editable: true,
    max: 1e21 - 1,
  };

  render() {
    const name = this.props.name;
    const label = this.props.label;
    const update = (v: string) => {
      if (/^\d+$/.test(v)) {
        const number = Number(v);
        if (
          this.props.editable &&
          this.props.updater !== undefined &&
          !isNaN(number) &&
          number <= this.props.max
        ) {
          this.props.updater(Number(v));
        }
      }
      else if (v == "" && this.props.updater !== undefined) {
        this.props.updater(0);
      }
    };
    return (<BasicField label={label} name={name} type="number"
                        className={this.props.className} editable={this.props.editable}
                        value={this.value()} updater={update} children={this.props.children}/>);
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
