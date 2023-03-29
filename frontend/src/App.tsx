import { Fragment, useEffect, useState } from "react";
import PopupAuth from "./Components/popup-auth";
import ProfileNav from "./Layout/profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if (userId) {
      setIsLoggedIn(true)
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="grid place-items-center">
        <PopupAuth />
      </div>
    );
  }
 
  return (
    <div className="App text-slate-900">
      <ProfileNav />
      <div className="bg-slate-50 h-screen"></div>
    </div>
  );
}

export default App;
