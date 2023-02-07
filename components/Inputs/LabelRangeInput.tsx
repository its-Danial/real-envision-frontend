import { FC, useState } from "react";

type LabelRangeInputProps = {
  title: string;
  id: string;
  leftLabel: string;
  rightLabel: string;
  minValue: number;
  maxValue: number;
  value: number;
  step: number;
  onChange: (id: string, value: number) => void;
};

const LabelRangeInput: FC<LabelRangeInputProps> = ({
  title,
  id,
  leftLabel,
  rightLabel,
  value,
  maxValue,
  minValue,
  step,
  onChange,
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    onChange(id, value);
  };

  return (
    <div className="flex flex-col flex-1 space-y-1 justify-between">
      <h5 className="transition ease-in-out delay-150 text-lg font-semibold">
        {title} (<span>{value}</span>)
      </h5>
      <div className="flex flex-row justify-between text-sm">
        <p>{leftLabel}</p>
        <p>{rightLabel}</p>
      </div>
      <input
        type="range"
        min={minValue}
        max={maxValue}
        step={step}
        value={value}
        onChange={onChangeHandler}
        className="range range-primary range-xs"
      />
    </div>
  );
};
export default LabelRangeInput;
