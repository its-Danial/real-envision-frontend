import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import MainLayout from "../components/layout/MainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}

export default MyApp;
