import { FC, FormEvent, Fragment, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import SignUp from "./Auth/signup";
import Login from "./Auth/login";

const PopupAuth: FC = () => {
  const [isLogInActive, setIsLogInActive] = useState(false);

  const popupNavClass: String = "grid place-items-center py-4 px-14";
  const inputClass: String = "outline-none shadow-[inset_0_0_1px_0_black] p-1";

  return (
    <div className="flex flex-col bg-slate-100">
      <div className="flex">
        <div
          onClick={() => setIsLogInActive(true)}
          className={`${popupNavClass} ${
            isLogInActive ? "shadow-inner shadow-insetPopupColor" : ""
          } cursor-pointer`}
        >
          <p>Login</p>
        </div>
        <div
          onClick={() => setIsLogInActive(false)}
          className={`${popupNavClass} ${
            !isLogInActive ? "shadow-inner shadow-insetPopupColor" : ""
          } cursor-pointer`}
        >
          <p>Signup</p>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-3">
        {!isLogInActive && <SignUp inputClass={inputClass} />}
        {isLogInActive && <Login inputClass={inputClass} />}
      </div>
    </div>
  );
};

export default PopupAuth;
