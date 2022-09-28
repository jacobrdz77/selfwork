import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const client = new QueryClient();
  const path = useRouter().pathname;
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Provider store={store}>
          <Head>
            <title>selfwork. | Project Management for Freelancers</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta
              name="description"
              content="Project Management for Freelancers"
            />
          </Head>
          <div id="overlay"></div>
          {path === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
