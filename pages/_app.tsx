import "../styles/globals.css";
import Head from "next/head";
import Login from "./login";
import Layout from "../components/Layout/Layout";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../src/store/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>selfwork. | Project Management for Freelancers</title>
      </Head>
      <div id="overlay"></div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
