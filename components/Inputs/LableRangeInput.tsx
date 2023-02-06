import { FC } from "react";

type LableRangeInputProps = {
  title: string;
  leftLabel: string;
  rightLabel: string;
};

const LableRangeInput: FC<LableRangeInputProps> = ({ title, leftLabel, rightLabel }) => {
  return (
    <div className="flex flex-col flex-1 space-y-1 justify-between">
      <h5 className="text-lg font-semibold">{title}</h5>
      <div className="flex flex-row justify-between text-sm">
        <p>{leftLabel}</p>
        <p>{rightLabel}</p>
      </div>
      <input type="range" min="0" max="100" defaultValue={40} className="range range-primary range-xs" />
    </div>
  );
};
export default LableRangeInput;
