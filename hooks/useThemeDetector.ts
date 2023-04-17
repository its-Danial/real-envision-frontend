import { useEffect, useState } from "react";

const useThemeDetector = () => {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

  let tempIsDarkTheme = false;
  if (typeof window !== "undefined") {
    tempIsDarkTheme = getCurrentTheme();
  }
  const [isDarkTheme, setIsDarkTheme] = useState(tempIsDarkTheme);
  const mqListener = (e: any) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return isDarkTheme;
};

export default useThemeDetector;
