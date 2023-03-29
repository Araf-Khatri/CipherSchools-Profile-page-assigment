import { FC, FormEvent, Fragment, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";

interface SignupData {
  name: String;
  email: String;
  password: String;
  passwordConfirm: String;
}

const PopupAuth: FC = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const [isLogInActive, setIsLogInActive] = useState(false);

  const signupHandler = (e: FormEvent) => {
    e.preventDefault();
    const sendRequest = async (data: SignupData) => {
      const response = await Axios.post(
        "http://127.0.0.1:3090/api/user/signup",
        data
      );

      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
    };
    const name = nameRef.current?.checkValidity() && nameRef.current?.value;
    const email = nameRef.current?.checkValidity() && emailRef.current?.value;
    const password =
      passwordRef.current?.checkValidity() && passwordRef.current?.value;
    const passwordConfirm =
      passwordConfirmRef.current?.checkValidity() &&
      passwordConfirmRef.current?.value;

    if (!name || !email || !password || !passwordConfirm) {
      console.log(passwordRef.current, passwordRef.current?.checkValidity());
      return;
    }

    const data: SignupData = { name, email, password, passwordConfirm };

    sendRequest(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        {!isLogInActive && (
          <Fragment>
            <form onSubmit={signupHandler} className="flex flex-col gap-8">
              <div>
                <div className="flex flex-col">
                  <label htmlFor="name">Name:</label>
                  <input
                    type={"text"}
                    className={`${inputClass}`}
                    id="name"
                    required
                    ref={nameRef}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email:</label>
                  <input
                    type={"email"}
                    className={`${inputClass}`}
                    id="email"
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Password:</label>
                  <input
                    type={"password"}
                    className={`${inputClass}`}
                    id="password"
                    min={8}
                    required
                    ref={passwordRef}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="confirm-password">Confirm Password:</label>
                  <input
                    type={"password"}
                    className={`${inputClass}`}
                    id="confirm-password"
                    min={8}
                    required
                    ref={passwordConfirmRef}
                  />
                </div>
              </div>

              <button type="submit" className="p-1 bg-slate-900 text-slate-100">
                Sign Up
              </button>
            </form>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PopupAuth;
