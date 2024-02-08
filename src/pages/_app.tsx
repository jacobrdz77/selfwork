import "../styles/main.scss";
import Head from "next/head";
import PageLayout from "../components/layout/PageLayout";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import LoginLayout from "@/components/layout/LoginLayout";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
  let child = null;

  console.log(currentPath);

  if (currentPath === "/login") {
    child = (
      <LoginLayout>{getLayout(<Component {...pageProps} />)}</LoginLayout>
    );
  } else if (currentPath.includes("/sketch")) {
    child = getLayout(<Component {...pageProps} />);
  } else {
    child = <PageLayout>{getLayout(<Component {...pageProps} />)}</PageLayout>;
  }

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
        {child}
        {/* {currentPath === "/login" ? (
          <LoginLayout>{getLayout(<Component {...pageProps} />)}</LoginLayout>
        ) : (
          <PageLayout>{getLayout(<Component {...pageProps} />)}</PageLayout>
        )} */}
        <Analytics />
        <GoogleAnalytics />
      </QueryClientProvider>
    </SessionProvider>
  );
}
export default MyApp;

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}
      ></Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ID}'); `,
        }}
      />
    </>
  );
};
