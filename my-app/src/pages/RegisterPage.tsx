import React, { useEffect, useState } from "react";
import "./RegisterPage.scss";
import BasicButton from "../components/atom/BasicButton";
import Bar from "../components/atom/Input";
import { NavLink, useNavigate } from "react-router-dom";
import validator from "validator";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { storeUserEmail } from "../service/redux/Slice";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  address: string;
  referral?: string;
};

export type RegisterPayloadError = {
  nameErr: string;
  emailErr: string;
  passwordErr: string;
  passwordConfirmErr: string;
  phoneNumberErr: string;
  addressErr: string;
};

const RegisterPage = () => {
  const [registerPayload, setRegisterPayload] = useState<RegisterProps | null>(
    null
  );
  const [errMessage, setErrMessage] = useState<RegisterPayloadError | null>(
    null
  );
  const [buttonCondition, setButtonCondition] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegisterInputOnChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { value, name } = e.target;
    setRegisterPayload({
      ...registerPayload!,
      [name]: value,
    });
  };
  const fetchApiRegister = () => {
    const hostServer = "localhost:8080";
    Axios.post(
      `http://${hostServer}/api/v1/register`,
      {
        name: `${registerPayload?.name}`,
        email: `${registerPayload?.email}`,
        password: `${registerPayload?.password}`,
        password_confirm: `${registerPayload?.passwordConfirm}`,
        phone_number: `${registerPayload?.phoneNumber}`,
        address: `${registerPayload?.address}`,
        ref_referral: registerPayload?.referral
          ? registerPayload.referral
          : null,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        dispatch(storeUserEmail(res.data.email));
        navigate("/login");
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  const handleRegisterSubmitOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    fetchApiRegister();
  };
  useEffect(() => {
    if (
      registerPayload?.email &&
      registerPayload.password &&
      registerPayload.passwordConfirm &&
      registerPayload.name &&
      registerPayload.address &&
      registerPayload.phoneNumber &&
      !errMessage?.emailErr &&
      !errMessage?.passwordErr
    ) {
      setButtonCondition(true);
    }
  }, [registerPayload, errMessage]);

  const handleRegisterPayloadOnBlurEvent = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "name") {
      nameValidation();
    }
    if (e.target.name === "email") {
      emailValidation();
    }
    if (e.target.name === "password") {
      passwordValidation();
    }
    if (e.target.name === "address") {
      addressValidation();
    }
    if (e.target.name === "passwordConfirm") {
      passwordConfirmValidation();
    }
    if (e.target.name === "phoneNumber") {
      phoneNumberValidation();
    }
  };

  const nameValidation = () => {
    if (!registerPayload?.name) {
      setErrMessage({
        ...errMessage!,
        nameErr: "fill in the blank",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      nameErr: "",
    });
  };
  const phoneNumberValidation = () => {
    if (!registerPayload?.phoneNumber) {
      setErrMessage({
        ...errMessage!,
        phoneNumberErr: "fill in the blank",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      phoneNumberErr: "",
    });
  };
  const addressValidation = () => {
    if (!registerPayload?.address) {
      setErrMessage({
        ...errMessage!,
        addressErr: "fill in the blank",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      addressErr: "",
    });
  };

  const emailValidation = () => {
    if (!registerPayload?.email) {
      setErrMessage({
        ...errMessage!,
        emailErr: "fill in the blank",
      });
      return;
    }
    if (!validator.isEmail(registerPayload.email)) {
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
    if (!registerPayload?.password) {
      setErrMessage({
        ...errMessage!,
        passwordErr: "fill in the blank",
      });
      return;
    }
    if (!validator.isLength(registerPayload.password, { min: 8 })) {
      setErrMessage({
        ...errMessage!,
        passwordErr: "Min. 8 characters",
      });
      return;
    }
    if (!validator.isLength(registerPayload.password, { max: 32 })) {
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
  const passwordConfirmValidation = () => {
    if (!registerPayload?.passwordConfirm) {
      setErrMessage({
        ...errMessage!,
        passwordConfirmErr: "fill in the blank",
      });
      return;
    }
    if (!validator.isLength(registerPayload.password, { min: 8 })) {
      setErrMessage({
        ...errMessage!,
        passwordConfirmErr: "Min. 8 characters",
      });
      return;
    }
    if (!validator.isLength(registerPayload.password, { max: 32 })) {
      setErrMessage({
        ...errMessage!,
        passwordConfirmErr: "Max. 32 characters",
      });
      return;
    }
    if (registerPayload.password !== registerPayload.passwordConfirm) {
      setErrMessage({
        ...errMessage!,
        passwordConfirmErr: "Password confirm doesn't match",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      passwordConfirmErr: "",
    });
  };

  return (
    <div className="register-container">
      <div className="register-page">
        <div className="register-page__title">
          <h5>Register</h5>
        </div>
        <div className="register-page__form">
          <div className="register-page__form__items">
            <div className="register-page__form__items__item">
              <Bar
                name="name"
                placeHolder="Username123"
                changeInput={handleRegisterInputOnChange}
                checkFocus={handleRegisterPayloadOnBlurEvent}
                input={registerPayload?.name}
                type="text"
                class={errMessage?.nameErr ? "err-input" : "valid-input"}
              />
              <label htmlFor="name">Username</label>
            </div>
            {errMessage?.nameErr && (
              <div className="err-message">{errMessage.nameErr}</div>
            )}
            <div className="register-page__form__items__item">
              <Bar
                name="email"
                placeHolder="email@example.com"
                changeInput={handleRegisterInputOnChange}
                checkFocus={handleRegisterPayloadOnBlurEvent}
                input={registerPayload?.email}
                type="email"
                class={errMessage?.emailErr ? "err-input" : "valid-input"}
              />
              <label htmlFor="email">Email</label>
            </div>
            {errMessage?.emailErr && (
              <div className="err-message">{errMessage.emailErr}</div>
            )}
            <div className="register-page__form__items__item">
              <Bar
                name="address"
                placeHolder="Orchard Road Lot.12"
                changeInput={handleRegisterInputOnChange}
                input={registerPayload?.address}
                checkFocus={handleRegisterPayloadOnBlurEvent}
                type="text"
                class={errMessage?.addressErr ? "err-input" : "valid-input"}
              />
              <label htmlFor="address">Address</label>
            </div>
            {errMessage?.addressErr && (
              <div className="err-message">{errMessage.addressErr}</div>
            )}
            <div className="register-page__form__items__item">
              <Bar
                name="phoneNumber"
                placeHolder="08xxxxxxx"
                changeInput={handleRegisterInputOnChange}
                checkFocus={handleRegisterPayloadOnBlurEvent}
                input={registerPayload?.phoneNumber}
                type="text"
                class={errMessage?.phoneNumberErr ? "err-input" : "valid-input"}
              />
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            {errMessage?.phoneNumberErr && (
              <div className="err-message">{errMessage.phoneNumberErr}</div>
            )}
            <div className="register-page__form__items__item">
              <Bar
                name="password"
                placeHolder="*****"
                changeInput={handleRegisterInputOnChange}
                checkFocus={handleRegisterPayloadOnBlurEvent}
                input={registerPayload?.password}
                type="password"
                class={errMessage?.passwordErr ? "err-input" : "valid-input"}
              />
              <label htmlFor="password">Password</label>
            </div>
            {errMessage?.passwordErr && (
              <div className="err-message">{errMessage.passwordErr}</div>
            )}
            <div className="register-page__form__items__item">
              <Bar
                name="passwordConfirm"
                placeHolder="*****"
                changeInput={handleRegisterInputOnChange}
                checkFocus={handleRegisterPayloadOnBlurEvent}
                input={registerPayload?.passwordConfirm}
                type="password"
                class={
                  errMessage?.passwordConfirmErr ? "err-input" : "valid-input"
                }
              />
              <label htmlFor="passwordConfirm">Password Confirm</label>
            </div>
            {errMessage?.passwordConfirmErr && (
              <div className="err-message">{errMessage.passwordConfirmErr}</div>
            )}
            <div className="register-page__form__items__item">
              <Bar
                name="referral"
                placeHolder="123xxxxx"
                changeInput={handleRegisterInputOnChange}
                checkFocus={handleRegisterPayloadOnBlurEvent}
                input={registerPayload?.referral}
                type="text"
                class="valid-input"
              />
              <label htmlFor="referral">Referral (Optional)</label>
            </div>
          </div>
          <div className="register-page__form__submit">
            <div className="register-page__form__submit__button">
              <BasicButton
                label="Register"
                name="register"
                condition={buttonCondition}
                clicked={handleRegisterSubmitOnClick}
              />
            </div>
            <div className="register-page__form__submit__divider">
              <p>
                Have An Account ?
                <span>
                  <NavLink
                    to={`/login`}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Sign In !
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

export default RegisterPage;
