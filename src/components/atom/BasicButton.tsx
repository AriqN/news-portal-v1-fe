import React, { FC } from "react";
import "./BasicButton.scss";

type ButtonProps = {
  name: string | number;
  clicked?: React.MouseEventHandler<HTMLButtonElement>;
  clickedId?: (id: number) => void;
  condition: boolean;
  class?: string;
  label: string;
};

const BasicButton: FC<ButtonProps> = (props) => {
  return (
    <>
      {!props.condition ? (
        <div className="button-container">
          <button onClick={props.clicked} disabled className="btn-disabled">
            {props.label}
          </button>
        </div>
      ) : ( 
        <div className="button-container">
          <button
            onClick={props.clicked}
            className={props.class ? props.class : "able"}
          >
            {props.label}
          </button>
        </div>
      )}
    </>
  );
};

export default BasicButton;
