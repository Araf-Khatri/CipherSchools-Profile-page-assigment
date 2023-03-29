import { FC, RefObject, useRef, useState } from "react";


interface SelectInputProps {
  options: String[];
  heading: String;
}

const SelectInput: FC<SelectInputProps> = ({
  options,
  heading,
}: SelectInputProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedOption, setSelectedOption] = useState<String | undefined>(
    options[0]
  );

  const onChangeHandler = () => {
    setSelectedOption(selectRef.current?.value);
  };

  return (
    <div className="flex flex-col">
      <p>{heading}</p>
      <select
        ref={selectRef}
        className="p-2 px-4 outline-none bg-white"
        onChange={onChangeHandler}
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
