import React, { useContext, useEffect, useState } from "react";
import "./LoginPage.scss";
import BasicButton from "../components/atom/BasicButton";
import Bar from "../components/atom/Input";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../context/context";
import validator from "validator";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeUserRole } from "../service/redux/Slice";
import { RootState } from "../service/redux/Store";
import { hostServer } from "../helper/ApiUrl";

type LoginProps = {
  email: string;
  password: string;
};
type LoginPayloadError = {
  emailErr: string;
  passwordErr: string;
};

const LoginPage = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [loginPayload, setLoginPayload] = useState<LoginProps | null>(null);
  const [errMessage, setErrMessage] = useState<LoginPayloadError | null>(null);
  const [buttonCondition, setButtonCondition] = useState<boolean>(false);
  const registeredUserEmail = useSelector(
    (state: RootState) => state.role.email
  );
  const handleLoginInputOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setLoginPayload({
      ...loginPayload!,
      [name]: value,
    });
  };
  const fetchApiLogin = () => {
    Axios.post(
      `${hostServer}/api/v1/login`,
      {
        email: `${loginPayload?.email}`,
        password: `${loginPayload?.password}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        Cookies.set("token", res.data.token, { expires: 1 });
        setAuthenticated(true);
        dispatch(storeUserRole(res.data.role));
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  const handleLoginSubmitOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    fetchApiLogin();
  };
  useEffect(() => {
    if (
      loginPayload?.email &&
      loginPayload.password &&
      !errMessage?.emailErr &&
      !errMessage?.passwordErr
    ) {
      setButtonCondition(true);
    }
    if (
      !loginPayload?.email ||
      !loginPayload?.password ||
      errMessage?.emailErr ||
      errMessage?.passwordErr
    ) {
      setButtonCondition(false);
    }
  }, [loginPayload, errMessage]);

  useEffect(() => {
    if (registeredUserEmail) {
      setLoginPayload({
        ...loginPayload!,
        email: registeredUserEmail,
      });
    }
  }, []);

  const handleLoginPayloadOnBlurEvent = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "email") {
      emailValidation();
    }
    if (e.target.name === "password") {
      passwordValidation();
    }
  };

  const emailValidation = () => {
    if (!loginPayload?.email) {
      setErrMessage({
        ...errMessage!,
        emailErr: "fill in the blank",
      });
      return;
    }
    if (!validator.isEmail(loginPayload.email)) {
      setErrMessage({
        ...errMessage!,
        emailErr: "Please input a valid email !",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      emailErr: "",
    });
  };

  const passwordValidation = () => {
    if (!loginPayload?.password) {
      setErrMessage({
        ...errMessage!,
        passwordErr: "fill in the blank",
      });
      return;
    }
    if (!validator.isLength(loginPayload.password, { min: 8 })) {
      setErrMessage({
        ...errMessage!,
        passwordErr: "Min. 8 characters",
      });
      return;
    }
    if (!validator.isLength(loginPayload.password, { max: 32 })) {
      setErrMessage({
        ...errMessage!,
        passwordErr: "Max. 32 characters",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      passwordErr: "",
    });
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <div className="login-page__title">
          <h5>Login</h5>
        </div>
        <div className="login-page__form">
          <div className="login-page__form__items">
            <div className="login-page__form__items__item">
              <Bar
                name="email"
                placeHolder="email@example.com"
                changeInput={handleLoginInputOnChange}
                checkFocus={handleLoginPayloadOnBlurEvent}
                input={loginPayload?.email}
                type="email"
                class={errMessage?.emailErr ? "err-input" : "valid-input"}
              />
              <label htmlFor="email">Email</label>
            </div>
            {errMessage?.emailErr && (
              <div className="err-message">{errMessage.emailErr}</div>
            )}
            <div className="login-page__form__items__item">
              <Bar
                name="password"
                placeHolder="*****"
                changeInput={handleLoginInputOnChange}
                checkFocus={handleLoginPayloadOnBlurEvent}
                input={loginPayload?.password}
                type="password"
                class={errMessage?.passwordErr ? "err-input" : "valid-input"}
              />
              <label htmlFor="password">Password</label>
            </div>
            {errMessage?.passwordErr && (
              <div className="err-message">{errMessage.passwordErr}</div>
            )}
          </div>
          <div className="login-page__form__submit">
            <div className="login-page__form__submit__button">
              <BasicButton
                label="Login"
                name="login"
                condition={buttonCondition}
                clicked={handleLoginSubmitOnClick}
              />
            </div>
            <div className="login-page__form__submit__divider">
              <p>
                Don't Have An Account ?{" "}
                <span>
                  <NavLink
                    to={`/register`}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Sign Up !
                  </NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
