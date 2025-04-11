import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Theme from "../utils/Theme";
import store from "@/state/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import NavBar from "@/components/Organisms/NavBar/NavBar";
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/apolloClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Script from "next/script";
import { CursorRedirectStyles } from "@/components/Atoms/Typography/redirectionStyles";
import dynamic from "next/dynamic";
import { Be_Vietnam_Pro } from "next/font/google";
import ChatLoader from "@/components/Organisms/ChatLoader/ChatLodear";

export const vietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-vietnam-pro",
  display: "swap",
});

export default ({ Component, pageProps }: AppProps) => {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <div className={vietnamPro.variable}>
            <Theme>
              <ChatLoader />
              <CursorRedirectStyles />
              <NavBar />
              <Component {...pageProps} />
            </Theme>
          </div>
        </Provider>
      </ApolloProvider>
    </HelmetProvider>
  );
};
