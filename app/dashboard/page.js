"use client";

import ButtonLogout from "@/components/ButtonLogout";
// import FlightSearchForm from "@/components/FlightSerchForm";
import SearchForm from "@/components/flights/SearchForm";
import Link from "next/link";
import { Plane } from "lucide-react";

export default function Dashboard() {
  return (
    // <main>
    //   <h1>Dashboard</h1>
    //   {/* <FlightSearchForm /> */}
    //   <SearchForm />
    //   <ButtonLogout />
    // </main>

    <main className="min-h-screen bg-[#1F2937] relative overflow-hidden flex flex-col">
      {/* Background gradient splash */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#1F2937] opacity-90 z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(147,51,234,0.3),_transparent_40%),radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.3),_transparent_40%),radial-gradient(circle_at_50%_50%,_rgba(251,146,60,0.3),_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(147,51,234,0.3),_transparent_40%)] blur-3xl opacity-70"></div>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-[#1F2937]/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Plane
              className="text-purple-600 dark:text-pink-400 animate-bounce mr-2"
              size={28}
            />
            <Link
              href="/"
              className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              AeroTrekker
            </Link>
          </div>

          {/* Button on the right */}
          <div>
            <ButtonLogout />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 ">
        <SearchForm />
      </section>
    </main>
  );
}
