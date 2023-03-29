import { FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  classname?: String;
}

const Section: FC<SectionProps> = ({ children, classname }: SectionProps) => {
  return <div className={`mx-2 ${classname}`}>{children}</div>;
};

export default Section;
