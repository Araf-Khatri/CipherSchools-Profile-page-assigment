import { FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  classname?: String;
  border?: Boolean
}

const Section: FC<SectionProps> = ({ children, classname, border=false }: SectionProps) => {
  return <div className={`mx-4 py-3 ${classname} ${border ? "border-b-[1px] border-slate-400 pb-4" : ""}`}>{children}</div>;
};

export default Section;
