import React from "react";
import "./AdminNewsNavigation.scss";
import BasicButton from "../atom/BasicButton";
import { useNavigate } from "react-router-dom";

const AdminNewsNavigation = () => {
  const navigate = useNavigate();
  const handleCreatePostOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    navigate(`/admin/create-post`);
  };
  return (
    <>
      <div className="admin-news-container">
        <div className="admin-news">
          <div className="admin-news__create">
            <BasicButton
              name="insertPost"
              condition={true}
              label="Create New Post"
              clicked={handleCreatePostOnClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNewsNavigation;
