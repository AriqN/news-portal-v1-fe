import React, { useEffect, useState } from "react";
import "./CreateNewPostPage.scss";
import Bar from "../../components/atom/Input";
import validator from "validator";
import BasicButton from "../../components/atom/BasicButton";
import { useNavigate } from "react-router-dom";
import BasicDropdown from "../../components/atom/BasicDropdown";
import FileInput from "../../components/atom/FileInput";
import { useQuill } from "react-quilljs";
import Axios from "axios";
import "quill/dist/quill.snow.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../service/redux/Store";
import { hostServer } from "../../helper/ApiUrl";
import { DropdownArray } from "../LandingPage";
import { key } from "../../helper/Cookie";

export type NewPostProps = {
  title: string;
  imgHeader: File;
  postCategory: string;
  postType: string;
  content: string;
  summary: string;
  author: string;
};

export type PostPayloadError = {
  titleErr: string;
  categoryErr: string;
  typeErr: string;
  imgErr?: string;
  contentErr: string;
  summaryErr: string;
};
const CreateNewPostPage = () => {
  const [postPayload, setPostPayload] = useState<NewPostProps | null>(null);
  const [errMessage, setErrMessage] = useState<PostPayloadError | null>(null);
  const [buttonCondition, setButtonCondition] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const loggedInUserName = useSelector((state: RootState) => state.role.name);
  const theme = "snow";
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ size: ["small", false, "large", "huge"] }],
      ["clean"],
    ],
  };
  const placeholder = "Write Your News Here . . .";

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "size",
    "clean",
  ];

  const { quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  const navigate = useNavigate();

  const postCategoryItem: DropdownArray[] = [
    {
      value: "1",
      display: "Sport",
    },
    {
      value: "2",
      display: "Lifestyle",
    },
    {
      value: "3",
      display: "Politics",
    },
    {
      value: "Health",
      display: "Health",
    },
  ];
  const postTypeItem: DropdownArray[] = [
    {
      value: "1",
      display: "VIP",
    },
    {
      value: "2",
      display: "Premium",
    },
    {
      value: "3",
      display: "Free",
    },
  ];
  const handlePostInputOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setPostPayload({
      ...postPayload!,
      [name]: value,
    });
  };
  const handleSelectPostInput: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const { value, name } = e.target;
    setPostPayload({
      ...postPayload!,
      [name]: value,
    });
  };
  const handleInputFileOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { name, files } = e.target;
    if (files !== null) {
      setPostPayload({
        ...postPayload!,
        [name]: files[0],
      });
      return;
    }
  };
  const handlePostSubmitOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setLoading(true);
    createPostAPI();
  };
  const handleCancelPostOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    navigate(`/admin`);
  };
  const createPostAPI = () => {
    Axios.post(
      `${hostServer}/api/v1/news`,
      {
        author: loggedInUserName,
        summary: postPayload?.summary,
        file: postPayload?.imgHeader,
        title: postPayload?.title,
        category_id: parseInt(postPayload!.postCategory),
        type_id: parseInt(postPayload!.postType),
        content: quillRef.current.firstChild.innerHTML,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${key}`,
        },
      }
    )
      .then(() => {
        setLoading(false);
        navigate(`/admin`);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        setPostPayload(null);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (
      postPayload?.title &&
      !errMessage?.titleErr &&
      postPayload?.postCategory &&
      !errMessage?.categoryErr &&
      postPayload?.postType &&
      !errMessage?.typeErr &&
      postPayload?.imgHeader &&
      !errMessage?.imgErr
    ) {
      setButtonCondition(true);
    }
    if (
      !postPayload?.title ||
      errMessage?.titleErr ||
      !postPayload?.postCategory ||
      errMessage?.categoryErr ||
      !postPayload?.postType ||
      errMessage?.typeErr ||
      !postPayload?.imgHeader ||
      errMessage?.imgErr
    ) {
      setButtonCondition(false);
    }
  }, [postPayload, errMessage]);
  console.log(postPayload, errMessage);
  const handlePostPayloadOnBlurEvent = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "title") {
      titleValidation();
    }
    if (e.target.name === "summary") {
      summaryValidation();
    }
    if (e.target.name === "postCategory") {
      categoryValidation();
    }
    if (e.target.name === "postType") {
      typeValidation();
    }
    if (e.target.name === "imgHeader") {
      imgValidation();
    }
  };
  const handlePostDropDownOnBlurEvent = (
    e: React.FocusEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === "postCategory") {
      categoryValidation();
    }
    if (e.target.name === "postType") {
      typeValidation();
    }
  };
  const titleValidation = () => {
    if (!postPayload?.title) {
      setErrMessage({
        ...errMessage!,
        titleErr: "fill in the blank",
      });
      return;
    }
    if (!validator.isLength(postPayload.title, { min: 4 })) {
      setErrMessage({
        ...errMessage!,
        titleErr: "Min. 4 characters",
      });
      return;
    }
    if (!validator.isLength(postPayload.title, { max: 64 })) {
      setErrMessage({
        ...errMessage!,
        titleErr: "Max. 64 characters",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      titleErr: "",
    });
  };
  const summaryValidation = () => {
    if (!postPayload?.summary) {
      setErrMessage({
        ...errMessage!,
        summaryErr: "fill in the blank",
      });
      return;
    }
    if (!validator.isLength(postPayload.summary, { max: 100 })) {
      setErrMessage({
        ...errMessage!,
        summaryErr: "Max. 100 characters",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      summaryErr: "",
    });
  };
  const imgValidation = () => {
    if (!postPayload?.imgHeader.name) {
      setErrMessage({
        ...errMessage!,
        imgErr: "choose an image",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      imgErr: "",
    });
  };
  const categoryValidation = () => {
    if (!postPayload?.postCategory) {
      setErrMessage({
        ...errMessage!,
        categoryErr: "Choose News Category",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      categoryErr: "",
    });
  };
  const typeValidation = () => {
    if (!postPayload?.postType) {
      setErrMessage({
        ...errMessage!,
        typeErr: "Choose News Type",
      });
      return;
    }
    setErrMessage({
      ...errMessage!,
      typeErr: "",
    });
  };
  return (
    <div className="page-container">
      <div className="create-post">
        {loading ? (
          <ClipLoader
            color="#36d7b7"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <div className="create-post__head">
              <div className="create-post__head__title">
                <h1>Create New Post.</h1>
              </div>
            </div>
            <div className="create-post__body">
              <div className="create-post__body__inputs">
                <div className="create-post__body__inputs__input">
                  <label htmlFor="title">Title</label>
                  <Bar
                    name="title"
                    input={postPayload?.title}
                    changeInput={handlePostInputOnChange}
                    type="text"
                    class={errMessage?.titleErr ? "err-input" : "valid-input"}
                    checkFocus={handlePostPayloadOnBlurEvent}
                  />
                </div>
                {errMessage?.titleErr && (
                  <div className="err-message">{errMessage.titleErr}</div>
                )}
                <div className="create-post__body__inputs__input">
                  <label htmlFor="summary">Summary</label>
                  <Bar
                    name="summary"
                    input={postPayload?.summary}
                    changeInput={handlePostInputOnChange}
                    type="text"
                    class={errMessage?.summaryErr ? "err-input" : "valid-input"}
                    checkFocus={handlePostPayloadOnBlurEvent}
                  />
                </div>
                {errMessage?.summaryErr && (
                  <div className="err-message">{errMessage.summaryErr}</div>
                )}
                <div className="create-post__body__inputs__input">
                  <label htmlFor="imgHeader">Image Header</label>
                  <FileInput
                    container="img-upload-container"
                    className="img-upload"
                    name="imgHeader"
                    inputImageFile={postPayload?.imgHeader}
                    changeInput={handleInputFileOnChange}
                    checkFocus={handlePostPayloadOnBlurEvent}
                  />
                </div>
                {errMessage?.imgErr && (
                  <div className="err-message">{errMessage.imgErr}</div>
                )}
                <div className="create-post__body__inputs__input">
                  <div className="create-post__body__inputs__input__dropdown">
                    <div className="create-post__body__inputs__input__dropdown__item">
                      <label htmlFor="postCategory">Post Category</label>
                      <BasicDropdown
                        inputArr={postCategoryItem}
                        name="postCategory"
                        label="Choose News Category"
                        changeInput={handleSelectPostInput}
                        checkInput={handlePostDropDownOnBlurEvent}
                      />
                    </div>
                    <div className="create-post__body__inputs__input__dropdown__item">
                      <label htmlFor="postType">Post Type</label>
                      <BasicDropdown
                        inputArr={postTypeItem}
                        name="postType"
                        label="Choose News Type"
                        changeInput={handleSelectPostInput}
                        checkInput={handlePostDropDownOnBlurEvent}
                      />
                    </div>
                  </div>
                </div>
                <div className="create-post__body__inputs__content">
                  <label htmlFor="content">Content</label>
                  <div className="create-post__body__inputs__content__container">
                    <div ref={quillRef} />
                  </div>
                </div>
                {errMessage?.contentErr && (
                  <div className="err-message">{errMessage.contentErr}</div>
                )}
                <div className="create-post__body__submit">
                  <BasicButton
                    label="Cancel"
                    name="cancel"
                    condition={true}
                    clicked={handleCancelPostOnClick}
                    class="cancel-btn"
                  />
                  <BasicButton
                    label="Create"
                    name="create"
                    condition={buttonCondition}
                    clicked={handlePostSubmitOnClick}
                    class="submit-btn"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateNewPostPage;
