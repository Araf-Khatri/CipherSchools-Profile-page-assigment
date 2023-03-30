import { FC } from "react";

interface Follower {
  name: String;
  email: String;
}

interface FollowerProps {
  data: Follower;
}

const Follower: FC<FollowerProps> = ({ data }: FollowerProps) => {
  return (
    <div className="flex flex-col gap-4 p-3 bg-white rounded-sm shadow-lg">
      <div className="flex justify-between items-end">
        <div className="h-10 w-10 rounded-full bg-slate-600"></div>
        <div>{data.name}</div>
      </div>
      <div>{data.email}</div>
    </div>
  );
};

export default Follower;
