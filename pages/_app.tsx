import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import Login from "./login";
import { useAppSelector, useAppDispatch } from "../src/store/hooks";
import { sessionActions } from "../src/store/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // const sessionState = useAppSelector((state) => state.userSession);
  // const dispatch = useAppDispatch();
  if (!session) {
    // dispatch(sessionActions.setSession(session));
    return (
      <SessionProvider session={session}>
        <Login />
      </SessionProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Head>
          <title>selfwork. | Project Management for Freelancers</title>
        </Head>

        <div id="overlay"></div>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
