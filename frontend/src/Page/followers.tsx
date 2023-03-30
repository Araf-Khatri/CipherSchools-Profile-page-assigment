import Axios from "axios";
import { FC, useEffect, useState } from "react";
import Follower from "../Components/Follower/follower";
import Section from "../Components/section";

interface FollowerType {
  name: String;
  email: String;
}

interface FollowerProps {
  followersLength: number;
}

const FollowersPage: FC<FollowerProps> = ({
  followersLength,
}: FollowerProps) => {
  const userId = localStorage.getItem("userId");
  const [followers, setFollowers] = useState<FollowerType[]>();
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const totalPage = Math.floor(
    followersLength / limit + (followersLength % limit > 0 ? 1 : 0)
  );

  const pagination = new Array(totalPage).fill("", 0, totalPage);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(
        `http://127.0.0.1:3090/api/follower/${userId}?page=${page}&limit=${limit}`
      );
      return response.data;
    };
    fetchData().then((res) => {
      setFollowers(res.data);
    });
  }, [page]);

  return (
    <div>
      <Section classname={"flex flex-col items-center gap-8"}>
        <div className="flex gap-10">
          {followers &&
            followers.map((data: FollowerType) => (
              <Follower data={data} key={`${data.name}${data.email}`} />
            ))}
        </div>
        <div className="flex gap-2">
          {pagination.map((_, i) => (
            <div
              onClick={() => setPage(i + 1)}
              key={`1${i}` + 123511}
              className={`grid place-items-center h-12 w-12 rounded-full text-white  ${
                i + 1 == page ? "bg-orange-400" : "bg-slate-500"
              }`}
            >
              <p>{i + 1}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default FollowersPage;
