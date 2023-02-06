import { FC } from "react";

type BackgroundCardProps = {
  children: React.ReactNode;
};

const BackgroundCard: FC<BackgroundCardProps> = ({ children }) => {
  return (
    <div
      className="bg-base-200 rounded-lg"
      style={{
        backgroundSize: "5px 5px",
        backgroundImage: "radial-gradient(hsla(0 0% 0%/.2) .5px,hsla(0 0% 94.902%/1) .5px)",
      }}
    >
      {children}
    </div>
  );
};
export default BackgroundCard;
