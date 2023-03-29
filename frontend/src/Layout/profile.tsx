import Axios from "axios";
import { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Section from "../Components/section";

interface UserData {
  name: String;
  email: String;
  interests?: String[];
  followers: Number;
  about: String;
}

const ProfileNav: FC = () => {
  useEffect(() => {
    async function fetchProfileData() {
      // await Axios.get();
    }
  });

  return (
    <div className="sticky z-50 top-0 bg-white">
      <Section >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-black"></div>
            <div className="flex flex-col">
              <p className="text-sm text-slate-600">Hello,</p>
              {/* <p className="font-semibold">{profileData?.name}</p>
              <p className="text-xs text-slate-600">{profileData?.email}</p> */}
            </div>
          </div>
          <NavLink to={"/followers"}>
            {/* <p className="cursor-default">
              {`
              ${">>"} ${profileData?.followers || ""} followers
            `}
            </p> */}
          </NavLink>
        </div>
      </Section>
    </div>
  );
};

export default ProfileNav;
