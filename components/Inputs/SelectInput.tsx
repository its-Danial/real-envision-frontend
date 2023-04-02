import { FC } from "react";

type SelectInputProps = {};

const SelectInput: FC<SelectInputProps> = (props) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">Image Download Format</span>
      </label>
      <select className="select select-primary">
        <option selected>JPEG</option>
        <option>PNG</option>
        <option>WEBP</option>
      </select>
    </div>
  );
};
export default SelectInput;
