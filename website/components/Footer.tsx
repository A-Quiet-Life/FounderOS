import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-500 py-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-left">
            <p className="text-sm">
              © 2025 {siteConfig.name}.{" "}
              <span className="text-orange-500 font-semibold">
                A Quiet Life
              </span>{" "}
              product.
            </p>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/terms"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/legal"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
