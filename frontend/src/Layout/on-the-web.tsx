import { FC, useRef, useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ImSphere } from "react-icons/im";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import LayoutHeading from "../Components/layout-heading";
import Section from "../Components/section";
import SocialLink from "../Components/Socials/social-link";

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
  const [state, setState] = useState<SocialLinks>(socialData);
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const saveSocialLink = () => {
    console.log(state);
  };
  const updateData = (objKey: String, data: String) => {
    // setState((state) => ({ ...state, `${objKey}`: data }));
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
            key={"linkedIn"}
            social={"LinkedIn"}
            link={state?.linkedIn ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
          <SocialLink
            key={"github"}
            icon={<FaGithub className={`${logoClasses} text-slate-600`} />}
            social={"Github"}
            link={state?.github ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
          <SocialLink
            key={"facebook"}
            icon={<BsFacebook className={`${logoClasses}`} />}
            social={"Facebook"}
            link={state?.facebook ?? null}
            isEditing={isEditing}
            setData={updateData}
          />
          <SocialLink
            key={"twitter"}
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
            key={"instagram"}
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
            key={"website"}
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
