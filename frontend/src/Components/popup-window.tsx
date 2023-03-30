import { FC, Fragment, ReactNode } from "react";
import PopupAuth from "./popup-auth";

interface PopupProps {
  children: ReactNode;
  classname: String;
  onSave: Function;
  onCancel: Function;
}

const PopupWindow: FC<PopupProps> = ({
  children,
  classname = "",
  onSave,
  onCancel,
}: PopupProps) => {
  return (
    <Fragment>
      <div className="fixed top-0 h-screen w-full bg-[#00000040] z-40"></div>
      <div>
        <div
          className={`flex flex-col gap-4 fixed p-6 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white `}
        >
          <div className={`${classname}`}>{children}</div>
          <div className="flex gap-4 justify-end text-black">
            <button
              className="px-6 py-2 bg-gray-200 rounded-md"
              onClick={() => onCancel()}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-orange-400 text-white rounded-md"
              onClick={() => onSave()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PopupWindow;
