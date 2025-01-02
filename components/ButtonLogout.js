"use client";

import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  return (
    <button
      className="text-purple-600 hover:text-white border-2 border-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-semibold rounded-lg text-xl px-10 py-3 text-center me-2 mb-2 dark:border-purple-600 dark:text-purple-600 dark:hover:text-white dark:hover:bg-purple-400 dark:focus:ring-purple-900"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};

export default ButtonLogout;
