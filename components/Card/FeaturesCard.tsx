import { FC } from "react";
import useThemeDetector from "../../hooks/useThemeDetector";
import { generateRandomSeed } from "../../utils/helpers";

type FeaturesCardProps = {
  icons: string;
  title: string;
  texts: string[];
};

const FeaturesCard: FC<FeaturesCardProps> = ({ icons, title, texts }) => {
  const isDarkTheme = useThemeDetector();

  return (
    <div className="flex flex-col items-center max-w-[350px]">
      <h2 className="text-5xl mb-7">{icons}</h2>
      <h4 className={`${isDarkTheme ? "text-primary" : "text-blue-500"} text-xl font-semibold mb-4`}>{title}</h4>
      {texts.map((text) => (
        <p key={generateRandomSeed()} className="text-sm max-w-[90%] text-center font-medium mb-4">
          {text}
        </p>
      ))}
    </div>
  );
};
export default FeaturesCard;
