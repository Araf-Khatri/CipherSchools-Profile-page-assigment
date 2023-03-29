import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PopupAuth from "./Components/popup-auth";
import useHttp from "./Hooks/use-http";
import AboutMe from "./Layout/about-me";
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
  const [data, setData] = useState<UserData | null>(null);
  const { sendRequest, error, isLoading } = useHttp(
    `http://127.0.0.1:3090/api/user/profile/${userId}`,
    "GET"
  );

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

  console.log(data);
  return (
    <div className="App text-slate-900">
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <ProfileNav profileData={data} />
              <AboutMe />
              <div className="bg-slate-50 h-screen"></div>
            </Fragment>
          }
        />
        <Route path="/followers" element={<p>Followers Page</p>} />
      </Routes>
    </div>
  );
}

export default App;
