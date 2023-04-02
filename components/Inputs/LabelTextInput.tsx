import { FC } from "react";

type LabelTextInputProps = {
  label: string;
  placeholder: string;
  value: string;
  disable?: boolean;
  onChange: (value: string) => void;
};

const LabelTextInput: FC<LabelTextInputProps> = ({ label, placeholder, value, disable, onChange }) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <input
        type="text"
        disabled={disable}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className="input input-bordered input-primary w-full"
      />
    </div>
  );
};
export default LabelTextInput;
