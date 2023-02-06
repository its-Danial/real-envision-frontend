import { FC } from "react";

type BasicCaptionCardProps = {
  title: string;
  text: string;
  style?: string;
};

const BasicCaptionCard: FC<BasicCaptionCardProps> = ({ text, title, style }) => {
  return (
    <div className={`card w-96 bg-base-100 shadow-lg ${style}`}>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};
export default BasicCaptionCard;
