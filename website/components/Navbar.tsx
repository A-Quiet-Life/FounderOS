"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import GitHubLink from "./GitHubLink";

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
            <GitHubLink />
            <a
              href="/#waitlist"
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-orange-600 transition-colors font-medium"
            >
              Join Waitlist
            </a>
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
            <GitHubLink className="px-3 py-2 rounded-md hover:bg-zinc-800" />
            <a
              href="/#waitlist"
              className="block px-3 py-2 rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              onClick={() => setIsOpen(false)}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
