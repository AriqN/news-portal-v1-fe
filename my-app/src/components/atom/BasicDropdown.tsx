import React, { FC } from "react";
import { DropdownArray } from "../../pages/LandingPage";

type BasicDropdownProps = {
  inputArr: DropdownArray[];
  input?: string;
  name: string;
  placeHolder?: string;
  label?: string;
  type?: string;
  changeInput: React.ChangeEventHandler<HTMLSelectElement>;
  checkInput?: React.FocusEventHandler<HTMLSelectElement>;
};

const BasicDropdown: FC<BasicDropdownProps> = (props) => {
  return (
    <select
      onChange={props.changeInput}
      name={props.name}
      onBlur={props.checkInput}
    >
      {props.label && (
        <option disabled selected>
          {props.label}
        </option>
      )}
      {props.inputArr!.map((value, index) => (
        <option value={value.value} key={index}>
          {value.display}
        </option>
      ))}
    </select>
  );
};

export default BasicDropdown;
