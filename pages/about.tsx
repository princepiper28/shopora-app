// pages/about.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  Check,
  Globe2,
  Heart,
  Layers3,
  Package,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Users,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Shopora — Shopping, Elevated</title>

        <meta
          name="description"
          content="Discover the story, mission, and vision behind Shopora — a modern shopping experience designed around discovery, trust, and simplicity."
        />

        <meta
          name="theme-color"
          content="#060914"
        />
      </Head>

      <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#060914] dark:text-white">
        {/* =========================================================
            AMBIENT BACKGROUND
        ========================================================= */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-blue-500/[0.06] blur-[140px] dark:bg-blue-500/[0.11]" />

          <div className="absolute right-[-250px] top-[20%] h-[600px] w-[600px] rounded-full bg-indigo-500/[0.05] blur-[140px] dark:bg-indigo-500/[0.1]" />

          <div className="absolute bottom-[-250px] left-[25%] h-[500px] w-[500px] rounded-full bg-cyan-400/[0.04] blur-[130px]" />
        </div>

        <div className="relative z-10">
          {/* =======================================================
              HERO
          ======================================================= */}

          <section className="relative overflow-hidden">
            <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
              <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                {/* LEFT */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                      <Image
                        src="/branding/shopora-logo.png"
                        alt="Shopora"
                        fill
                        sizes="48px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-black tracking-tight text-slate-950 dark:text-white">
                        shopora
                      </p>

                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                        Shopping, elevated.
                      </p>
                    </div>
                  </div>

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.06] px-3 py-1.5 text-xs font-bold text-blue-500">
                    <Sparkles className="h-3.5 w-3.5" />
                    The future of shopping
                  </div>

                  <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                    Shopping should feel{" "}
                    <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                      effortless.
                    </span>
                  </h1>

                  <p className="mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg dark:text-slate-400">
                    Shopora is built around a simple idea: finding what you
                    want, trusting where it comes from, and getting it
                    delivered should feel beautifully simple.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/shop"
                      className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-2xl"
                    >
                      Explore Shopora
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                    >
                      Talk to us
                    </Link>
                  </div>

                  {/* MINI TRUST */}

                  <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      Secure shopping
                    </span>

                    <span className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-500" />
                      Reliable delivery
                    </span>

                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-rose-500" />
                      Customer first
                    </span>
                  </div>
                </motion.div>

                {/* RIGHT VISUAL */}

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                  }}
                  className="relative"
                >
                  <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-[90px]" />

                  <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-400/10 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-6 shadow-2xl shadow-blue-950/20 sm:p-8">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-[90px]" />

                    <div className="pointer-events-none absolute bottom-[-100px] left-[-80px] h-64 w-64 rounded-full bg-cyan-400/10 blur-[80px]" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-200">
                          Our philosophy
                        </span>

                        <Sparkles className="h-5 w-5 text-blue-300" />
                      </div>

                      <div className="mt-14">
                        <p className="text-sm font-medium text-slate-400">
                          We believe great ecommerce is not just about
                          products.
                        </p>

                        <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                          It&apos;s about how shopping makes you{" "}
                          <span className="text-blue-300">
                            feel.
                          </span>
                        </h2>

                        <p className="mt-5 text-sm leading-6 text-slate-400">
                          Less friction. Better discovery. More confidence.
                          A shopping experience designed around people.
                        </p>
                      </div>

                      <div className="mt-12 grid grid-cols-2 gap-3">
                        <HeroStat
                          value="10K+"
                          label="Products"
                        />

                        <HeroStat
                          value="50+"
                          label="Brands"
                        />

                        <HeroStat
                          value="24H"
                          label="Fast delivery"
                        />

                        <HeroStat
                          value="24/7"
                          label="Support"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* =======================================================
              STORY
          ======================================================= */}

          <section className="border-y border-slate-200/70 bg-white/70 dark:border-white/[0.06] dark:bg-white/[0.015]">
            <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                    Why Shopora
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl dark:text-white">
                    Built for a better way to shop.
                  </h2>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                  }}
                  className="space-y-5 text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400"
                >
                  <p>
                    Shopora was created with one goal in mind: to make
                    ecommerce feel less complicated and more human.
                  </p>

                  <p>
                    We believe shoppers shouldn&apos;t have to fight through
                    cluttered interfaces, confusing navigation, or unnecessary
                    steps just to find something they love.
                  </p>

                  <p>
                    That&apos;s why Shopora brings discovery, convenience,
                    personalization, and trust together in one beautifully
                    designed experience.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* =======================================================
              MISSION / VISION / VALUES
          ======================================================= */}

          <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionIntro
              eyebrow="What drives us"
              title="More than a marketplace."
              description="Every part of Shopora is designed around a simple promise: make every interaction feel thoughtful."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <PremiumFeature
                number="01"
                icon={<Rocket className="h-5 w-5" />}
                title="Our mission"
                description="Create a shopping experience where discovering the right product feels natural, exciting, and effortless."
              />

              <PremiumFeature
                number="02"
                icon={<Globe2 className="h-5 w-5" />}
                title="Our vision"
                description="Build a globally trusted ecommerce ecosystem that connects people with products they genuinely value."
              />

              <PremiumFeature
                number="03"
                icon={<Heart className="h-5 w-5" />}
                title="Our values"
                description="Customer obsession, thoughtful design, transparency, speed, and continuous improvement guide everything we build."
              />
            </div>
          </section>

          {/* =======================================================
              VALUES
          ======================================================= */}

          <section className="bg-slate-950 text-white dark:bg-white/[0.02]">
            <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                    The Shopora standard
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                    Every detail should earn its place.
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                    From the first product discovery to the moment an order
                    reaches your door, we&apos;re constantly looking for ways
                    to remove friction and add value.
                  </p>

                  <Link
                    href="/shop"
                    className="group mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                  >
                    Experience Shopora
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ValueCard
                    icon={<Zap className="h-5 w-5" />}
                    title="Simple by design"
                    description="Clear navigation, focused interfaces, and fewer unnecessary steps."
                  />

                  <ValueCard
                    icon={<Sparkles className="h-5 w-5" />}
                    title="Beautifully useful"
                    description="Design isn't decoration. Every visual decision should improve the experience."
                  />

                  <ValueCard
                    icon={<ShieldCheck className="h-5 w-5" />}
                    title="Trust first"
                    description="Customers deserve confidence in what they buy and who they buy from."
                  />

                  <ValueCard
                    icon={<Users className="h-5 w-5" />}
                    title="People first"
                    description="Technology should make shopping easier, not make people work harder."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================
              STATS
          ======================================================= */}

          <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4 dark:border-white/[0.08] dark:bg-white/[0.035]">
              <BigStat
                icon={<ShoppingBag className="h-5 w-5" />}
                value="10K+"
                label="Products"
              />

              <BigStat
                icon={<Layers3 className="h-5 w-5" />}
                value="50+"
                label="Brands"
              />

              <BigStat
                icon={<Users className="h-5 w-5" />}
                value="24/7"
                label="Customer support"
              />

              <BigStat
                icon={<Package className="h-5 w-5" />}
                value="24H"
                label="Delivery promise"
              />
            </div>
          </section>

          {/* =======================================================
              CUSTOMER PROMISE
          ======================================================= */}

          <section className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
              }}
              className="relative overflow-hidden rounded-[2rem] border border-blue-400/10 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-7 text-white shadow-2xl shadow-blue-600/20 sm:p-10 lg:p-14"
            >
              <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-[90px]" />

              <div className="pointer-events-none absolute bottom-[-100px] left-[30%] h-64 w-64 rounded-full bg-cyan-300/10 blur-[80px]" />

              <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Star className="h-4 w-4 fill-current" />

                    <span className="text-xs font-bold uppercase tracking-[0.18em]">
                      Our promise
                    </span>
                  </div>

                  <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                    You deserve a shopping experience that feels like it was
                    made for you.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100">
                    That&apos;s the standard we&apos;re building toward every
                    day — better discovery, better service, and a better way
                    to shop.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 lg:w-[310px]">
                  <PromiseItem text="Thoughtful design" />
                  <PromiseItem text="Secure shopping" />
                  <PromiseItem text="Reliable delivery" />
                  <PromiseItem text="Customer first" />
                </div>
              </div>
            </motion.div>
          </section>

          {/* =======================================================
              FINAL CTA
          ======================================================= */}

          <section className="border-t border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.015]">
            <div className="mx-auto max-w-[1000px] px-4 py-20 text-center sm:px-6 lg:py-28">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <ShoppingBag className="h-6 w-6" />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                  Ready when you are
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl dark:text-white">
                  Your next great find is waiting.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Discover products, explore new possibilities, and experience
                  ecommerce the Shopora way.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/shop"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5"
                  >
                    Start shopping
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                  >
                    Contact Shopora
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

/* ================================================================
   HERO STAT
================================================================ */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl">
      <p className="text-xl font-black text-white">{value}</p>

      <p className="mt-1 text-[10px] font-medium text-slate-400">
        {label}
      </p>
    </div>
  );
}

/* ================================================================
   SECTION INTRO
================================================================ */

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl dark:text-white">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* ================================================================
   PREMIUM FEATURE
================================================================ */

function PremiumFeature({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
      }}
      className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/[0.04] sm:p-7 dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:border-blue-400/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
          {icon}
        </div>

        <span className="text-xs font-black text-slate-300 dark:text-slate-700">
          {number}
        </span>
      </div>

      <h3 className="mt-8 text-xl font-black tracking-tight text-slate-950 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.article>
  );
}

/* ================================================================
   VALUE CARD
================================================================ */

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 transition hover:bg-white/[0.07]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-bold">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}

/* ================================================================
   BIG STAT
================================================================ */

function BigStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="border-b border-r border-slate-100 p-6 last:border-r-0 sm:p-7 lg:border-b-0 dark:border-white/[0.06]">
      <div className="flex items-center gap-2 text-blue-500">
        {icon}

        <span className="text-xs font-semibold text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   PROMISE ITEM
================================================================ */

function PromiseItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-3">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
        <Check className="h-3 w-3 text-white" />
      </div>

      <span className="text-[11px] font-semibold text-blue-50">
        {text}
      </span>
    </div>
  );
}
