import { FC } from "react";
import "./AdminTablePosts.scss";
import { AdminPosts } from "../../pages/adminPages/ManagePostsPage";
import BasicButton from "../atom/BasicButton";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { hostServer } from "../../helper/ApiUrl";
import { key } from "../../helper/Cookie";

type AdminPostsList = {
  input?: AdminPosts[];
};

const AdminPostsTable: FC<AdminPostsList> = (props) => {
  const navigate = useNavigate();
  const deletePostAPI = (id: number) => {
    Axios.delete(`${hostServer}/api/v1/news/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    })
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
  const handleDeletePostOnClick = (id: number) => {
    deletePostAPI(id);
  };

  return (
    <div className="table-container">
      <div className="admin-posts-table">
        <table>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Category</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
          {props.input?.map((value) => (
            <tr key={value.id}>
              <td>{value.title}</td>
              <td>{value.category.name}</td>
              <td>{value.type.name}</td>
              <td>{`${value.createdAt.slice(11, 16)} ${value.createdAt.slice(
                0,
                10
              )}`}</td>
              <td className="admin-posts-button">
                {/* <BasicButton
                  name="editPost"
                  condition={true}
                  label="Edit"
                  class="edit-post"
                /> */}
                <BasicButton
                  name="deletePost"
                  condition={true}
                  label="Delete"
                  class="delete-post"
                  clicked={() => handleDeletePostOnClick(value.id)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AdminPostsTable;
