import { FC, ReactNode, useState } from "react";
import { RiPencilFill } from 'react-icons/ri'

interface SocialLinkProps {
  social: String;
  icon: ReactNode;
  link: null | String;
  isEditing: Boolean;
}

const SocialLink: FC<SocialLinkProps> = ({
  social,
  icon,
  link = null,
  isEditing,
}: SocialLinkProps) => {
  const [clicked, setClicked] = useState<Boolean>(false);
  return (
    <div className="flex flex-col">
      <p>{social}</p>
      <div className="flex gap-3 items-center justify-between p-1 bg-white rounded-sm">
        <div className="flex gap-3 items-center">
          {icon}
          {!link ? (
            <p className="text-slate-500">{social}</p>
          ) : (
            <p className="text-slate-600">{link}</p>
          )}
        </div>
        {isEditing && <RiPencilFill className="h-5 w-5"/>}
      </div>
    </div>
  );
};

export default SocialLink;
