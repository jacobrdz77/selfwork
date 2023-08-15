import "../styles/main.scss";
import Head from "next/head";
import PageLayout from "../components/layout/PageLayout";
import type { AppProps } from "next/app";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import LoginLayout from "@/components/layout/LoginLayout";
import { Analytics } from "@vercel/analytics/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
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
        {currentPath === "/login" ? (
          <LoginLayout>{getLayout(<Component {...pageProps} />)}</LoginLayout>
        ) : (
          <PageLayout>{getLayout(<Component {...pageProps} />)}</PageLayout>
        )}
        <Analytics />
      </QueryClientProvider>
    </SessionProvider>
  );
}
export default MyApp;
