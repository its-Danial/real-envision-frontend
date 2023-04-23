import { FC } from "react";
import { RiseLoader } from "react-spinners";
import useThemeDetector from "../../hooks/useThemeDetector";

type LoadingIndicatorProps = {
  className: string;
  size: number;
};

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ className, size }) => {
  const isDarkTheme = useThemeDetector();

  return <RiseLoader color={isDarkTheme ? "#ff79c6" : "#0d0d0d"} size={size} className={className} />;
};
export default LoadingIndicator;
