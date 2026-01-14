import Head from "next/head";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import { UIProvider } from "@/components/UIContext";
import { ThemeProvider } from "@/components/ThemeContext";
import type { ReactNode } from "react";

type NextPageWithLayout = AppProps["Component"] & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as NextPageWithLayout;
  const getLayout =
    PageComponent.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        {/* ✅ Safe to include viewport here */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider>
        <UIProvider>
          <CartProvider>
            <WishlistProvider>
              {getLayout(<Component {...pageProps} />)}
            </WishlistProvider>
          </CartProvider>
        </UIProvider>
      </ThemeProvider>
    </>
  );
}
