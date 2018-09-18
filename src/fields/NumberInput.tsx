import * as React from 'react';
import cls from 'classnames';

export interface Props {
  id?: string;
  value?: number;
  onChange?: (x: number) => void;
  className?: string;
  disable?: boolean;
  upper?: number;
}


interface State {
  cleared: boolean
}


export class NumberInput extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {cleared: false}
  }


  render() {
    const id = this.props.id;
    const upper = this.props.upper !== undefined ? this.props.upper : 20000000;
    const editable = this.props.disable !== true;
    const className = cls("NumberInput", this.props.className);

    const update = (inputted: string) => {
      const onChange = this.props.onChange !== undefined ? this.props.onChange : () => {
      };
      const isNumeric = /^\d+$/.test(inputted);

      if (isNumeric) {
        const number = Number(inputted);
        if (editable && !isNaN(number) && number <= upper) onChange(number);
      }
      else if (inputted == "") {
        this.setState({cleared: true});
        onChange(0);
      }
    };

    return (
      <input id={id} type="number" className={className}
             disabled={!editable} value={this.value()}
             onChange={(e) => update(e.currentTarget.value)}
      />);
  }

  private value(): string {
    const value = this.props.value;
    return value === undefined || (value === 0 && this.state.cleared) ? "" : value.toFixed();
  }
}

export default NumberInput;
