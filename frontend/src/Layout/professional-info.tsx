import { FC } from "react";
import LayoutHeading from "../Components/layout-heading";
import SelectInput from "../Components/ProfessionalInfo/select-input";
import Section from "../Components/section";

const highestEducation: String[] = [
  "Primary",
  "Secondary",
  "Higher Secondary",
  "Graduation",
  "Post Graduation",
];

const userCurrentStatus: String[] = [
  "Schooling",
  "College Student",
  "Teaching",
  "Job",
  "Freelancing",
];

const ProfessionalInfo: FC = () => {
  return (
    <div>
      <Section>
        <LayoutHeading
          heading={"PROFESSIONAL INFORMATION"}
          onclick={() => {}}
        />
        <div className="grid grid-cols-2 gap-5">
          <SelectInput
            options={highestEducation}
            heading={"Highest education"}
          />
          <SelectInput
            options={userCurrentStatus}
            heading={"What do you do currently?"}
          />
        </div>
      </Section>
    </div>
  );
};

export default ProfessionalInfo;
