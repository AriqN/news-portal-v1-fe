import React from "react";
import "./Card.scss";
import { NavLink } from "react-router-dom";

type Cardprops = {
  imageUrl: string;
  title: string;
  link: string;
  class: string;
  summary: string;
  type: string;
};

const Card: React.FC<Cardprops> = (props) => {
  return (
    <div className={props.class}>
      <div className="card">
        <div className="card__image">
          <div className="card__image__bg">
            <img src={props.imageUrl} alt="thumbnail" />
          </div>
        </div>
        <div className="card__type">{props.type}</div>
        <div className="card__title">
          <h2>
            <NavLink to={`/${props.link}`}>{props.title}</NavLink>
          </h2>
          <p>{props.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
