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

interface UserData {
  name: String;
  email: String;
  followers: Number;
  interests?: String[];
  about?: String;
}

function App() {
  const userId = localStorage.getItem("userId");
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
      console.log(data)
    };
    fetchData();
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
      <ProfileNav />
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <AboutMe />
              <OntheWeb />
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
