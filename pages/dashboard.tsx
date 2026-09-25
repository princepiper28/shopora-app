import Head from "next/head";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronDown,
  Clock3,
  Download,
  Heart,
  Package,
  Plus,
  RefreshCcw,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

/* ================================================================
   TYPES
================================================================ */

type DashboardProps = {
  userName: string;
};

/* ================================================================
   DEMO DATA
================================================================ */

const stats = [
  {
    title: "Total Orders",
    value: "1,284",
    change: "+12.8%",
    trend: "up",
    icon: ShoppingBag,
    description: "vs. last month",
  },
  {
    title: "Total Revenue",
    value: "$48,295.00",
    change: "+18.4%",
    trend: "up",
    icon: TrendingUp,
    description: "vs. last month",
  },
  {
    title: "Products",
    value: "248",
    change: "+8.2%",
    trend: "up",
    icon: Package,
    description: "active products",
  },
  {
    title: "Customers",
    value: "8,492",
    change: "+14.6%",
    trend: "up",
    icon: Users,
    description: "total customers",
  },
];

const recentOrders = [
  {
    id: "#SHP-10482",
    customer: "Michael Johnson",
    product: "Apple AirPods Pro",
    amount: "$249.00",
    status: "Delivered",
    date: "Today, 10:42 AM",
  },
  {
    id: "#SHP-10481",
    customer: "Sarah Williams",
    product: "Nike Air Max 270",
    amount: "$189.00",
    status: "Processing",
    date: "Today, 09:18 AM",
  },
  {
    id: "#SHP-10480",
    customer: "Daniel Okafor",
    product: "Samsung Galaxy Watch",
    amount: "$329.00",
    status: "Shipped",
    date: "Yesterday",
  },
  {
    id: "#SHP-10479",
    customer: "Emily Carter",
    product: "Sony WH-1000XM5",
    amount: "$399.00",
    status: "Delivered",
    date: "Yesterday",
  },
  {
    id: "#SHP-10478",
    customer: "James Wilson",
    product: "MacBook Air M3",
    amount: "$1,099.00",
    status: "Processing",
    date: "Sep 05, 2026",
  },
];

const topProducts = [
  {
    name: "Apple AirPods Pro",
    category: "Electronics",
    sold: "428 sold",
    revenue: "$106,572",
    rating: "4.9",
  },
  {
    name: "Nike Air Max 270",
    category: "Fashion",
    sold: "316 sold",
    revenue: "$59,724",
    rating: "4.8",
  },
  {
    name: "Samsung Galaxy Watch",
    category: "Electronics",
    sold: "284 sold",
    revenue: "$93,436",
    rating: "4.7",
  },
  {
    name: "Sony WH-1000XM5",
    category: "Audio",
    sold: "241 sold",
    revenue: "$96,159",
    rating: "4.9",
  },
];

const activities = [
  {
    icon: ShoppingCart,
    title: "New order received",
    description: "Order #SHP-10482 was placed",
    time: "12 min ago",
  },
  {
    icon: Package,
    title: "Order shipped",
    description: "Order #SHP-10480 is on the way",
    time: "48 min ago",
  },
  {
    icon: Heart,
    title: "Product added to wishlist",
    description: "AirPods Pro received 24 new saves",
    time: "2 hrs ago",
  },
  {
    icon: Star,
    title: "New review",
    description: "You received a 5-star product review",
    time: "4 hrs ago",
  },
];

/* ================================================================
   PAGE
================================================================ */

export default function DashboardPage({ userName }: DashboardProps) {
  const [period, setPeriod] = useState("Last 30 days");

  return (
    <>
      <Head>
        <title>Dashboard — Shopora</title>

        <meta
          name="description"
          content="Your Shopora commerce dashboard."
        />

        <meta name="theme-color" content="#060914" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#060914] dark:text-white">
        {/* ============================================================
            AMBIENT BACKGROUND
        ============================================================ */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/[0.07] blur-[120px] dark:bg-blue-500/[0.12]" />

          <div className="absolute right-[-200px] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.06] blur-[130px] dark:bg-indigo-500/[0.10]" />

          <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-cyan-400/[0.05] blur-[120px]" />
        </div>

        <div className="relative z-10">
          {/* ========================================================
              DASHBOARD CONTAINER
          ======================================================== */}

          <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {/* ======================================================
                TOP BAR
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-500">
                  <Sparkles className="h-4 w-4" />
                  Shopora Dashboard
                </div>

                <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl dark:text-white">
                  Good morning, {userName}.
                </h1>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Here&apos;s what&apos;s happening with your store today.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />

                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-[#060914]" />
                </button>

                <Link
                  href="/products"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Link>
              </div>
            </motion.div>

            {/* ======================================================
                PREMIUM OVERVIEW BANNER
            ====================================================== */}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="relative mb-8 overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-6 text-white shadow-2xl shadow-blue-950/10 sm:p-8"
            >
              <div className="pointer-events-none absolute -right-20 -top-32 h-[350px] w-[350px] rounded-full bg-blue-400/20 blur-[90px]" />

              <div className="pointer-events-none absolute bottom-[-100px] left-[35%] h-[250px] w-[250px] rounded-full bg-cyan-400/10 blur-[80px]" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-blue-200">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Store performance is up
                  </div>

                  <h2 className="max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                    Your store is having a{" "}
                    <span className="text-blue-300">great month.</span>
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                    Revenue is up 18.4% compared with the previous period.
                    Keep the momentum going.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="#analytics"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                    >
                      View analytics
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/orders"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                    >
                      View orders
                    </Link>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <div className="absolute inset-3 rounded-full border border-blue-400/20" />

                    <div className="text-center">
                      <p className="text-3xl font-black">18.4%</p>

                      <p className="mt-1 text-xs text-slate-400">
                        Growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ======================================================
                STAT CARDS
            ====================================================== */}

            <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.07,
                    }}
                    className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/[0.06] dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/20"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="h-3 w-3" />
                        {stat.change}
                      </div>
                    </div>

                    <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.title}
                    </p>

                    <div className="mt-1 flex items-end justify-between gap-3">
                      <p className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                        {stat.value}
                      </p>

                      <span className="pb-1 text-[11px] text-slate-400">
                        {stat.description}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </section>

            {/* ======================================================
                ANALYTICS + QUICK ACTIONS
            ====================================================== */}

            <section
              id="analytics"
              className="mb-8 grid scroll-mt-24 gap-6 xl:grid-cols-[1fr_340px]"
            >
              {/* Revenue Chart */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                        Revenue overview
                      </h2>

                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        +18.4%
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Track your store&apos;s performance over time.
                    </p>
                  </div>

                  <div className="relative">
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-9 text-xs font-semibold text-slate-700 outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                    >
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>This year</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-2 flex items-end gap-3">
                    <span className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                      $48,295
                    </span>

                    <span className="pb-1 text-xs font-medium text-slate-400">
                      USD
                    </span>
                  </div>

                  {/* Chart */}

                  <div className="relative mt-6 h-[260px] overflow-hidden">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[100, 75, 50, 25, 0].map((value) => (
                        <div
                          key={value}
                          className="flex items-center gap-3"
                        >
                          <span className="w-8 text-right text-[10px] text-slate-400">
                            {value}k
                          </span>

                          <div className="h-px flex-1 bg-slate-100 dark:bg-white/[0.06]" />
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-11 right-0 top-0">
                      <svg
                        viewBox="0 0 800 240"
                        preserveAspectRatio="none"
                        className="h-full w-full"
                        aria-label="Revenue chart"
                        role="img"
                      >
                        <defs>
                          <linearGradient
                            id="shoporaRevenueGradient"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="rgb(59 130 246)"
                              stopOpacity="0.25"
                            />

                            <stop
                              offset="100%"
                              stopColor="rgb(59 130 246)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        <path
                          d="M0 190 C70 180 80 150 145 160 C210 170 220 105 285 120 C350 135 370 92 430 105 C490 118 510 65 575 82 C640 100 650 42 710 55 C750 63 770 35 800 20 L800 240 L0 240 Z"
                          fill="url(#shoporaRevenueGradient)"
                        />

                        <path
                          d="M0 190 C70 180 80 150 145 160 C210 170 220 105 285 120 C350 135 370 92 430 105 C490 118 510 65 575 82 C640 100 650 42 710 55 C750 63 770 35 800 20"
                          fill="none"
                          stroke="rgb(59 130 246)"
                          strokeWidth="4"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="ml-11 mt-2 flex justify-between text-[10px] text-slate-400">
                    <span>Aug 11</span>
                    <span>Aug 17</span>
                    <span>Aug 24</span>
                    <span>Aug 31</span>
                    <span>Sep 07</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                      Quick actions
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Manage your store faster.
                    </p>
                  </div>

                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>

                <div className="mt-6 space-y-3">
                  <QuickAction
                    href="/products"
                    icon={<Package className="h-5 w-5" />}
                    title="Manage products"
                    description="View your catalog"
                  />

                  <QuickAction
                    href="/orders"
                    icon={<ShoppingBag className="h-5 w-5" />}
                    title="Manage orders"
                    description="Review recent orders"
                  />

                  <QuickAction
                    href="/customers"
                    icon={<Users className="h-5 w-5" />}
                    title="Customers"
                    description="View customer activity"
                  />

                  <QuickAction
                    href="/analytics"
                    icon={<BarChart3 className="h-5 w-5" />}
                    title="Analytics"
                    description="Explore performance"
                  />

                  <button
                    type="button"
                    className="flex w-full items-center gap-4 rounded-2xl border border-dashed border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-white/10 dark:hover:border-blue-400/20 dark:hover:bg-blue-500/[0.04]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-slate-400">
                      <Download className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Export report
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Download your store data
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>
            </section>

            {/* ======================================================
                ORDERS + ORDER STATUS
            ====================================================== */}

            <section className="mb-8 grid gap-6 xl:grid-cols-[1fr_340px]">
              {/* Recent Orders */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6 dark:border-white/[0.06]">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                      Recent orders
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Your latest customer orders.
                    </p>
                  </div>

                  <Link
                    href="/orders"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400"
                  >
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Desktop table */}

                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-left dark:border-white/[0.06]">
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Order
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Customer
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Product
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Amount
                        </th>

                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/[0.04] dark:hover:bg-white/[0.025]"
                        >
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {order.id}
                            </p>

                            <p className="mt-1 text-[11px] text-slate-400">
                              {order.date}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {order.customer}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            <p className="max-w-[180px] truncate text-sm text-slate-600 dark:text-slate-400">
                              {order.product}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {order.amount}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            <OrderStatus status={order.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}

                <div className="divide-y divide-slate-100 md:hidden dark:divide-white/[0.06]">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-950 dark:text-white">
                            {order.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {order.date}
                          </p>
                        </div>

                        <OrderStatus status={order.status} />
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {order.customer}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {order.product}
                        </p>
                      </div>

                      <p className="mt-4 text-lg font-black text-slate-950 dark:text-white">
                        {order.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Order Status */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                      Order status
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Current order breakdown.
                    </p>
                  </div>

                  <Package className="h-5 w-5 text-blue-500" />
                </div>

                <div className="mt-7">
                  <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border-[18px] border-blue-500/15">
                    <div className="text-center">
                      <p className="text-3xl font-black text-slate-950 dark:text-white">
                        1,284
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Total orders
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    <StatusBar
                      label="Delivered"
                      value="68%"
                      width="68%"
                      icon={<CheckIcon />}
                    />

                    <StatusBar
                      label="Processing"
                      value="18%"
                      width="18%"
                      icon={<Clock3 className="h-4 w-4" />}
                    />

                    <StatusBar
                      label="Shipped"
                      value="10%"
                      width="10%"
                      icon={<Truck className="h-4 w-4" />}
                    />

                    <StatusBar
                      label="Cancelled"
                      value="4%"
                      width="4%"
                      icon={<RefreshCcw className="h-4 w-4" />}
                    />
                  </div>
                </div>
              </motion.div>
            </section>

            {/* ======================================================
                TOP PRODUCTS + ACTIVITY
            ====================================================== */}

            <section className="grid gap-6 lg:grid-cols-2">
              {/* Top Products */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                      Top products
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Your best performing products.
                    </p>
                  </div>

                  <Link
                    href="/products"
                    className="text-xs font-semibold text-blue-500"
                  >
                    View catalog
                  </Link>
                </div>

                <div className="mt-6 space-y-3">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.name}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-3 transition hover:border-blue-200 hover:bg-slate-50 dark:border-white/[0.06] dark:hover:border-blue-400/20 dark:hover:bg-white/[0.025]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-black text-slate-500 dark:from-white/[0.08] dark:to-white/[0.04] dark:text-slate-300">
                        0{index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                          {product.name}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          <span>{product.category}</span>

                          <span>•</span>

                          <span>{product.sold}</span>

                          <span>•</span>

                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-amber-400" />
                            {product.rating}
                          </span>
                        </div>
                      </div>

                      <p className="hidden text-sm font-bold text-slate-900 sm:block dark:text-white">
                        {product.revenue}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Activity */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                      Recent activity
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      What&apos;s happening across Shopora.
                    </p>
                  </div>

                  <Link
                    href="/activity"
                    className="text-xs font-semibold text-blue-500"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-6 space-y-1">
                  {activities.map((activity, index) => {
                    const Icon = activity.icon;

                    return (
                      <div
                        key={`${activity.title}-${index}`}
                        className="relative flex gap-4 rounded-2xl p-3 transition hover:bg-slate-50 dark:hover:bg-white/[0.025]"
                      >
                        {index !== activities.length - 1 && (
                          <div className="absolute bottom-[-10px] left-[27px] top-[54px] w-px bg-slate-100 dark:bg-white/[0.06]" />
                        )}

                        <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {activity.title}
                            </p>

                            <span className="text-[11px] text-slate-400">
                              {activity.time}
                            </span>
                          </div>

                          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </section>

            {/* ======================================================
                FOOTER DASHBOARD SUMMARY
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center dark:border-white/[0.06]"
            >
              <p>
                © {new Date().getFullYear()} Shopora. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <Link
                  href="/help"
                  className="transition hover:text-blue-500"
                >
                  Help Center
                </Link>

                <Link
                  href="/contact"
                  className="transition hover:text-blue-500"
                >
                  Contact Support
                </Link>

                <Link
                  href="/privacy"
                  className="transition hover:text-blue-500"
                >
                  Privacy
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

/* ================================================================
   QUICK ACTION
================================================================ */

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40 dark:border-white/[0.06] dark:hover:border-blue-400/20 dark:hover:bg-blue-500/[0.04]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-400">
          {description}
        </p>
      </div>

      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />
    </Link>
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
   STATUS BAR
================================================================ */

function StatusBar({
  label,
  value,
  width,
  icon,
}: {
  label: string;
  value: string;
  width: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="text-slate-400">{icon}</span>
          {label}
        </div>

        <span className="text-xs font-bold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-blue-500"
        />
      </div>
    </div>
  );
}

/* ================================================================
   CHECK ICON
================================================================ */

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M5 10.5 8.2 14 15 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ================================================================
   SERVER-SIDE AUTH PROTECTION
================================================================ */

export const getServerSideProps: GetServerSideProps<
  DashboardProps
> = async (context) => {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  /* --------------------------------------------------------------
     NO SESSION → SEND USER TO LOGIN
  -------------------------------------------------------------- */

  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${encodeURIComponent(
          context.resolvedUrl
        )}`,
        permanent: false,
      },
    };
  }

  /* --------------------------------------------------------------
     SESSION EXISTS → LOAD USER NAME
  -------------------------------------------------------------- */

  const userName =
    session.user?.name?.trim() ||
    session.user?.email?.split("@")[0] ||
    "Shopora";

  return {
    props: {
      userName,
    },
  };
};
