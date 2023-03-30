import Axios from "axios";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import LayoutHeading from "../Components/layout-heading";
import SelectInput from "../Components/ProfessionalInfo/select-input";
import Section from "../Components/section";

const highestEducation: String[] = [
  "",
  "Primary",
  "Secondary",
  "Higher Secondary",
  "Graduation",
  "Post Graduation",
];

const userCurrentStatus: String[] = [
  "",
  "College Student",
  "Teaching",
  "Job",
  "Freelancing",
];

interface ProfessionalInfoData {
  highestEducation: String;
  currentStatus: String;
}

interface ProfessionalInfoProps {
  data: ProfessionalInfoData;
}

const ProfessionalInfo: FC<ProfessionalInfoProps> = ({
  data,
}: ProfessionalInfoProps) => {
  const userId = localStorage.getItem("userId");
  const [profInfo, setProfInfo] = useState<ProfessionalInfoData>(data);
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  useEffect(() => {
    setProfInfo(data);
  }, [data]);

  const onChangeHandler = (
    e: ChangeEvent<HTMLSelectElement>,
    objUpdate: string
  ) => {
    const arr = [objUpdate, e.target.value];
    const obj = Object.fromEntries([arr]);
    setProfInfo({ ...profInfo, ...obj });
  };
  console.log(profInfo);

  const onSaveHandler = () => {
    const postData = async () => {
      const response = await Axios.patch(
        `http://127.0.0.1:3090/api/user/profile/${userId}?type=about`,
        profInfo
      );
      return response.data
    };
    postData().then(res => {
      setIsEditing(false)
    });
  };

  return (
    <div>
      <Section border={true}>
        <LayoutHeading
          isEditing={isEditing}
          heading={"PROFESSIONAL INFORMATION"}
          onEdit={() => setIsEditing(true)}
          onSave={() => onSaveHandler()}
        />
        <div className="relative grid grid-cols-2 gap-5">
          {!isEditing && <div className="absolute h-full w-full"></div>}
          <SelectInput
            options={highestEducation}
            heading={"Highest education"}
            data={profInfo?.highestEducation || ""}
            onChangeHandler={onChangeHandler}
            type={"highestEducation"}
          />
          <SelectInput
            options={userCurrentStatus}
            heading={"What do you do currently?"}
            data={profInfo?.currentStatus || ""}
            onChangeHandler={onChangeHandler}
            type={"currentStatus"}
          />
        </div>
      </Section>
    </div>
  );
};

export default ProfessionalInfo;
