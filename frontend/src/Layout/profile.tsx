import { FC, useEffect } from "react";
import Section from "../Components/section";

const ProfileNav: FC = () => {
  useEffect(() => {
    
  }, [])
  return (
    <div className="sticky z-50 top-0 bg-white">
      <Section classname={"p-2"}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-black"></div>
            <div className="flex flex-col">
              <p className="text-sm text-slate-600">Hello,</p>
              <p className="font-semibold">Name</p>
              <p className="text-xs text-slate-600">Email</p>
            </div>
          </div>
          <div>
            <p className="cursor-default">
              {">>"} {} followers
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ProfileNav;
