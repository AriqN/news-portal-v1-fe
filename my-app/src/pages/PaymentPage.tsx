import React, { useEffect, useState } from "react";
import "./PaymentPage.scss";
import Bar from "../components/atom/Input";
import BasicButton from "../components/atom/BasicButton";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { hostServer } from "../helper/ApiUrl";
import { key } from "../helper/Cookie";

type PaymentProps = {
  amount: string;
};
type PaymentPayloadError = {
  amountErr: string;
};
const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentPayload, setPaymentPayload] = useState<PaymentProps | null>(
    null
  );
  const [errMessage, setErrMessage] = useState<PaymentPayloadError | null>(
    null
  );
  const [buttonCondition, setButtonCondition] = useState<boolean>(false);
  const { id } = useParams();
  const handlePaymentInputOnChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { value, name } = e.target;
    setPaymentPayload({
      ...paymentPayload!,
      [name]: value,
    });
  };
  const handlePaymentSubmitOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    transactionAPI();
  };
  const transactionAPI = () => {
    Axios.post(
      `${hostServer}/api/v1/transaction/${id}`,
      { total: parseInt(paymentPayload!.amount) },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    )
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  const handlePaymentPayloadOnBlurEvent = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "amount") {
      amountValidation();
    }
  };
  const amountValidation = () => {
    if (!paymentPayload?.amount) {
      setErrMessage({
        ...errMessage!,
        amountErr: "fill in the blank",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      amountErr: "",
    });
  };
  useEffect(() => {
    if (paymentPayload?.amount && !errMessage?.amountErr) {
      setButtonCondition(true);
    }
    if (!paymentPayload?.amount || errMessage?.amountErr) {
      setButtonCondition(false);
    }
  }, [paymentPayload, errMessage]);
  return (
    <div className="page-container">
      <div className="payment-page">
        <div className="payment-page__title">
          <h5>Payment</h5>
        </div>
        <div className="payment-page__form">
          <div className="payment-page__form__items">
            <div className="payment-page__form__items__item">
              <Bar
                name="amount"
                placeHolder="EX. 50000"
                changeInput={handlePaymentInputOnChange}
                checkFocus={handlePaymentPayloadOnBlurEvent}
                input={paymentPayload?.amount}
                type="number"
                class={errMessage?.amountErr ? "err-input" : "valid-input"}
              />
              <label htmlFor="amount">Amount</label>
            </div>
            {errMessage?.amountErr && (
              <div className="err-message">{errMessage.amountErr}</div>
            )}
          </div>
          <div className="payment-page__form__submit">
            <div className="payment-page__form__submit__button">
              <BasicButton
                label="Submit"
                name="submit"
                condition={buttonCondition}
                clicked={handlePaymentSubmitOnClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
