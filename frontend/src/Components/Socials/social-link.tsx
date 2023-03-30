import { FC, MutableRefObject, ReactNode, useRef, useState } from "react";
import { RiPencilFill } from "react-icons/ri";

interface SocialLinkProps {
  key: String;
  social: String;
  icon: ReactNode;
  link: null | String;
  isEditing: Boolean;
  setData: Function;
}

const SocialLink: FC<SocialLinkProps> = ({
  social,
  icon,
  link = null,
  isEditing,
  setData,
  key
}: SocialLinkProps) => {
  
  return (
    <div className="flex flex-col">
      <p>{social}</p>
      <div className="relative items-center justify-between p-1 px-2 bg-white rounded-md">
        <div className="flex gap-3 items-center">
          {icon}
          {isEditing ? (
            <input
              className="bg-transparent h-8 w-10/12 outline-none"
              placeholder={`${social}`}
              type={"url"}
              onChange={(e) => setData(key, e.target.value)}
            />
          ) : !link ? (
            <p className="text-slate-500">{social}</p>
          ) : (
            <p className="text-slate-600">{link}</p>
          )}
        </div>
        {isEditing && (
          <RiPencilFill className="absolute h-5 w-5 text-slate-500 right-2 top-[10px]" />
        )}
      </div>
    </div>
  );
};

export default SocialLink;
