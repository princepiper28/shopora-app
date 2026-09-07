// pages/login.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

/* ===============================================================
   LOGIN PAGE
================================================================ */

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* =============================================================
     LOGIN SUBMIT
  ============================================================= */

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    /*
     * Replace this with your real authentication logic.
     *
     * Example:
     *
     * await signIn(email, password);
     */

    setTimeout(() => {
      setIsLoading(false);
      alert(`Logging in as ${email}`);
    }, 1200);
  }

  return (
    <>
      {/* =========================================================
          PAGE HEAD
      ========================================================== */}

      <Head>
        <title>Login — Shopora</title>

        <meta
          name="description"
          content="Sign in to your Shopora account and continue shopping."
        />

        <meta
          name="theme-color"
          content="#060914"
        />

        <meta
          name="color-scheme"
          content="dark"
        />
      </Head>

      {/* =========================================================
          PAGE
      ========================================================== */}

      <main className="relative min-h-screen overflow-hidden bg-[#060914] text-white">
        {/* =======================================================
            BACKGROUND LIGHTING
        ======================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* -----------------------------------------------------
              MAIN BLUE GLOW
          ------------------------------------------------------ */}

          <motion.div
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 25, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[120px]"
          />

          {/* -----------------------------------------------------
              PURPLE GLOW
          ------------------------------------------------------ */}

          <motion.div
            animate={{
              x: [0, -35, 20, 0],
              y: [0, 35, -20, 0],
              scale: [1, 0.95, 1.08, 1],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[-180px] top-[15%] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[140px]"
          />

          {/* -----------------------------------------------------
              BOTTOM CYAN GLOW
          ------------------------------------------------------ */}

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-280px] left-[25%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[130px]"
          />

          {/* -----------------------------------------------------
              RADIAL LIGHTING
          ------------------------------------------------------ */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.12),transparent_32%)]" />

          {/* -----------------------------------------------------
              GRID TEXTURE
          ------------------------------------------------------ */}

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />

          {/* -----------------------------------------------------
              TOP VIGNETTE
          ------------------------------------------------------ */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.28)_100%)]" />
        </div>

        {/* =======================================================
            SHOPORA LOGO — TOP LEFT
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
            y: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-5 top-5 z-30 sm:left-8 sm:top-8 lg:left-10 lg:top-8"
        >
          <Link
            href="/"
            aria-label="Shopora home"
            className="group flex items-center gap-3"
          >
            {/* REAL SHOPORA LOGO */}

            <div className="relative h-11 w-11 overflow-hidden rounded-2xl shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/branding/shopora-logo.png"
                alt="Shopora logo"
                fill
                priority
                sizes="44px"
                className="object-cover"
              />
            </div>

            {/* BRAND NAME */}

            <span className="hidden text-xl font-bold tracking-[-0.04em] text-white sm:block">
              shopora
            </span>
          </Link>
        </motion.div>

        {/* =======================================================
            PAGE CONTENT
        ======================================================== */}

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px]">
          <div className="grid min-h-screen w-full lg:grid-cols-[1.05fr_0.95fr]">
            {/* ===================================================
                LEFT — BRAND EXPERIENCE
            ==================================================== */}

            <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
              {/* -------------------------------------------------
                  DECORATIVE CIRCLE
              -------------------------------------------------- */}

              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
                className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full border border-white/10 bg-white/[0.02]"
              />

              {/* -------------------------------------------------
                  SECONDARY CIRCLE
              -------------------------------------------------- */}

              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
                className="absolute bottom-[15%] right-[5%] h-56 w-56 rounded-full border border-blue-400/10"
              />

              {/* -------------------------------------------------
                  MAIN CONTENT
              -------------------------------------------------- */}

              <div className="relative z-10 mt-24 max-w-xl">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* WELCOME BADGE */}

                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
                    <Sparkles
                      className="h-4 w-4 text-blue-400"
                      aria-hidden="true"
                    />

                    <span>Welcome back to Shopora</span>
                  </div>

                  {/* HEADLINE */}

                  <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-white xl:text-7xl">
                    Everything you want.

                    <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">
                      One beautiful place.
                    </span>
                  </h1>

                  {/* DESCRIPTION */}

                  <p className="mt-7 max-w-lg text-base leading-7 text-white/50 xl:text-lg">
                    Discover products you love, explore brands you trust,
                    and enjoy a shopping experience designed around you.
                  </p>
                </motion.div>

                {/* -------------------------------------------------
                    STATS
                -------------------------------------------------- */}

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
                    delay: 0.4,
                  }}
                  className="mt-10 flex flex-wrap gap-3"
                >
                  {[
                    "10K+ Products",
                    "50+ Brands",
                    "24H Delivery",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm text-white/60 backdrop-blur-xl"
                    >
                      {item}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* -------------------------------------------------
                  TRUST MESSAGE
              -------------------------------------------------- */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                }}
                className="relative z-10 flex items-center gap-3 text-sm text-white/40"
              >
                <ShieldCheck
                  className="h-5 w-5 text-blue-400/80"
                  aria-hidden="true"
                />

                <span>
                  Your account and shopping experience are protected.
                </span>
              </motion.div>
            </section>

            {/* ===================================================
                RIGHT — LOGIN
            ==================================================== */}

            <section className="relative flex min-h-screen items-center justify-center px-5 py-28 sm:px-8 lg:px-12 xl:px-20">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full max-w-[480px]"
              >
                {/* =================================================
                    LOGIN CARD
                ================================================== */}

                <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.055] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8 xl:p-10">
                  {/* CARD GLOW */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/10 blur-[70px]"
                  />

                  {/* CARD TOP HIGHLIGHT */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  <div className="relative">
                    {/* =================================================
                        HEADING
                    ================================================== */}

                    <div className="mb-8">
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.35,
                        }}
                      >
                        <p className="mb-3 text-sm font-medium tracking-[0.18em] text-blue-400">
                          SIGN IN
                        </p>

                        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                          Welcome back
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-white/45">
                          Sign in to continue your Shopora journey.
                        </p>
                      </motion.div>
                    </div>

                    {/* =================================================
                        FORM
                    ================================================== */}

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* =================================================
                          EMAIL
                      ================================================== */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.4,
                        }}
                      >
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-white/70"
                        >
                          Email address
                        </label>

                        <div className="group relative">
                          <Mail
                            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-blue-400"
                            aria-hidden="true"
                          />

                          <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            inputMode="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                              setEmail(e.target.value)
                            }
                            className="h-14 w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/25 hover:border-white/15 focus:border-blue-400/60 focus:bg-black/30 focus:ring-4 focus:ring-blue-500/10"
                            required
                          />
                        </div>
                      </motion.div>

                      {/* =================================================
                          PASSWORD
                      ================================================== */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.46,
                        }}
                      >
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <label
                            htmlFor="password"
                            className="text-sm font-medium text-white/70"
                          >
                            Password
                          </label>

                          <Link
                            href="/forgot-password"
                            className="text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
                          >
                            Forgot password?
                          </Link>
                        </div>

                        <div className="group relative">
                          <LockKeyhole
                            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-blue-400"
                            aria-hidden="true"
                          />

                          <input
                            id="password"
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                            name="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                              setPassword(e.target.value)
                            }
                            className="h-14 w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-white/25 hover:border-white/15 focus:border-blue-400/60 focus:bg-black/30 focus:ring-4 focus:ring-blue-500/10"
                            required
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(
                                (prev) => !prev
                              )
                            }
                            aria-label={
                              showPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                          >
                            {showPassword ? (
                              <EyeOff
                                className="h-[18px] w-[18px]"
                                aria-hidden="true"
                              />
                            ) : (
                              <Eye
                                className="h-[18px] w-[18px]"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        </div>
                      </motion.div>

                      {/* =================================================
                          REMEMBER ME
                      ================================================== */}

                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          delay: 0.52,
                        }}
                        className="flex items-center"
                      >
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-white/45">
                          <input
                            type="checkbox"
                            name="remember"
                            checked={rememberMe}
                            onChange={(e) =>
                              setRememberMe(
                                e.target.checked
                              )
                            }
                            className="peer sr-only"
                          />

                          <span className="flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-black/20 transition-all peer-checked:border-blue-400 peer-checked:bg-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400/40">
                            {rememberMe && (
                              <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                className="h-3.5 w-3.5 text-white"
                                aria-hidden="true"
                              >
                                <path
                                  d="M4 10.5L8 14L16 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>

                          Remember me
                        </label>
                      </motion.div>

                      {/* =================================================
                          LOGIN BUTTON
                      ================================================== */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.58,
                        }}
                      >
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white font-semibold text-slate-950 shadow-[0_10px_35px_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(59,130,246,0.2)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {/* LIGHT SWEEP */}

                          <span
                            aria-hidden="true"
                            className="absolute inset-y-0 -left-20 w-20 rotate-12 bg-white/40 blur-xl transition-all duration-700 group-hover:left-[120%]"
                          />

                          {/* BUTTON CONTENT */}

                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950"
                                />

                                <span>
                                  Signing in...
                                </span>
                              </>
                            ) : (
                              <>
                                <span>
                                  Sign in
                                </span>

                                <ArrowRight
                                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </span>
                        </button>
                      </motion.div>
                    </form>

                    {/* =================================================
                        DIVIDER
                    ================================================== */}

                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.65,
                      }}
                      className="my-7 flex items-center gap-4"
                    >
                      <div
                        aria-hidden="true"
                        className="h-px flex-1 bg-white/[0.08]"
                      />

                      <span className="whitespace-nowrap text-[10px] tracking-[0.12em] text-white/25">
                        OR CONTINUE WITH
                      </span>

                      <div
                        aria-hidden="true"
                        className="h-px flex-1 bg-white/[0.08]"
                      />
                    </motion.div>

                    {/* =================================================
                        SOCIAL LOGIN
                    ================================================== */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.7,
                      }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {/* GOOGLE */}

                      <button
                        type="button"
                        aria-label="Continue with Google"
                        className="flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                      >
                        <GoogleIcon />

                        <span>Google</span>
                      </button>

                      {/* APPLE */}

                      <button
                        type="button"
                        aria-label="Continue with Apple"
                        className="flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                      >
                        <AppleIcon />

                        <span>Apple</span>
                      </button>
                    </motion.div>

                    {/* =================================================
                        REGISTER
                    ================================================== */}

                    <motion.p
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.75,
                      }}
                      className="mt-8 text-center text-sm text-white/40"
                    >
                      Don&apos;t have an account?{" "}

                      <Link
                        href="/register"
                        className="font-semibold text-white transition-colors hover:text-blue-400"
                      >
                        Create one
                      </Link>
                    </motion.p>
                  </div>
                </div>

                {/* =================================================
                    SECURITY MESSAGE
                ================================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.9,
                  }}
                  className="mt-6 flex items-center justify-center gap-2 text-xs text-white/25"
                >
                  <ShieldCheck
                    className="h-4 w-4"
                    aria-hidden="true"
                  />

                  <span>
                    Secure authentication powered by Shopora
                  </span>
                </motion.div>
              </motion.div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

/* ===============================================================
   CUSTOM LAYOUT
================================================================ */

/**
 * Login intentionally bypasses the normal Shopora Layout.
 *
 * This means:
 *
 * Login
 *   ├── NO Header
 *   ├── NO Footer
 *   └── Full-screen authentication experience
 */
LoginPage.getLayout = function getLayout(page: ReactNode) {
  return page;
};

/* ===============================================================
   EXPORT
================================================================ */

export default LoginPage;

/* ===============================================================
   GOOGLE ICON
================================================================ */

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.24Z"
      />

      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5Z"
      />

      <path
        fill="#FBBC05"
        d="M6.54 13.6a5.86 5.86 0 0 1 0-3.74V7.34H3.3a9.5 9.5 0 0 0 0 8.78l3.24-2.52Z"
      />

      <path
        fill="#EA4335"
        d="M12 5.83c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 2.92 14.63 2 12 2a9.74 9.74 0 0 0-8.7 5.34l3.24 2.52C7.31 7.55 9.46 5.83 12 5.83Z"
      />
    </svg>
  );
}

/* ===============================================================
   APPLE ICON
================================================================ */

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] fill-current"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.09.8 1.19-.24 2.33-.93 3.6-.84 1.53.12 2.68.73 3.45 1.8-3.15 1.89-2.4 6.05.49 7.21-.58 1.53-1.33 3.04-2.63 4.01ZM12.03 7.25C11.88 4.97 13.73 3.1 15.87 2.95c.3 2.62-2.38 4.57-3.84 4.3Z" />
    </svg>
  );
}
