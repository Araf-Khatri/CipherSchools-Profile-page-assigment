import Axios from "axios";
import { FC, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { RiPencilFill } from "react-icons/ri";

import LayoutHeading from "../Components/layout-heading";
import PopupWindow from "../Components/popup-window";
import Section from "../Components/section";

interface AboutMeProps {
  aboutData: String;
}

const AboutMe: FC<AboutMeProps> = ({ aboutData }: AboutMeProps) => {
  const userId = localStorage.getItem('userId')
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [aboutInputValue, setAboutInputValue] = useState<String>(aboutData);

  useEffect(() => {
    setAboutInputValue(aboutData);
    console.log(aboutInputValue)
  }, [aboutData]);
  
  const sendData = () => {
    async function postData() {
      const res = await Axios.patch(
        `http://127.0.0.1:3090/api/user/profile/${userId}?type=about`,
        {
          about: aboutInputValue,
        }
      );
      return res.data;
    }
    postData()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsEditing(false);
  };

  let JSX: ReactNode = (
    <Fragment>
      <p>{aboutInputValue}</p>
      {isEditing && (
        <div className="absolute right-1 h-full">
          <RiPencilFill className="text-slate-600 absolute right-1 bottom-1/2 -translate-y-1/2" />
        </div>
      )}
    </Fragment>
  );
  if (isEditing) {
    JSX = (
      <Fragment>
        <textarea
          className="w-full h-full min-h-min outline-none align-middle py-4"
          onChange={(e) => {
            setAboutInputValue(e.target.value);
          }}
          value={`${aboutInputValue}`}
        />
        <div className="absolute right-1 h-full">
          <RiPencilFill className="text-slate-600 absolute right-1 top-1/2 -translate-y-1/2" />
        </div>
      </Fragment>
    );
  } else {
    JSX = (
      <Fragment>
        <p>{aboutInputValue}</p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div>
        <Section border={true}>
          <LayoutHeading
            heading={"ABOUT ME"}
            onEdit={() => {
              setIsEditing(true);
            }}
            onSave={() => sendData()}
            isEditing={isEditing}
          />
          <div
            className={`relative flex justify-between  bg-white ${
              isEditing ? "px-4 py-0" : "p-4"
            } mt-2 rounded-md`}
          >
            {JSX ?? ""}
          </div>
        </Section>
      </div>
    </Fragment>
  );
};

export default AboutMe;
