// pages/_app.tsx

import Head from "next/head";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

import Layout from "@/components/Layout";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import { UIProvider } from "@/components/UIContext";
import { ThemeProvider } from "@/components/ThemeContext";

type NextPageWithLayout = AppProps["Component"] & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps) {
  const PageComponent = Component as NextPageWithLayout;

  const getLayout =
    PageComponent.getLayout ??
    ((page: ReactNode) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>

      {/*
        SessionProvider replaces the old custom AuthProvider.
        `session` comes from pageProps — populated automatically
        by NextAuth on pages using getServerSideProps with
        getServerSession, and refetched client-side otherwise.
        useSession() anywhere in the tree below this now reflects
        a real, server-validated session — not a localStorage flag.
      */}
      <SessionProvider session={pageProps.session}>
        <ThemeProvider>
          <UIProvider>
            <CartProvider>
              <WishlistProvider>
                {getLayout(
                  <Component {...pageProps} />
                )}
              </WishlistProvider>
            </CartProvider>
          </UIProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}