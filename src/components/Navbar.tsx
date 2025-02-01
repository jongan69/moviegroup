"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { SignupButton } from "@/components/SignupButton";
import { LoginButton } from "@/components/LoginButton";
import { LogoutButton } from "@/components/LogoutButton";
import React, { useState } from "react";
import Link from "next/link";

// Extracted menu links to a constant
const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/groups", label: "Groups" },
  { href: "/find-movies", label: "Find Movies" },
];

const NavBar = () => {
  const { user, isLoading } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg z-50">
      <div className="py-4 flex w-full justify-between items-center bg-gray-800 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-44">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Mobile menu toggle button with aria-label for accessibility */}
          <button
            className="text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* Conditionally render links based on screen size */}
          <div className="hidden md:flex gap-4 md:gap-6 lg:gap-8 items-center">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-200 hover:text-blue-300 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {!user && !isLoading ? (
            <>
              <SignupButton />
              <LoginButton />
            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-start px-4 pb-4">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-200 hover:text-blue-300 transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;