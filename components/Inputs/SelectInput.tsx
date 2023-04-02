import { FC } from "react";

type SelectInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SelectInput: FC<SelectInputProps> = ({ value, onChange }) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">Image Download Format</span>
      </label>
      <select className="select select-primary" value={value} onChange={onChangeHandler}>
        <option>JPEG</option>
        <option>PNG</option>
        <option>WEBP</option>
      </select>
    </div>
  );
};
export default SelectInput;
