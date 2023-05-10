import React, { FC } from "react";
import BasicDropdown from "../atom/BasicDropdown";
import "./NewsNavigation.scss";
import Bar from "../atom/Input";
import { DropdownArray, NewsNavigationInput } from "../../pages/LandingPage";

type NewsNavigationProps = {
  input?: NewsNavigationInput;
  changeSelect: React.ChangeEventHandler<HTMLSelectElement>;
  changeTitle: React.ChangeEventHandler<HTMLInputElement>;
};

const NewsNavigation: FC<NewsNavigationProps> = (props) => {
  const sortOrderItem: DropdownArray[] = [
    {
      value: "ascending",
      display: "Oldest",
    },
    {
      value: "descending",
      display: "Newest",
    },
  ];
  const categoryItem: DropdownArray[] = [
    {
      value: "Sport,Lifestyle,Politics,Health",
      display: "All",
    },
    {
      value: "Sport",
      display: "Sport",
    },
    {
      value: "Lifestyle",
      display: "Lifestyle",
    },
    {
      value: "Politics",
      display: "Politics",
    },
  ];
  const typeItem: DropdownArray[] = [
    {
      value: "VIP,Premium,Free",
      display: "All",
    },
    {
      value: "VIP",
      display: "VIP",
    },
    {
      value: "Premium",
      display: "Premium",
    },
    {
      value: "Free",
      display: "Free",
    },
  ];
  const svgSearch = () => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.4601 10.3188L15.7639 14.6226C15.9151 14.7739 16.0001 14.9792 16 15.1932C15.9999 15.4072 15.9148 15.6124 15.7635 15.7637C15.6121 15.915 15.4068 15.9999 15.1928 15.9998C14.9788 15.9998 14.7736 15.9147 14.6223 15.7633L10.3185 11.4595C9.03194 12.456 7.41407 12.9249 5.79403 12.7709C4.17398 12.6169 2.67346 11.8515 1.59771 10.6304C0.521957 9.40936 -0.0482098 7.82433 0.00319691 6.19779C0.0546036 4.57125 0.723722 3.02539 1.87443 1.87468C3.02514 0.723966 4.57101 0.0548478 6.19754 0.00344105C7.82408 -0.0479657 9.40911 0.522201 10.6302 1.59795C11.8513 2.6737 12.6167 4.17423 12.7707 5.79427C12.9247 7.41432 12.4558 9.03219 11.4593 10.3188H11.4601ZM6.4003 11.1995C7.67328 11.1995 8.89412 10.6938 9.79425 9.7937C10.6944 8.89356 11.2001 7.67272 11.2001 6.39974C11.2001 5.12676 10.6944 3.90592 9.79425 3.00579C8.89412 2.10565 7.67328 1.59997 6.4003 1.59997C5.12732 1.59997 3.90648 2.10565 3.00634 3.00579C2.10621 3.90592 1.60052 5.12676 1.60052 6.39974C1.60052 7.67272 2.10621 8.89356 3.00634 9.7937C3.90648 10.6938 5.12732 11.1995 6.4003 11.1995Z"
          fill="#737373"
        />
      </svg>
    );
  };
  return (
    <div className="table-nav-container">
      <div className="table-navigation">
        <div className="table-navigation__sort">
          <div className="table-navigation__sort__dropdown">
            <div className="table-navigation__sort__dropdown__category">
              <div className="table-navigation__sort__dropdown__category__search">
                <span>{svgSearch()}</span>
                <Bar
                  input={props.input?.title}
                  name="title"
                  placeHolder="Search"
                  changeInput={props.changeTitle}
                  type="text"
                  class="news-search"
                />
              </div>
            </div>
            <div className="table-navigation__sort__dropdown__category">
              <label htmlFor="category">Category</label>
              <BasicDropdown
                inputArr={categoryItem}
                changeInput={props.changeSelect}
                name="category"
              />
            </div>
            <div className="table-navigation__sort__dropdown__category">
              <label htmlFor="type">Type</label>
              <BasicDropdown
                inputArr={typeItem}
                changeInput={props.changeSelect}
                name="type"
              />
            </div>
            <div className="table-navigation__sort__dropdown__category">
              <label htmlFor="order">Order</label>
              <BasicDropdown
                inputArr={sortOrderItem}
                changeInput={props.changeSelect}
                name="order"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsNavigation;
