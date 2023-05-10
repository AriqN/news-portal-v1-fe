import React from "react";
import "./Input.scss";

type BarProps = {
  name: string;
  max?: number;
  min?: number;
  error?: string;
  placeHolder?: string;
  leftPrefix?: string;
  rightPrefix?: string;
  input?: string | number;
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  checkFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type: string;
  class: string;
};

const Bar: React.FC<BarProps> = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeHolder}
      onChange={props.changeInput}
      value={props.input}
      name={props.name}
      onBlur={props.checkFocus}
      id={props.name}
      minLength={props.min}
      maxLength={props.max}
      className={props.class}
    />
  );
};

export default Bar;
