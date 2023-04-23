import { FC } from "react";

type NegativePromptInputProps = {
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
};

const NegativePromptInput: FC<NegativePromptInputProps> = ({ id, value, onChange }) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(id, value);
  };

  const onClearInputClickHandler = () => {
    onChange(id, "");
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="The prompt or prompts not to guide the image generation e.g blurry, deformed, bad anatomy"
        value={value}
        onChange={onChangeHandler}
        className="input input-bordered input-primary w-full "
      />
      <button onClick={onClearInputClickHandler} className="btn btn-circle btn-sm btn-outline absolute right-2 top-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
export default NegativePromptInput;
