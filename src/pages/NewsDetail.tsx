import { useEffect, useState } from "react";
import "./NewsDetail.scss";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { UserPosts } from "./LandingPage";
import { hostServer } from "../helper/ApiUrl";
import { key } from "../helper/Cookie";

const NewsDetail = () => {
  const [newsDetails, setNewsDetails] = useState<UserPosts | null>(null);
  const { id } = useParams();
  const getDetailsPostAPI = () => {
    Axios.get(`${hostServer}/api/v1/news/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    })
      .then((res) => {
        setNewsDetails(res.data);
        console.log(newsDetails);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  useEffect(() => {
    getDetailsPostAPI();
  }, []);
  return (
    <div className="news-detail-container">
      <div className="news-detail">
        <div className="news-detail__head">
          <div className="news-detail__head__image">
            <img src={newsDetails?.url} alt="headline" />
          </div>
          <div className="news-detail__head__title">
            <h1>{newsDetails?.title}</h1>
            <h3>{newsDetails?.summary}</h3>
          </div>
        </div>
        <div className="news-detail__body">
          <div className="news-detail__body__words">
            {newsDetails?.content && (
              <div
                dangerouslySetInnerHTML={{ __html: newsDetails.content }}
              ></div>
            )}
          </div>
          <div className="news-detail__body__suggestion"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
