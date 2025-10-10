"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Menu, X, Mail } from "lucide-react";
import Image from "next/image";
import GitHubLink from "./GitHubLink";

// Custom Twitter/X Icon Component
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      stroke="none"
      fill="currentColor"
    />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <span className="flex text-xl justify-center font-bold text-zinc-100">
              <span className="mr-2">
                <Image src="/logo.svg" alt="FounderOS" width={24} height={24} />
              </span>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/demo"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Demo
            </Link>
            <Link
              href={siteConfig.nav.pricing}
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="mailto:evan@aquietlife.io"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Mail size={18} />
            </Link>
            <GitHubLink />
            <Link
              href="/#waitlist"
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-orange-600 transition-colors font-medium"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800/50 bg-zinc-900/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/demo"
              className="block px-3 py-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              onClick={() => setIsOpen(false)}
            >
              Demo
            </Link>
            <Link
              href={siteConfig.nav.pricing}
              className="block px-3 py-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="mailto:evan@aquietlife.io"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              onClick={() => setIsOpen(false)}
            >
              <Mail size={18} />
            </Link>
            <GitHubLink className="px-3 py-2 rounded-md hover:bg-zinc-800" />

            <Link
              href="/#waitlist"
              className="block px-3 py-2 rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              onClick={() => setIsOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
