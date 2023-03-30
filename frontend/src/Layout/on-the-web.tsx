import { FC, useEffect, useRef, useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ImSphere } from "react-icons/im";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import LayoutHeading from "../Components/layout-heading";
import Section from "../Components/section";
import SocialLink from "../Components/Socials/social-link";
import Axios from "axios";

interface SocialLinks {
  linkedIn: String;
  github: String;
  facebook: String;
  twitter: String;
  instagram: String;
  website: String;
}

interface SocialWebLinks {
  socialData: SocialLinks;
}

const OntheWeb: FC<SocialWebLinks> = ({ socialData }: SocialWebLinks) => {
  const userId = localStorage.getItem("userId");
  const [state, setState] = useState<SocialLinks>(socialData);
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  useEffect(() => {
    setState(socialData)
  }, [socialData])

  const saveSocialLink = () => {
    const updateUserSocials = async () => {
      return await Axios.patch(
        `http://127.0.0.1:3090/api/user/profile/${userId}?type=socials`,
        state
      );
    };
    updateUserSocials().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err.message)
    });
  };

  const updateData = (obj: String, data: String) => {
    const updatedObj = Object.fromEntries([[obj, data]]);
    setState((state) => {
      return { ...state, ...updatedObj };
    });
  };

  const logoClasses = "h-7 w-7 text-slate-600";
  return (
    <div>
      <Section border={true}>
        <LayoutHeading
          heading={"ON THE WEB"}
          onEdit={() => {
            setIsEditing(true);
          }}
          onSave={() => saveSocialLink()}
          isEditing={isEditing}
        />
        <div className="grid grid-cols-3 gap-4">
          <SocialLink
            icon={
              <div
                className={`grid place-items-center ${logoClasses} rounded-full text-white bg-slate-600`}
              >
                <FaLinkedinIn />
              </div>
            }
            currKey={"linkedIn"}
            social={"LinkedIn"}
            link={state?.linkedIn ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
          <SocialLink
            currKey={"github"}
            icon={<FaGithub className={`${logoClasses} text-slate-600`} />}
            social={"Github"}
            link={state?.github ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
          <SocialLink
            currKey={"facebook"}
            icon={<BsFacebook className={`${logoClasses}`} />}
            social={"Facebook"}
            link={state?.facebook ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
          <SocialLink
            currKey={"twitter"}
            icon={
              <div
                className={`grid place-items-center ${logoClasses} rounded-full text-white bg-slate-600`}
              >
                <BsTwitter />
              </div>
            }
            social={"Twitter"}
            link={state?.twitter ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
          <SocialLink
            currKey={"instagram"}
            icon={
              <div
                className={`grid place-items-center ${logoClasses} rounded-full text-white bg-slate-600`}
              >
                <BsInstagram />
              </div>
            }
            social={"Instagram"}
            link={state?.instagram ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
          <SocialLink
            currKey={"website"}
            icon={<ImSphere className={`${logoClasses}`} />}
            social={"Website"}
            link={state?.website ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
        </div>
      </Section>
    </div>
  );
};

export default OntheWeb;
