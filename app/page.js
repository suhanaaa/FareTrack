import ButtonLogin from "@/components/ButtonLogin";
import { auth } from "@/auth";
import { Plane } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
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
            <ButtonLogin
              session={session}
              extraStyle="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90"
            />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-300">
            Discover Your Next Adventure with{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              AeroTrekker
            </span>
          </h1>
          <div className="text-xl mb-8 text-gray-400">
            Uncover the best flight deals and embark on unforgettable journeys
            across the globe. Discover hidden gems, experience diverse cultures,
            and create memories that last a lifetime. Let your travel dreams
            take flight with unbeatable offers tailored just for you.
          </div>
          <ButtonLogin
            session={session}
            extraStyle="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90 px-8 py-3 text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          />
        </div>
      </section>
    </main>
  );
}
