import { FC } from "react";

type LabelTextInputProps = {
  label: string;
  placeholder: string;
};

const LabelTextInput: FC<LabelTextInputProps> = ({ label, placeholder }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <input type="text" placeholder={placeholder} className="input input-bordered input-primary w-full" />
    </div>
  );
};
export default LabelTextInput;
