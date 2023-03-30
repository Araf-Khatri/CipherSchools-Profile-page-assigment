import { EventHandler, FC, RefObject, useRef, useState } from "react";

interface SelectInputProps {
  options: String[];
  heading: String;
  data: String;
  onChangeHandler: Function;
  type: String;
}

const SelectInput: FC<SelectInputProps> = ({
  options,
  heading,
  data,
  onChangeHandler,
  type,
}: SelectInputProps) => {
  // const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="flex flex-col">
      <p>{heading}</p>
      <select
        // ref={selectRef}
        className="p-2 px-4 outline-none bg-white"
        onChange={(e) => onChangeHandler(e, type)}
        value={`${data}`}
      >
        {options.map((value, idx) => (
          <option
            key={`${value}` + 1}
            value={`${value}`}
            // className={value === selectedOption ? "active:bg-slate-500" : ""}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
