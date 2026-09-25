// pages/api/auth/register.ts

import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

type ResponseData =
  | { ok: true }
  | { ok: false; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ ok: false, message: "Method not allowed." });
  }

  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  /* =============================================================
     VALIDATION

     Keep this in sync with whatever the register.tsx form already
     enforces client-side (minLength={6} on password, required on
     all three) — client-side validation is a UX nicety, never a
     security boundary, so the API has to re-check everything.
  ============================================================= */

  if (!name || !email || !password) {
    return res.status(400).json({
      ok: false,
      message: "Name, email, and password are all required.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res
      .status(400)
      .json({ ok: false, message: "Enter a valid email address." });
  }

  if (password.length < 6) {
    return res.status(400).json({
      ok: false,
      message: "Password must be at least 6 characters.",
    });
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return res.status(409).json({
        ok: false,
        message: "An account with this email already exists.",
      });
    }

    // 10 salt rounds is a reasonable default — high enough to be
    // slow for brute-force attempts, low enough not to noticeably
    // slow down registration.
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: name.trim(),
        passwordHash,
      },
    });

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Registration failed:", err);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again.",
    });
  }
}