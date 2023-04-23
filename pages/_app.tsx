import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

import MainLayout from "../components/Layout/MainLayout";
import "../styles/globals.css";
import useThemeDetector from "../hooks/useThemeDetector";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const isDarkTheme = useThemeDetector();
  return (
    <>
      <NextNProgress color={isDarkTheme ? "#ff79c6" : "#0d0d0d"} height={6} />
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
