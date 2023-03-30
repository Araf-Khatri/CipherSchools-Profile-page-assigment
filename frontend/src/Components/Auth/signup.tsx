import Axios from "axios";
import { FC, FormEvent, useRef, useState } from "react";

interface SignupData {
  name: String;
  email: String;
  password: String;
  passwordConfirm: String;
}

interface SignupProps {
  inputClass: String;
}

const SignUp: FC<SignupProps> = ({ inputClass }: SignupProps) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const signupHandler = (e: FormEvent) => {
    e.preventDefault();
    const sendRequest = async (data: SignupData) => {
      const response = await Axios.post(
        "http://127.0.0.1:3090/api/user/signup",
        data
      );

      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
      window.location.reload();
    };
    const name = nameRef.current?.checkValidity() && nameRef.current?.value;
    const email = emailRef.current?.checkValidity() && emailRef.current?.value;
    const password =
      passwordRef.current?.checkValidity() && passwordRef.current?.value;
    const passwordConfirm =
      passwordConfirmRef.current?.checkValidity() &&
      passwordConfirmRef.current?.value;

    if (!name || !email || !password || !passwordConfirm) {
      return;
    }

    const data: SignupData = { name, email, password, passwordConfirm };

    sendRequest(data)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
  );
};

export default SignUp;
