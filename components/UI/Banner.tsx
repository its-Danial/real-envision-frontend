import { FC, useEffect, useState } from "react";
import useThemeDetector from "../../hooks/useThemeDetector";

type BannerProps = {
  children: React.ReactNode;
};

const Banner: FC<BannerProps> = ({ children }) => {
  const isDarkTheme = useThemeDetector();

  const [banner, setBanner] = useState("");

  // TODO: Change to dark when done
  useEffect(() => {
    setBanner(
      isDarkTheme
        ? "bg-[url('../public/assets/projects/wave-dark.svg')]"
        : "bg-[url('../public/assets/projects/wave-light.svg')]"
    );
  }, [isDarkTheme]);

  return <div className={`h-full bg-contain bg-no-repeat ${banner}`}>{children}</div>;
};
export default Banner;
