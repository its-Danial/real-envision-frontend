import { FC } from "react";

type ParamProps = {
  label: string;
  value: string;
  style?: string;
};

const Param: FC<ParamProps> = ({ style, label, value }) => {
  return (
    <div className={`w-full grid items-start gap-2 ${style}`}>
      <h4 className="text-primary text-xs font-bold">{label}</h4>
      <span className="text-base font-normal">{value}</span>
    </div>
  );
};
export default Param;
