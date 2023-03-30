import Axios from "axios";
import { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Section from "../Components/section";

interface ProfileData {
  name?: String;
  email?: String;
  followers?: Number;
}
interface ProfileNavProps {
  profileData: ProfileData;
}

const ProfileNav: FC<ProfileNavProps> = ({ profileData }: ProfileNavProps) => {
  return (
    <div className="sticky z-30 top-0 bg-white shadow-sm">
      <Section>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-black"></div>
            <div className="flex flex-col">
              <p className="text-sm text-slate-600">Hello,</p>
              <p className="font-semibold">{profileData?.name}</p>
              <p className="text-xs text-slate-600">{profileData?.email}</p>
            </div>
          </div>
          <NavLink to={"/followers"}>
            <p className="cursor-default">
              {`
              ${">>"} ${profileData.followers} followers
            `}
            </p>
          </NavLink>
        </div>
      </Section>
    </div>
  );
};

export default ProfileNav;
