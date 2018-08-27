import * as React from 'react';


interface Props {
  id?: string;
  value?: number;
  onChange?: (x: number) => void;
  className?: string;
  editable: boolean;
  upper: number;
}


export class NumberInput extends React.PureComponent<Props, number> {
  public static defaultProps: Partial<Props> = {
    editable: true,
    upper: 1e21 - 1,
  };

  render() {
    const id = this.props.id;
    const update = (v: string) => {
      if (/^\d+$/.test(v)) {
        const number = Number(v);
        if (
          this.props.editable &&
          this.props.onChange !== undefined &&
          !isNaN(number) &&
          number <= this.props.upper
        ) {
          this.props.onChange(Number(v));
        }
      }
      else if (v == "" && this.props.onChange !== undefined) {
        this.props.onChange(0);
      }
    };
    return (
      <input id={id} type="number" className={this.props.className}
             disabled={!this.props.editable} value={this.value()}
             onChange={(e) => update(e.currentTarget.value)}
      />);
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

export default NumberInput;
