import "../styles/globals.scss";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const client = new QueryClient();
  const path = useRouter().pathname;

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Project Management for Freelancers"
          />
          <title>selfwork. | Project Management for Freelancers</title>
        </Head>
        <div aria-hidden="true" id="overlay"></div>
        {path !== "/login" ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}
export default MyApp;
