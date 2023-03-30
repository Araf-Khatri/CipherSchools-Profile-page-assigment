import { FC } from "react";

interface LayoutHeading {
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
  onSave?: React.MouseEventHandler<HTMLButtonElement>;
  heading: String;
  isEditing?: Boolean;
}

const LayoutHeading: FC<LayoutHeading> = ({
  onEdit,
  onSave,
  heading,
  isEditing,
}: LayoutHeading) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-medium">{heading}</p>
      <button
        className="py-2 px-8 text-white bg-orange-400 rounded-md"
        onClick={isEditing ? onSave : onEdit}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default LayoutHeading;
