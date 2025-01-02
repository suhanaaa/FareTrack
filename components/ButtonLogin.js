"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

const ButtonLogin = ({ session }) => {
  return session ? (
    <Link
      href="/dashboard"
      className="px-10 py-3 rounded-xl bg-purple-600 text-white border-0 hover:shadow-xl hover:-translate-y-1"
    >
      Welcome back {session.user.name || "friend"}
    </Link>
  ) : (
    <button
      onClick={() => signIn("undefined", { callbackUrl: "/dashboard" })}
      className="px-10 py-3 rounded-xl bg-purple-600 text-white border-0 hover:shadow-xl hover:-translate-y-1"
    >
      Get Started
    </button>
  );
};

export default ButtonLogin;
