import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>selfwork. | Project Management for Freelancers</title>
      </Head>
      <div id="overlay"></div>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
