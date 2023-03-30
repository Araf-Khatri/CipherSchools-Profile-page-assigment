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
  followers: Number;
  interests?: String[];
  about?: String;
  highestEducation?: String;
  currentStatus?: String;
  socials?: SocialsData;
}

function App() {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState<UserData | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    const userId: String | null = localStorage.getItem("userId");

    if (userId) {
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
      console.log(userData, followers, socials);
      const data = {
        ...userData,
        followers,
        socials,
      };
      delete data._id;
      console.log(data);
      setData(data);
    };
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="grid place-items-center">
        <PopupAuth />
      </div>
    );
  }
  return (
    <div className="relative App bg-slate-100 text-slate-900">
      <ProfileNav
        profileData={{
          name: data?.name,
          email: data?.email,
          followers: data?.followers,
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <AboutMe aboutData={data?.about || ""} />
              <OntheWeb
                socialData={{
                  linkedIn: data?.socials?.linkedIn || "",
                  github: data?.socials?.github || "",
                  facebook: data?.socials?.facebook ||"",
                  twitter: data?.socials?.twitter || "",
                  instagram: data?.socials?.instagram || "",
                  website: data?.socials?.website || "",
                }}
              />
              <ProfessionalInfo />
              <Interests />
            </Fragment>
          }
        />
        <Route path="/followers" element={<p>Followers Page</p>} />
      </Routes>
    </div>
  );
}

export default App;
