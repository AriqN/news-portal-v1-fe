import { useEffect, useState } from "react";
import "./ManagePostsPage.scss";
import AdminPostsTable from "../../components/molecule/AdminTablePosts";
import AdminNewsNavigation from "../../components/molecule/AdminNewsNavigation";
import Axios from "axios";
import { hostServer } from "../../helper/ApiUrl";
import { key } from "../../helper/Cookie";

export type AdminPosts = {
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
};

const ManagePostsPage = () => {
  const [newsList, setNewsList] = useState<AdminPosts[]>([]);
  const fetchNews = () => {
    Axios.get(`${hostServer}/api/v1/news`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    })
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

  return (
    <div className="manage-post-container">
      <div className="manage-post">
        <div className="manage-post__head">
          <div className="manage-post__head__title">
            <h1>News Cockpit.</h1>
          </div>
        </div>
        <div className="manage-post__body">
          <div className="manage-post__body__navigation">
            <AdminNewsNavigation />
          </div>
          <div className="manage-post__body__table">
            <AdminPostsTable input={newsList!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePostsPage;
