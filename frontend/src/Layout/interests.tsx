import Axios from "axios";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import LayoutHeading from "../Components/layout-heading";
import PopupWindow from "../Components/popup-window";
import Section from "../Components/section";

interface InterestsOption {
  name: string;
  isSelected: Boolean;
}
interface InterestProps {
  interests: string[];
}

const Interests: FC<InterestProps> = ({ interests }: InterestProps) => {
  const userId = localStorage.getItem("userId");
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [selected, setSelected] = useState<string[]>(interests ?? []);
  const options: string[] = [
    "Edit",
    "App Development",
    "Web Development",
    "Game Development",
    "Data Structures",
    "Programming",
    "Machine Learning",
    "Data Science",
    "Others",
  ];

  useEffect(() => {
    setSelected(interests)
  }, [interests])

  const toggleSelected = (idx: number) => {
    if (selected.includes(options[idx])) {
      setSelected((state) => state.filter((selec) => selec !== options[idx]));
      return;
    }
    setSelected((state) => [...state, options[idx]]);
  };

  const onSave = () => {
    const updateInterest = async () => {
      const res = await Axios.patch(
        `http://127.0.0.1:3090/api/user/interests/${userId}`,
        {
          interests: selected,
        }
      );
      console.log(res)
    };
    updateInterest().then(() => {
      setIsEditing(false)
    });
  };

  return (
    <Fragment>
      {isEditing && (
        <PopupWindow
          onSave={() => onSave()}
          onCancel={() => setIsEditing(false)}
          classname={"grid grid-cols-2 gap-4"}
        >
          {options.map((str, idx) => {
            if (selected && selected.includes(str)) {
              return (
                <div
                  onClick={() => toggleSelected(idx)}
                  key={`${str}`}
                  className="grid place-items-center py-4 px-14 bg-orange-400 text-white cursor-pointer rounded-lg"
                >
                  <p>{str}</p>
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => toggleSelected(idx)}
                  key={`${str}`}
                  className="grid place-items-center py-4 px-14 bg-slate-400 text-white cursor-pointer rounded-lg"
                >
                  <p>{str}</p>
                </div>
              );
            }
          })}
        </PopupWindow>
      )}
      <div>
        <Section>
          <LayoutHeading
            heading={"INTERESTS"}
            onEdit={() => setIsEditing(true)}
          />
          <div className="flex gap-4 flex-wrap">
            {selected.map((name) => {
              return (
                <div
                  key={`${name + 0}`}
                  className="p-1 px-3 bg-orange-100 rounded-sm"
                >
                  <p className="text-orange-500 text-sm">{name}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </Fragment>
  );
};

export default Interests;
