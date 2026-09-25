// pages/_document.tsx

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ─────────────────────────────────────────────
            SHOPORA BRAND / SEO
        ───────────────────────────────────────────── */}

        <meta
          name="description"
          content="Shopora — Anything You Want. Delivered Beautifully."
        />

        <meta
          name="keywords"
          content="Shopora, ecommerce, online shopping, fashion, electronics, beauty, lifestyle, products"
        />

        <meta name="application-name" content="Shopora" />
        <meta name="apple-mobile-web-app-title" content="Shopora" />

        <meta
          name="theme-color"
          content="#060914"
          media="(prefers-color-scheme: dark)"
        />

        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />

        <meta
          name="color-scheme"
          content="light dark"
        />

        {/* ─────────────────────────────────────────────
            MOBILE / APP EXPERIENCE
        ───────────────────────────────────────────── */}

        <meta
          name="mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <meta
          name="format-detection"
          content="telephone=no"
        />

        {/* ─────────────────────────────────────────────
            FAVICON / BRAND ICONS
        ───────────────────────────────────────────── */}

        <link
          rel="icon"
          href="/favicon.ico"
        />

        <link
          rel="apple-touch-icon"
          href="/icons/apple-touch-icon.png"
        />

        {/* ─────────────────────────────────────────────
            FONT PRECONNECT
        ───────────────────────────────────────────── */}

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* ─────────────────────────────────────────────
            SHOPORA TYPOGRAPHY
        ───────────────────────────────────────────── */}

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* ─────────────────────────────────────────────
            PWA MANIFEST
        ───────────────────────────────────────────── */}

        <link
          rel="manifest"
          href="/manifest.json"
        />

        {/* ─────────────────────────────────────────────
            OPEN GRAPH
        ───────────────────────────────────────────── */}

        <meta
          property="og:site_name"
          content="Shopora"
        />

        <meta
          property="og:title"
          content="Shopora — Anything You Want. Delivered Beautifully."
        />

        <meta
          property="og:description"
          content="Discover a smoother, smarter and more beautiful way to shop with Shopora."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:image"
          content="/branding/shopora-og-image.png"
        />

        {/* ─────────────────────────────────────────────
            TWITTER / SOCIAL SHARING
        ───────────────────────────────────────────── */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Shopora — Anything You Want. Delivered Beautifully."
        />

        <meta
          name="twitter:description"
          content="A premium shopping experience designed around discovery, convenience and trust."
        />

        <meta
          name="twitter:image"
          content="/branding/shopora-og-image.png"
        />
      </Head>

      <body className="bg-white text-slate-950 antialiased transition-colors duration-300 dark:bg-[#060914] dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
