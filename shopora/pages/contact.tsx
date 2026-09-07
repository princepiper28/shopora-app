// pages/contact.tsx

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSending(true);

    // Demo submission
    setTimeout(() => {
      setIsSending(false);
      setSent(true);

      setName("");
      setEmail("");
      setSubject("General Inquiry");
      setMessage("");

      setTimeout(() => {
        setSent(false);
      }, 5000);
    }, 1200);
  }

  return (
    <>
      <Head>
        <title>Contact Us — Shopora</title>

        <meta
          name="description"
          content="Get in touch with Shopora. Our support team is here to help with orders, products, deliveries, payments, and more."
        />

        <meta name="theme-color" content="#060914" />
      </Head>

      <main className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-[#060914] dark:text-white">
        {/* =========================================================
            BACKGROUND
        ========================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Blue glow */}
          <motion.div
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-500/15 blur-[110px] dark:bg-blue-500/20"
          />

          {/* Indigo glow */}
          <motion.div
            animate={{
              x: [0, -50, 30, 0],
              y: [0, 40, -20, 0],
              scale: [1, 0.95, 1.08, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[-120px] top-[15%] h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[120px] dark:bg-indigo-500/20"
          />

          {/* Cyan glow */}
          <motion.div
            animate={{
              y: [0, 30, -20, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-180px] left-[30%] h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[120px]"
          />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(100,116,139,0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100,116,139,0.8) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.04)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_25%,rgba(2,6,23,0.65)_100%)]" />
        </div>

        {/* =========================================================
            CONTENT
        ========================================================= */}

        <div className="relative z-10">
          {/* =======================================================
              HERO
          ======================================================= */}

          <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
              {/* LEFT */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
               {/* Brand */}
               <Link
                 href="/"
                 className="mb-12 inline-flex items-center gap-4"
              >
              <div className="relative h-16 w-16 overflow-hidden rounded-[1.25rem] shadow-xl shadow-blue-500/10 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/branding/shopora-logo.png"
                  alt="Shopora logo"
                  fill
                  priority
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <span className="text-3xl font-black tracking-[-0.055em] text-slate-950 dark:text-white">
                shopora
              </span>
            </Link>

            {/* Badge — deliberately separated from the logo */}
            <div className="mb-7 block">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                <Sparkles className="h-4 w-4" />
                We&apos;re here to help
              </div>
            </div>

            <h1 className="max-w-3xl text-5xl font-black tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
              Let&apos;s talk.
              <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                We&apos;re listening.
              </span>
            </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                  Have a question about an order, product, delivery, payment,
                  or anything else? Reach out to the Shopora team and we&apos;ll
                  help you get it sorted.
                </p>

                {/* Trust points */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <TrustPoint text="Fast response" />
                  <TrustPoint text="Friendly support" />
                  <TrustPoint text="Secure communication" />
                </div>
              </motion.div>

              {/* RIGHT — floating support visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative hidden lg:block"
              >
                <div className="relative mx-auto aspect-square max-w-[470px]">
                  {/* Outer glow */}
                  <div className="absolute inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl dark:bg-blue-500/20" />

                  {/* Main card */}
                  <div className="absolute inset-8 rounded-[3rem] border border-slate-200 bg-white/80 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/30">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/20">
                          <MessageCircle className="h-7 w-7" />
                        </div>

                        <h2 className="mt-7 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                          Need a hand?
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                          Our support team is ready to help you make the most
                          out of your Shopora experience.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <SupportMiniCard
                          icon={<Clock3 className="h-5 w-5" />}
                          title="Quick responses"
                          text="Usually within 24 hours"
                        />

                        <SupportMiniCard
                          icon={<ShieldCheck className="h-5 w-5" />}
                          title="Your privacy matters"
                          text="Your information stays protected"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating card 1 */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-0 top-12 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-950 dark:text-white">
                          Support online
                        </p>
                        <p className="text-[11px] text-slate-500">
                          We&apos;re ready to help
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating card 2 */}
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-10 left-0 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                        <Mail className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-950 dark:text-white">
                          Email support
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Always open
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* =======================================================
              CONTACT OPTIONS
          ======================================================= */}

          <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                title="Email us"
                text="support@shopora.com"
                href="mailto:support@shopora.com"
              />

              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                title="Call us"
                text="+234 800 SHOPORA"
                href="tel:+234800746672"
              />

              <ContactCard
                icon={<MessageCircle className="h-5 w-5" />}
                title="Live support"
                text="Chat with our team"
                href="#contact-form"
              />

              <ContactCard
                icon={<MapPin className="h-5 w-5" />}
                title="Our office"
                text="Lagos, Nigeria"
                href="#contact-form"
              />
            </div>
          </section>

          {/* =======================================================
              MAIN CONTACT AREA
          ======================================================= */}

          <section
            id="contact-form"
            className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-24 sm:px-6 lg:px-8"
          >
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              {/* INFO PANEL */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-9 dark:border-white/10 dark:bg-white/[0.035]"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-500">
                  Customer care
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                  We care about your experience.
                </h2>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                  Whether something went wrong or you simply need some
                  guidance, our team is here to make things easier.
                </p>

                <div className="mt-8 space-y-5">
                  <InfoRow
                    icon={<Clock3 className="h-5 w-5" />}
                    title="Response time"
                    text="Most messages receive a response within 24 hours."
                  />

                  <InfoRow
                    icon={<ShieldCheck className="h-5 w-5" />}
                    title="Secure & private"
                    text="Your personal information is handled securely."
                  />

                  <InfoRow
                    icon={<MessageCircle className="h-5 w-5" />}
                    title="Real people"
                    text="Your message goes to the Shopora support team."
                  />
                </div>

                {/* FAQ CTA */}
                <div className="mt-9 rounded-2xl border border-blue-200 bg-white p-5 dark:border-blue-400/10 dark:bg-blue-500/[0.06]">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    Looking for a quick answer?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Check our frequently asked questions before sending a
                    message.
                  </p>

                  <Link
                    href="/faq"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400"
                  >
                    Visit Help Center
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              {/* FORM */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/5 sm:p-9 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20"
              >
                {/* Form glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative">
                  <div className="mb-8">
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-500">
                      Send a message
                    </span>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                      How can we help?
                    </h2>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                      Tell us what&apos;s on your mind and we&apos;ll get back to
                      you.
                    </p>
                  </div>

                  {/* Success state */}
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                      <div>
                        <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                          Message sent successfully.
                        </p>

                        <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-400/70">
                          Thanks for reaching out. Our team will get back to
                          you soon.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={submit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Your name"
                        htmlFor="name"
                        required
                      >
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className={inputClasses}
                        />
                      </Field>

                      <Field
                        label="Email address"
                        htmlFor="email"
                        required
                      >
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className={inputClasses}
                        />
                      </Field>
                    </div>

                    {/* Subject */}
                    <Field
                      label="What can we help with?"
                      htmlFor="subject"
                      required
                    >
                      <select
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className={inputClasses}
                      >
                        <option>General Inquiry</option>
                        <option>Order Support</option>
                        <option>Delivery & Shipping</option>
                        <option>Product Question</option>
                        <option>Payment Issue</option>
                        <option>Returns & Refunds</option>
                        <option>Account Support</option>
                        <option>Business Inquiry</option>
                      </select>
                    </Field>

                    {/* Message */}
                    <Field
                      label="Your message"
                      htmlFor="message"
                      required
                    >
                      <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how we can help..."
                        required
                        rows={7}
                        className={`${inputClasses} resize-none`}
                      />
                    </Field>

                    {/* Privacy */}
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.025]">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                      <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Your information is used only to respond to your
                        request. We respect your privacy and never sell your
                        personal information.
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 px-6 py-4 font-semibold text-white shadow-xl shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSending ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </section>

          {/* =======================================================
              BOTTOM CTA
          ======================================================= */}

          <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-8 text-white sm:p-12"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                    Shopora support
                  </p>

                  <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Great shopping experiences start with great support.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                    We&apos;re always looking for ways to make Shopora better
                    for you.
                  </p>
                </div>

                <Link
                  href="/"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </>
  );
}

/* ===============================================================
   COMPONENTS
=============================================================== */

function TrustPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
      <CheckCircle2 className="h-4 w-4 text-blue-500" />
      {text}
    </div>
  );
}

function SupportMiniCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-950 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
            {text}
          </p>
        </div>
      </div>
    </a>
  );
}

function InfoRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-950 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
      >
        {label}

        {required && (
          <span className="ml-1 text-blue-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

/* ===============================================================
   STYLES
=============================================================== */

const inputClasses =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:bg-white/[0.06]";

/* ===============================================================
   LAYOUT
=============================================================== */

ContactPage.getLayout = function getLayout(page: ReactNode) {
  return page;
};

export default ContactPage;
