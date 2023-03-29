import { FC } from "react";
import LayoutHeading from "../Components/layout-heading";
import Section from "../Components/section";

const Interests: FC = () => {
  return (
    <div>
      <Section>
        <LayoutHeading heading={"INTERESTS"} onclick={() => {}} />
        <div className="flex gap-4 flex-wrap">
          <div className="p-1 px-3 bg-orange-100 rounded-sm">
            <p className="text-orange-500 text-sm">Web Development</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Interests;
