import { FC } from "react";

interface LayoutHeading {
  onclick: React.MouseEventHandler<HTMLButtonElement>;
  heading: String;
}

const LayoutHeading: FC<LayoutHeading> = ({
  onclick,
  heading,
}: LayoutHeading) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-medium">{heading}</p>
      <button className="py-2 px-8 text-white bg-orange-400 rounded-md" onClick={onclick}>Edit</button>
    </div>
  );
};

export default LayoutHeading;
