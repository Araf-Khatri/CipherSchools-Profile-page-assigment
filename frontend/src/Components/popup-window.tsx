import { FC, Fragment, ReactNode } from "react";
import PopupAuth from "./popup-auth";

interface PopupProps {
  children: ReactNode;
}

const PopupWindow: FC<PopupProps> = ({ children }: PopupProps) => {
  return (
    <Fragment>
      <div className="absolute h-screen w-full bg-[#00000040] z-40"></div>
      <div className="absolute p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white">
        {children}
      </div>
    </Fragment>
  );
};

export default PopupWindow;
