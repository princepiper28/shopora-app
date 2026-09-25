// pages/profile.tsx

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  Edit3,
  Heart,
  LockKeyhole,
  MapPin,
  Package,
  Phone,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  UserRound,
  Wallet,
} from "lucide-react";

import { motion } from "framer-motion";

/* ================================================================
   DEMO DATA

   Orders, reward points, addresses, and payment methods below
   are still placeholder content — those need their own database
   tables (Order, Address, PaymentMethod) and API routes, which is
   a separate build from auth. Identity fields (name, email,
   avatar initials, member-since date) are now pulled from the
   real, database-backed session via useSession().
================================================================ */

const orders = [
  {
    id: "#SHP-10482",
    product: "Apple AirPods Pro",
    items: "1 item",
    amount: "$249.00",
    date: "Sep 06, 2026",
    status: "Delivered",
  },
  {
    id: "#SHP-10476",
    product: "Nike Air Max 270",
    items: "1 item",
    amount: "$189.00",
    date: "Sep 02, 2026",
    status: "Shipped",
  },
  {
    id: "#SHP-10461",
    product: "Samsung Galaxy Watch",
    items: "1 item",
    amount: "$329.00",
    date: "Aug 28, 2026",
    status: "Processing",
  },
];

/* ================================================================
   HELPERS
================================================================ */

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatMemberSince(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

/* ================================================================
   PAGE
================================================================ */

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  /* =============================================================
     AUTH GUARD — same pattern as /shop: wait for the session
     check to resolve before deciding, then redirect unauthenticated
     visitors to /login with a redirect back to /profile.
  ============================================================= */
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(router.asPath)}`
      );
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated || !session?.user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#060914]" />
    );
  }

  const user = session.user as {
    name?: string | null;
    email?: string | null;
    createdAt?: string;
  };

  const displayName = user.name || "Shopora User";
  const displayEmail = user.email || "";
  const initials = initialsFromName(displayName);
  const memberSince = formatMemberSince(user.createdAt);

  return (
    <>
      <Head>
        <title>My Profile — Shopora</title>

        <meta
          name="description"
          content="Manage your Shopora profile, orders, preferences, addresses, and account settings."
        />

        <meta name="theme-color" content="#060914" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#060914] dark:text-white">
        {/* ============================================================
            AMBIENT BACKGROUND
        ============================================================ */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-48 -top-48 h-[550px] w-[550px] rounded-full bg-blue-500/[0.06] blur-[130px] dark:bg-blue-500/[0.12]" />

          <div className="absolute right-[-220px] top-[25%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.06] blur-[130px] dark:bg-indigo-500/[0.1]" />

          <div className="absolute bottom-[-200px] left-[30%] h-[450px] w-[450px] rounded-full bg-cyan-400/[0.05] blur-[120px]" />
        </div>

        <div className="relative z-10">
          <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            {/* ======================================================
                PAGE HEADER
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-500">
                  <UserRound className="h-4 w-4" />
                  My account
                </div>

                <h1 className="mt-2 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-4xl dark:text-white">
                  Your profile
                </h1>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Manage your Shopora account and shopping preferences.
                </p>
              </div>

              <Link
                href="/settings"
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-500 sm:self-auto dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
              >
                <Settings className="h-4 w-4" />
                Account settings
              </Link>
            </motion.div>

            {/* ======================================================
                PROFILE HERO
            ====================================================== */}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="relative mb-8 overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white shadow-2xl shadow-blue-950/10"
            >
              <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-blue-400/20 blur-[100px]" />

              <div className="pointer-events-none absolute bottom-[-150px] left-[35%] h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[100px]" />

              <div className="pointer-events-none absolute right-10 top-10 hidden h-48 w-48 rounded-full border border-white/[0.06] lg:block" />

              <div className="pointer-events-none absolute right-20 top-20 hidden h-28 w-28 rounded-full border border-white/[0.06] lg:block" />

              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  {/* Profile identity */}
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* Avatar — initials derived from the real
                        session name */}
                    <div className="relative shrink-0">
                      <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-400 via-indigo-500 to-cyan-400 p-[2px] shadow-2xl shadow-blue-500/20">
                        <div className="flex h-full w-full items-center justify-center rounded-[1.9rem] bg-slate-900 text-4xl font-black text-white">
                          {initials}
                        </div>
                      </div>

                      <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-indigo-950 bg-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>

                      <button
                        type="button"
                        aria-label="Edit profile photo"
                        className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-lg backdrop-blur-xl transition hover:bg-white/20"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                          {displayName}
                        </h2>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                          <Star className="h-3 w-3 fill-current" />
                          Gold Member
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-300">
                        {displayEmail}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          Member since {memberSince}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                          Verified account
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/settings"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100"
                  >
                    Edit profile
                    <Edit3 className="h-4 w-4 transition-transform group-hover:rotate-[-8deg]" />
                  </Link>
                </div>

                {/* Stats — still placeholder; needs Order/Wishlist
                    aggregation queries once those tables exist */}
                <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl sm:grid-cols-4">
                  <ProfileStat
                    value="24"
                    label="Orders"
                    icon={<ShoppingBag className="h-4 w-4" />}
                  />

                  <ProfileStat
                    value="18"
                    label="Wishlist"
                    icon={<Heart className="h-4 w-4" />}
                  />

                  <ProfileStat
                    value="2,480"
                    label="Reward points"
                    icon={<Star className="h-4 w-4" />}
                  />

                  <ProfileStat
                    value="$4,820"
                    label="Total spent"
                    icon={<Wallet className="h-4 w-4" />}
                  />
                </div>
              </div>
            </motion.section>

            {/* ======================================================
                MAIN CONTENT
            ====================================================== */}

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <div className="space-y-6">
                {/* Recent orders — still demo data */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                  className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6 dark:border-white/[0.06]">
                    <div>
                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                        Recent orders
                      </h2>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Keep track of your latest purchases.
                      </p>
                    </div>

                    <Link
                      href="/orders"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500"
                    >
                      View all orders
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                    {orders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.06,
                        }}
                        className="group p-5 transition hover:bg-slate-50 sm:p-6 dark:hover:bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-300">
                            <Package className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col justify-between gap-1 sm:flex-row">
                              <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                  {order.product}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  {order.id} • {order.items}
                                </p>
                              </div>

                              <p className="text-sm font-black text-slate-950 dark:text-white">
                                {order.amount}
                              </p>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <OrderStatus status={order.status} />

                              <span className="text-[11px] text-slate-400">
                                {order.date}
                              </span>
                            </div>
                          </div>

                          <ChevronRight className="hidden h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500 sm:block" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Personal information — now real */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <SectionHeader
                    icon={<UserRound className="h-5 w-5" />}
                    title="Personal information"
                    description="Your basic account details."
                    action="Edit"
                    href="/settings"
                  />

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <InfoCard
                      label="Full name"
                      value={displayName}
                      icon={<UserRound className="h-4 w-4" />}
                    />

                    <InfoCard
                      label="Email address"
                      value={displayEmail}
                      icon={<Wallet className="h-4 w-4" />}
                    />

                    <InfoCard
                      label="Phone number"
                      value="Not added yet"
                      icon={<Phone className="h-4 w-4" />}
                    />

                    <InfoCard
                      label="Member since"
                      value={memberSince}
                      icon={<CalendarDays className="h-4 w-4" />}
                    />
                  </div>
                </motion.section>

                {/* Saved address — still demo data, needs an
                    Address table */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <SectionHeader
                    icon={<MapPin className="h-5 w-5" />}
                    title="Saved address"
                    description="Your default delivery address."
                    action="Manage"
                    href="/addresses"
                  />

                  <div className="mt-6 flex flex-col justify-between gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center dark:border-white/[0.06] dark:bg-white/[0.025]">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                        <MapPin className="h-5 w-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            No saved address yet
                          </p>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                          Add a delivery address to speed up checkout.
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/addresses"
                      className="text-sm font-semibold text-blue-500"
                    >
                      Add address
                    </Link>
                  </div>
                </motion.section>
              </div>

              <aside className="space-y-6">
                <motion.section
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-[1.75rem] border border-amber-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                        <Star className="h-5 w-5 fill-current" />
                      </div>

                      <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        Gold
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-bold">
                      Gold membership
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      You&apos;re 520 points away from reaching Platinum.
                    </p>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-[11px]">
                        <span className="text-slate-400">
                          2,480 points
                        </span>

                        <span className="font-semibold text-amber-300">
                          3,000
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "82.6%" }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-200"
                        />
                      </div>
                    </div>

                    <Link
                      href="/rewards"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300"
                    >
                      Explore rewards
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <SectionHeader
                    icon={<ShieldCheck className="h-5 w-5" />}
                    title="Account security"
                    description="Keep your account protected."
                  />

                  <div className="mt-6 space-y-3">
                    <SecurityItem
                      icon={<LockKeyhole className="h-4 w-4" />}
                      title="Password"
                      text="Managed via Shopora sign-in"
                      href="/settings"
                    />

                    <SecurityItem
                      icon={<ShieldCheck className="h-4 w-4" />}
                      title="Two-factor authentication"
                      text="Not set up"
                      href="/settings"
                    />

                    <SecurityItem
                      icon={<Bell className="h-4 w-4" />}
                      title="Login alerts"
                      text="Not set up"
                      href="/settings"
                    />
                  </div>
                </motion.section>

                {/* Payment methods — still demo data, needs a
                    PaymentMethod table + a real payment processor
                    integration (e.g. Stripe) */}
                <motion.section
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <SectionHeader
                    icon={<CreditCard className="h-5 w-5" />}
                    title="Payment methods"
                    description="Your saved payment options."
                    action="Manage"
                    href="/payment-methods"
                  />

                  <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
                    No payment methods saved yet.
                  </div>

                  <Link
                    href="/payment-methods"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 py-3 text-sm font-semibold text-slate-500 transition hover:border-blue-300 hover:text-blue-500 dark:border-white/10 dark:text-slate-400"
                  >
                    <CreditCard className="h-4 w-4" />
                    Add payment method
                  </Link>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                    Quick links
                  </h2>

                  <div className="mt-4 space-y-1">
                    <QuickLink
                      href="/wishlist"
                      icon={<Heart className="h-4 w-4" />}
                      label="My wishlist"
                    />

                    <QuickLink
                      href="/orders"
                      icon={<ShoppingBag className="h-4 w-4" />}
                      label="Order history"
                    />

                    <QuickLink
                      href="/addresses"
                      icon={<MapPin className="h-4 w-4" />}
                      label="Saved addresses"
                    />

                    <QuickLink
                      href="/settings"
                      icon={<Settings className="h-4 w-4" />}
                      label="Account settings"
                    />
                  </div>
                </motion.section>
              </aside>
            </div>

            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              <TrustCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Your data is secure"
                text="We protect your personal information."
              />

              <TrustCard
                icon={<ShoppingBag className="h-5 w-5" />}
                title="Shop with confidence"
                text="Protected checkout on every order."
              />

              <TrustCard
                icon={<Wallet className="h-5 w-5" />}
                title="Rewards that matter"
                text="Earn points every time you shop."
              />
            </motion.section>
          </div>
        </div>
      </main>
    </>
  );
}

/* ================================================================
   PROFILE STAT
================================================================ */

function ProfileStat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border-b border-r border-white/10 p-4 last:border-r-0 sm:border-b-0">
      <div className="flex items-center gap-2 text-blue-300">
        {icon}

        <span className="text-[11px] font-medium text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-black">{value}</p>
    </div>
  );
}

/* ================================================================
   SECTION HEADER
================================================================ */

function SectionHeader({
  icon,
  title,
  description,
  action,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
          {icon}
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-950 dark:text-white">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {action && href && (
        <Link
          href={href}
          className="text-xs font-semibold text-blue-500 transition hover:text-blue-400"
        >
          {action}
        </Link>
      )}
    </div>
  );
}

/* ================================================================
   INFO CARD
================================================================ */

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.025]">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-[11px] font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   ORDER STATUS
================================================================ */

function OrderStatus({ status }: { status: string }) {
  const styles = {
    Delivered:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Processing:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Shipped:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
        styles[status as keyof typeof styles] ??
        "bg-slate-100 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

/* ================================================================
   SECURITY ITEM
================================================================ */

function SecurityItem({
  icon,
  title,
  text,
  enabled,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  enabled?: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-slate-50 dark:border-white/[0.06] dark:hover:border-blue-400/20 dark:hover:bg-white/[0.025]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-slate-300">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] text-slate-400">
          {text}
        </p>
      </div>

      {enabled ? (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <Check className="h-3.5 w-3.5" />
        </span>
      ) : (
        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" />
      )}
    </Link>
  );
}

/* ================================================================
   QUICK LINK
================================================================ */

function QuickLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-white/[0.025]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
        {icon}
      </div>

      <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>

      <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />
    </Link>
  );
}

/* ================================================================
   TRUST CARD
================================================================ */

function TrustCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.035]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-400">{text}</p>
      </div>
    </div>
  );
}
