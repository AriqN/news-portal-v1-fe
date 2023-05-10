import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SubscriptionPage.scss";
import BasicButton from "../components/atom/BasicButton";
import Axios from "axios";
import { hostServer } from "../helper/ApiUrl";
import { key } from "../helper/Cookie";
import QRCode from "react-qr-code";

export type SubscriptionType = {
  id: number;
  name: string;
  price: number;
  quota: number;
};

const SubscriptionPage = () => {
  const [code, setCode] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<number | null>(null);

  const subsItem: SubscriptionType[] = [
    { id: 1, name: "gold", quota: 20, price: 90000 },
    { id: 2, name: "premium", quota: 10, price: 50000 },
    { id: 3, name: "standard", quota: 5, price: 30000 },
  ];

  const subscribeAPI = (id: number) => {
    Axios.post(
      `${hostServer}/api/v1/subscribe/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    )
      .then((res) => {
        setCode(`http://localhost:5173/payment/${res.data.id}`);
        setPaymentId(res.data.id);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  const handleSelectSubscribeOnClick = (id: number) => {
    subscribeAPI(id);
  };
  return (
    <div className="subscription-container">
      <div className="subscription">
        <div className="subscription__items">
          {code ? (
            <>
              <div className="qr">
                <h3>Scan this code to pay</h3>
                <QRCode value={code} />
                <p>Or go to this link :</p>
                <NavLink to={`/payments/${paymentId}`}>Payments</NavLink>
              </div>
            </>
          ) : (
            <>
              {subsItem.map((value) => (
                <div className="subscription__items__item" key={value.id}>
                  <div className="subscription__items__item__details">
                    <div className="subscription__items__item__details__type">
                      <h2>{value.name}</h2>
                    </div>
                    <div className="subscription__items__item__details__benefit">
                      <h3> ✅ Quota :{value.quota}</h3>
                    </div>
                    <div className="subscription__items__item__details__submit">
                      <BasicButton
                        name={value.price}
                        condition={true}
                        label={`Rp.${value.price}`}
                        clicked={() => handleSelectSubscribeOnClick(value.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
