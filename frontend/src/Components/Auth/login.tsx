import Axios from "axios";
import {
  FC,
  FormEvent,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import useHttp from "../../Hooks/use-http";

interface LoginData {
  email: String;
  password: String;
}

interface LoginProps {
  inputClass: String;
}

const Login: FC<LoginProps> = ({ inputClass }: LoginProps) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { sendRequest, error, isLoading } = useHttp(
    "http://127.0.0.1:3090/api/user/login",
    "POST"
  );

  let errorPopup: ReactNode;
  useEffect(() => {
    if (error.error) {
      errorPopup = (
        <div className="p-3">
          <p className="font-semibold">{error.message}</p>
        </div>
      );
    } else {
      errorPopup = <Fragment></Fragment>;
    }
  }, [error]);

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.checkValidity() && emailRef.current?.value;
    const password =
      passwordRef.current?.checkValidity() && passwordRef.current?.value;

    if (!email || !password) {
      console.log("Invalid credentials");
      return;
    }

    const data: LoginData = {
      email,
      password,
    };
    sendRequest(data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("userId", res.data.id);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      {errorPopup}
      <form onSubmit={loginHandler} className="flex flex-col gap-8">
        <div className="">
          <p>Email: abcef@gmail.com</p>
          <p>pass: test1234</p>
        </div>
        <div>
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
        </div>

        <button type="submit" className="p-1 bg-slate-900 text-slate-100">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
