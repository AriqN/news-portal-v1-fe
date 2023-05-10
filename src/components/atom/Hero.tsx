import "./Hero.scss";
import { NavLink } from "react-router-dom";
import BasicButton from "../atom/BasicButton";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero">
        <div className="hero__images">
          <div className="hero__images__item">
            <div className="hero__images__item__navigation">
              <button className="hero__images__item__navigation__left">
                ≤
              </button>
              <button className="hero__images__item__navigation__right">
                ≥
              </button>
            </div>
            <div className="hero__images__item__news">
              <div className="hero__images__item__news__picture">
                <img src="https://images.unsplash.com/photo-1682348686716-9a71d77e681c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" />
              </div>
              <div className="hero__images__item__news__summary">
                <h2>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                  obcaecati sed nisi? Voluptatem, omnis molestias? Aspernatur
                  nam minima officiis. Velit expedita ex provident
                  necessitatibus voluptate impedit maiores pariatur consequatur
                  similique!
                </p>
                <NavLink to={"/admin"}>
                  <BasicButton
                    name="readMore"
                    condition={true}
                    label="Read More..."
                  />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
