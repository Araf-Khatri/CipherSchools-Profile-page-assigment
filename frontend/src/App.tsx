import Axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PopupAuth from "./Components/popup-auth";
import useHttp from "./Hooks/use-http";
import AboutMe from "./Layout/about-me";
import Interests from "./Layout/interests";
import OntheWeb from "./Layout/on-the-web";
import ProfessionalInfo from "./Layout/professional-info";
import ProfileNav from "./Layout/profile";
import FollowersPage from "./Page/followers";

interface SocialsData {
  linkedIn?: String;
  github?: String;
  facebook?: String;
  twitter?: String;
  instagram?: String;
  website?: String;
}

interface UserData {
  name: String;
  mobileNo?: String;
  email: String;
  followers: number;
  interests?: string[];
  about?: String;
  highestEducation?: String;
  currentStatus?: String;
  socials?: SocialsData;
}

function App() {
  // localStorage.setItem("userId", "6422c8072641b6df7ed22ae5");
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState<UserData | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    const userId: string = localStorage.getItem("userId") ?? "";

    if (!["null", "undefined"].includes(userId)) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const userId: String | null = localStorage.getItem("userId");
    //
    const fetchData = async () => {
      const { data: response } = await Axios.get(
        `http://127.0.0.1:3090/api/user/profile/${userId}`
      );
      const { userData, followers, socials } = response.data;
      const data = {
        ...userData,
        followers,
        socials,
      };
      delete data._id;
      setData(data);
    };

    if (isLoggedIn) {
      fetchData().catch((err) => setIsLoggedIn(false));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="grid place-items-center">
        <PopupAuth />
        
      </div>
    );
  }
  console.log(data);
  return (
    <div className="relative App bg-slate-100 text-slate-900">
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <ProfileNav
                profileData={{
                  name: data?.name,
                  email: data?.email,
                  followers: data?.followers,
                }}
              />
              <AboutMe aboutData={data?.about || ""} />
              <OntheWeb
                socialData={{
                  linkedIn: data?.socials?.linkedIn || "",
                  github: data?.socials?.github || "",
                  facebook: data?.socials?.facebook || "",
                  twitter: data?.socials?.twitter || "",
                  instagram: data?.socials?.instagram || "",
                  website: data?.socials?.website || "",
                }}
              />
              <ProfessionalInfo
                data={{
                  highestEducation: data?.highestEducation || "",
                  currentStatus: data?.currentStatus || "",
                }}
              />
              <Interests interests={data?.interests ?? []} />
            </Fragment>
          }
        />
        <Route
          path="/followers"
          element={<FollowersPage followersLength={data?.followers ?? 0} />}
        />
      </Routes>
    </div>
  );
}

export default App;
