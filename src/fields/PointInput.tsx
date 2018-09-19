import * as React from "react";
import {NumberInput, Props} from "./NumberInput";
import cls from 'classnames';


export function PointInput(props: Props) {
  const className = cls(props.className, "PointInput is-small");
  return <NumberInput {...props} className={className}/>
}

