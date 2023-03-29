import { FC, useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ImSphere } from "react-icons/im";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import LayoutHeading from "../Components/layout-heading";
import Section from "../Components/section";
import SocialLink from "../Components/Socials/social-link";

interface SocialLinks {
  linkedIn?: String;
  github?: String;
  facebook?: String;
  twitter?: String;
  instagram?: String;
  website?: String;
}

const OntheWeb: FC = () => {
  const [state, setState] = useState<SocialLinks>({
    facebook: "https://facebook.com",
  });

  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const logoClasses = "h-7 w-7 text-slate-600";
  return (
    <div>
      <Section border={true}>
        <LayoutHeading heading={"ON THE WEB"} onclick={() => {}} />
        <div className="grid grid-cols-3 gap-4">
          <SocialLink
            icon={
              <div
                className={`grid place-items-center ${logoClasses} rounded-full text-white bg-slate-600`}
              >
                <FaLinkedinIn />
              </div>
            }
            social={"LinkedIn"}
            link={state?.linkedIn ?? null}
            isEditing={isEditing}
            />
          <SocialLink
            icon={<FaGithub className={`${logoClasses} text-slate-600`} />}
            social={"Github"}
            link={state?.github ?? null}
            isEditing={isEditing}
            />
          <SocialLink
            icon={<BsFacebook className={`${logoClasses}`} />}
            social={"Facebook"}
            link={state?.facebook ?? null}
            isEditing={isEditing}
            />
          <SocialLink
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
            />
          <SocialLink
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
            />
          <SocialLink
            icon={<ImSphere className={`${logoClasses}`} />}
            social={"Website"}
            link={state?.website ?? null}
            isEditing={isEditing}
          />
        </div>
      </Section>
    </div>
  );
};

export default OntheWeb;
