import { FC } from "react";
import LayoutHeading from "../Components/layout-heading";
import Section from "../Components/section";

const AboutMe: FC = () => {
  return (
    <div>
      <Section border={true}>
       <LayoutHeading heading={'ABOUT ME'} onclick={() => {}} />
        <div className="bg-white p-4 mt-2 rounded-md">
          <p>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}</p>
        </div>
      </Section>
    </div>
  );
};

export default AboutMe;
