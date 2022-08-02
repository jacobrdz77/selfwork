import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import Login from "./login";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Head>
            <title>selfwork. | Project Management for Freelancers</title>
          </Head>

          <div id="overlay"></div>
          {!session && <Login />}
          {session && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
