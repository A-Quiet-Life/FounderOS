"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CheckCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here you can verify the session with your backend if needed
    if (sessionId) {
      // Simulate verification
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loader2 className="animate-spin text-orange-500" size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl shadow-xl p-12 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500" size={64} />
          </div>

          <h1 className="text-3xl font-bold text-zinc-100 mb-4">
            Payment Successful!
          </h1>

          <p className="text-xl text-zinc-300 mb-8">
            Thank you for your early-bird purchase. We'll notify you as soon as{" "}
            {siteConfig.name} launches!
          </p>

          {sessionId && (
            <p className="text-sm text-zinc-500 mb-8">
              Session ID: {sessionId}
            </p>
          )}

          <div className="space-y-4">
            <p className="text-zinc-400">
              You'll receive a confirmation email shortly with all the details.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/demo"
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all"
              >
                Try Demo
              </Link>
              <Link
                href="/"
                className="bg-zinc-800 text-zinc-100 px-6 py-3 rounded-lg font-semibold border-2 border-zinc-700 hover:border-orange-500 hover:bg-zinc-700 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-400">
            Need help? Contact us at{" "}
            <a
              href="mailto:evan@aquietlife.io"
              className="text-orange-500 hover:text-orange-400"
            >
              evan@aquietlife.io
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-zinc-500 py-8 border-t border-zinc-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-left">
              <p className="text-sm">
                © 2025 {siteConfig.name}. A{" "}
                <span className="text-orange-500 font-semibold">
                  Quiet Life
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
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950">
          <Navbar />
          <div className="flex items-center justify-center min-h-[80vh]">
            <Loader2 className="animate-spin text-orange-500" size={48} />
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
