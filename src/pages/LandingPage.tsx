import React, { useEffect, useState } from "react";
import "./LandingPage.scss";
import Card from "../components/atom/Card";
import Axios from "axios";
import { hostServer } from "../helper/ApiUrl";
import { key } from "../helper/Cookie";
import NewsNavigation from "../components/molecule/NewsNavigation";

export type UserPosts = {
  id: number;
  createdAt: string;
  type: {
    id: number;
    name: string;
  };
  title: string;
  category: {
    id: number;
    name: string;
  };
  summary: string;
  url: string;
  content: string;
};
export type NewsNavigationInput = {
  type: string;
  category: string;
  order: string;
  title: string;
};
export type DropdownArray = {
  value: string;
  display: string;
};

const LandingPage = () => {
  const [newsList, setNewsList] = useState<UserPosts[]>([]);
  const [show, setShow] = useState<NewsNavigationInput>({
    type: "VIP,Premium,Free",
    category: "Sport,Lifestyle,Politics,Health",
    order: "descending",
    title: "",
  });
  const handleSelectNewsNavigationInput: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e) => {
    const { value, name } = e.target;
    setShow({
      ...show!,
      [name]: value,
    });
  };
  const handleNewsSearchInputOnChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { value, name } = e.target;
    setShow({
      ...show!,
      [name]: value,
    });
  };

  const fetchNews = () => {
    Axios.get(
      `${hostServer}/api/v1/news?category=${show.category}&order=${show.order}&type=${show.type}&title=${show.title}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    )
      .then((res) => {
        setNewsList(res.data);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  useEffect(() => {
    fetchNews();
  }, []);
  useEffect(() => {
    fetchNews();
  }, [show]);

  return (
    <div className="landing-container">
      <div className="landing">
        <div className="landing__head">
          {/* <Hero /> */}
          <div className="cards-bg">
            <div className="cards">
              <div className="cards__title">
                <h3>Hot News🔥</h3>
                <NewsNavigation
                  input={show}
                  changeTitle={handleNewsSearchInputOnChange}
                  changeSelect={handleSelectNewsNavigationInput}
                />
              </div>
              <div className="cards__items">
                <div className="cards__items__item">
                  {newsList &&
                    newsList.map((val) => (
                      <Card
                        key={val.id}
                        imageUrl={val.url}
                        title={val.title}
                        summary={val.summary}
                        type={val.type.name}
                        class="card-landing"
                        link={`details/${val.id}`}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
