import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PopupAuth from "./Components/popup-auth";
import useHttp from "./Hooks/use-http";
import AboutMe from "./Layout/about-me";
import OntheWeb from "./Layout/on-the-web";
import ProfessionalInfo from "./Layout/professional-info";
import ProfileNav from "./Layout/profile";

interface UserData {
  name: String;
  email: String;
  interests?: String[];
  followers: Number;
  about: String;
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
    // 
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="grid place-items-center">
        <PopupAuth />
      </div>
    );
  }

  return (
    <div className="App bg-slate-100 text-slate-900">
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <ProfileNav />
              <AboutMe />
              <OntheWeb />
              <ProfessionalInfo />
              <div className="h-screen"></div>
            </Fragment>
          }
        />
        <Route path="/followers" element={<p>Followers Page</p>} />
      </Routes>
    </div>
  );
}

export default App;
