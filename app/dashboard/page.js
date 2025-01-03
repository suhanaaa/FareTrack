"use client";

import ButtonLogout from "@/components/ButtonLogout";
// import FlightSearchForm from "@/components/FlightSerchForm";
import SearchForm from "@/components/flights/SearchForm";
import Link from "next/link";
import { Plane } from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Plane
                className="text-purple-500 animate-bounce mr-2"
                size={28}
              />
              <Link
                href="/"
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent"
              >
                AeroTrekker
              </Link>
            </div>
            <ButtonLogout />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <SearchForm />
        </div>
      </div>
    </main>
  );
}
