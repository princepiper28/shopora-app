// pages/_app.tsx

import Head from "next/head";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";

import "@/styles/globals.css";

import Layout from "@/components/Layout";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import { UIProvider } from "@/components/UIContext";
import { ThemeProvider } from "@/components/ThemeContext";

/**
 * Allows individual pages to define their own layout.
 *
 * Example:
 *
 * LoginPage.getLayout = (page) => page;
 *
 * This lets special pages such as Login, Register,
 * Checkout, etc. bypass the normal Shopora Header/Footer.
 */
type NextPageWithLayout = AppProps["Component"] & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps) {
  /**
   * Convert the Next.js page component into our
   * extended page type that supports getLayout.
   */
  const PageComponent = Component as NextPageWithLayout;

  /**
   * Use the page's custom layout when provided.
   *
   * Otherwise, automatically use the normal
   * Shopora Layout containing:
   *
   * Header
   * Page content
   * Footer
   */
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

      {/* Global application providers */}
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
    </>
  );
}
