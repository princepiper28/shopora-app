// components/Footer.tsx

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Fashion", href: "/shop" },
  { label: "Electronics", href: "/shop" },
  { label: "Beauty", href: "/shop" },
  { label: "Home", href: "/shop" },
  { label: "New Arrivals", href: "/shop" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/#faq" },
  { label: "Shipping Information", href: "/contact" },
  { label: "Returns & Refunds", href: "/contact" },
  { label: "Track Order", href: "/profile" },
];

const companyLinks = [
  { label: "About SHOPORA", href: "/about" },
  { label: "Careers", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "#",
    icon: Facebook,
  },
  {
    label: "Twitter",
    href: "#",
    icon: Twitter,
  },
  {
    label: "YouTube",
    href: "#",
    icon: Youtube,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#050711] text-white">
      {/* =========================================================
          AMBIENT BRAND GLOW
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-48 left-[15%] h-[500px] w-[700px] rounded-full bg-blue-500/[0.045] blur-[150px]" />

        <div className="absolute -bottom-64 right-[5%] h-[500px] w-[600px] rounded-full bg-indigo-500/[0.035] blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,110,247,0.045),transparent_35%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* =========================================================
            TOP BRAND / NEWSLETTER AREA
        ========================================================== */}

        <div className="grid gap-12 border-b border-white/[0.07] pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20 lg:pb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="SHOPORA home"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                <Image
                  src="/branding/shopora-logo.png"
                  alt="SHOPORA logo"
                  fill
                  sizes="44px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <span className="text-xl font-semibold tracking-[-0.035em] text-white">
                SHOPORA
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/45 sm:text-[15px]">
              A better way to discover what you want.
              Explore thoughtfully selected products across
              fashion, technology, lifestyle and more.
            </p>

            {/* Socials */}
            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-white/40 transition-all duration-200 hover:border-white/[0.13] hover:bg-white/[0.07] hover:text-white"
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.7}
                      className="transition-transform duration-200 group-hover:scale-105"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:justify-self-end lg:w-full lg:max-w-md">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-400/90">
              Stay in the loop
            </div>

            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              Discover what&apos;s next.
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Get new arrivals, curated finds and SHOPORA
              updates delivered to your inbox.
            </p>

            <form className="mt-5 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Mail
                  size={16}
                  strokeWidth={1.7}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.035] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 transition-all duration-200 focus:border-blue-500/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              <button
                type="submit"
                className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#050711] transition-all duration-200 hover:bg-blue-500 hover:text-white"
              >
                Subscribe

                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </form>
          </div>
        </div>

        {/* =========================================================
            NAVIGATION
        ========================================================== */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-3 lg:grid-cols-4 lg:py-16">
          {/* Shop */}
          <FooterColumn
            title="Shop"
            links={shopLinks}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            links={supportLinks}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={companyLinks}
          />

          {/* Contact */}
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Get in touch
            </p>

            <div className="space-y-4">
              <a
                href="mailto:support@shopora.com"
                className="group flex items-start gap-3 text-sm text-white/45 transition-colors hover:text-white"
              >
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-white/25 transition-colors group-hover:text-blue-400"
                />

                <span>support@shopora.com</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-white/45">
                <MapPin
                  size={16}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-white/25"
                />

                <span>
                  Lagos, Nigeria
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
            >
              Contact SHOPORA

              <ArrowUpRight
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* =========================================================
            BOTTOM BAR
        ========================================================== */}

        <div className="flex flex-col gap-5 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} SHOPORA. All rights reserved.
            </p>

            <p className="text-[11px] text-white/20">
              Discover. Shop. Enjoy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="text-xs text-white/35 transition-colors hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-white/35 transition-colors hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="text-xs text-white/35 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===============================================================
   FOOTER COLUMN
================================================================ */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
        {title}
      </p>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors duration-200 hover:text-white"
            >
              <span>{link.label}</span>

              <ArrowUpRight
                size={12}
                strokeWidth={1.7}
                className="translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}