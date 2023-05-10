import React from "react";
import "./FileInput.scss";
type FileInputProps = {
  className: string;
  name: string;
  container: string;
  inputImageFile?: File;
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const FileInput: React.FC<FileInputProps> = (props) => {
  return (
    <div className={props.container}>
      {props.inputImageFile && (
        <div className="material-image">
          <>
            {props.inputImageFile && (
              <>
                <img
                  className="test"
                  src={URL.createObjectURL(props.inputImageFile as Blob)}
                  alt="test"
                />
                <p>{props.inputImageFile.name}</p>
              </>
            )}
          </>
        </div>
      )}
      <div className={props.className}>
        <label htmlFor="news-headline">
          <div className="svg-wrapper">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_145_877)">
                <path
                  d="M19 1.5C19.3978 1.5 19.7794 1.65804 20.0607 1.93934C20.342 2.22064 20.5 2.60218 20.5 3V13.5C20.01 13.43 19.49 13.43 19 13.5V3H2.5V15.65L5.895 12.242C6.01916 12.1175 6.18311 12.0406 6.35822 12.0247C6.53332 12.0088 6.70845 12.0549 6.853 12.155L6.957 12.242L8.39 13.68L12.077 8.47C12.2014 8.34515 12.3658 8.2681 12.5414 8.25237C12.7169 8.23665 12.8924 8.28325 13.037 8.384L13.14 8.471L16.531 11.876C17.341 12.689 16.964 14.156 16.133 14.946C15.524 15.523 15.0626 16.2378 14.7877 17.0303C14.5127 17.8229 14.4322 18.6699 14.553 19.5H2.5C2.10218 19.5 1.72064 19.342 1.43934 19.0607C1.15804 18.7794 1 18.3978 1 18V3C1 2.60218 1.15804 2.22064 1.43934 1.93934C1.72064 1.65804 2.10218 1.5 2.5 1.5H19Z"
                  fill="#EE4D2D"
                />
                <path
                  d="M7 6C7.39782 6 7.77936 6.15804 8.06066 6.43934C8.34196 6.72064 8.5 7.10218 8.5 7.5C8.5 7.89782 8.34196 8.27936 8.06066 8.56066C7.77936 8.84196 7.39782 9 7 9C6.60218 9 6.22064 8.84196 5.93934 8.56066C5.65804 8.27936 5.5 7.89782 5.5 7.5C5.5 7.10218 5.65804 6.72064 5.93934 6.43934C6.22064 6.15804 6.60218 6 7 6ZM19 15.75C19 15.5511 19.079 15.3603 19.2197 15.2197C19.3603 15.079 19.5511 15 19.75 15C19.9489 15 20.1397 15.079 20.2803 15.2197C20.421 15.3603 20.5 15.5511 20.5 15.75V18H22.75C22.9489 18 23.1397 18.079 23.2803 18.2197C23.421 18.3603 23.5 18.5511 23.5 18.75C23.5 18.9489 23.421 19.1397 23.2803 19.2803C23.1397 19.421 22.9489 19.5 22.75 19.5H20.5V21.75C20.5 21.9489 20.421 22.1397 20.2803 22.2803C20.1397 22.421 19.9489 22.5 19.75 22.5C19.5511 22.5 19.3603 22.421 19.2197 22.2803C19.079 22.1397 19 21.9489 19 21.75V19.5H16.75C16.5511 19.5 16.3603 19.421 16.2197 19.2803C16.079 19.1397 16 18.9489 16 18.75C16 18.5511 16.079 18.3603 16.2197 18.2197C16.3603 18.079 16.5511 18 16.75 18H19V15.75Z"
                  fill="#EE4D2D"
                />
              </g>
              <defs>
                <clipPath id="clip0_145_877">
                  <rect
                    width="23"
                    height="23"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            {props.inputImageFile ? (
              <p>Change Headline Photo</p>
            ) : (
              <p>Add Headline Photo</p>
            )}
          </div>
        </label>
        <input
          type="file"
          className="input-upload"
          style={{ display: "none" }}
          id="news-headline"
          onBlur={props.checkFocus}
          name={props.name}
          onChange={(e) => props.changeInput(e)}
        />
      </div>
    </div>
  );
};

export default FileInput;
