import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);

  return (
    <div className="relative grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-retro bg-gradient-to-b from-yellow-200 via-red-200 to-pink-200 animate-fade-in">
      <header className="row-start-1 flex flex-col items-center mt-16 sm:mt-0">
        <Image
          className="dark:invert animate-bounce"
          src="/next.svg"
          alt="App logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-5xl font-bold mt-4 text-shadow-md text-center text-blue-900 animate-slide-in">
          Welcome to MovieGroup
        </h1>
        <p className="text-lg mt-2 text-center max-w-md text-blue-800 animate-fade-in">
          Create groups with your friends and find movies you all love!
        </p>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {user ? (
            <>
              <a
                className="rounded-full border-2 border-blue-900 transition-colors flex items-center justify-center bg-yellow-300 text-blue-900 gap-2 hover:bg-yellow-400 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 shadow-lg transform hover:scale-105 transition-transform duration-300"
                href="/create-group"
              >
                Create a Group
              </a>
              <a
                className="rounded-full border-2 border-blue-900 transition-colors flex items-center justify-center bg-yellow-300 text-blue-900 hover:bg-yellow-400 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 shadow-lg transform hover:scale-105 transition-transform duration-300"
                href="/find-movies"
              >
                Find Movies
              </a>
            </>
          ) : (
            <Link
              className="mt-4 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full px-6 py-3 shadow-lg transform hover:scale-105 transition-transform duration-300"
              href="/api/auth/login"
            >
              Login to get started
            </Link>
          )}
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-blue-900 transform hover:scale-105 transition-transform duration-300"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-blue-900 transform hover:scale-105 transition-transform duration-300"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-blue-900 transform hover:scale-105 transition-transform duration-300"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
