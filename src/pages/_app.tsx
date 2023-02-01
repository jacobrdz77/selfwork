import "../styles/main.scss";
import Head from "next/head";
import PageLayout from "../components/layout/PageLayout";
import type { AppProps } from "next/app";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const getLayout = Component.getLayout ?? ((page) => page);

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
            content="Project Management for freelancers"
          />
          <title>selfwork.</title>
        </Head>
        <PageLayout>{getLayout(<Component {...pageProps} />)}</PageLayout>
      </QueryClientProvider>
    </SessionProvider>
  );
}
export default MyApp;
