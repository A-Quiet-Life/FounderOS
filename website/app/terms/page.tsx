"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/config/site";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-orange-500 hover:text-orange-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <div className="bg-zinc-900 border-2 border-zinc-800 rounded-xl p-8 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-zinc-100 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-zinc-400 text-sm">
              Last Updated: October 10, 2025
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              1. Acceptance of Terms
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              By accessing and using {siteConfig.name} ("the Service"), you
              accept and agree to be bound by the terms and provisions of this
              agreement. If you do not agree to these terms, please do not use
              the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              2. Pre-Launch Status
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              {siteConfig.name} is currently in a pre-launch state and has not
              yet been released to the public. All features, pricing, and
              services described on this website are subject to change. Please
              see our{" "}
              <Link
                href="/legal"
                className="text-orange-500 hover:text-orange-400"
              >
                Legal Disclaimer
              </Link>{" "}
              for important information regarding payments and refunds.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              3. Use License
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Upon launch, permission will be granted access the Service for
              personal, non-commercial use only. This is the grant of a license,
              not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                in the Service
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
              <li>
                Transfer the materials to another person or "mirror" the
                materials on any other server
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              4. Disclaimer
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              The materials on {siteConfig.name}'s website are provided on an
              'as is' basis. {siteConfig.name} makes no warranties, expressed or
              implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              5. Limitations
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              In no event shall {siteConfig.name} or its suppliers be liable for
              any damages (including, without limitation, damages for loss of
              data or profit, or due to business interruption) arising out of
              the use or inability to use the Service, even if {siteConfig.name}{" "}
              or a {siteConfig.name} authorized representative has been notified
              orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              6. Account Terms
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              You are responsible for maintaining the security of your account
              and password. {siteConfig.name} cannot and will not be liable for
              any loss or damage from your failure to comply with this security
              obligation.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              You are responsible for all content posted and activity that
              occurs under your account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              7. Payment Terms
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Any payments made during the pre-launch period are subject to the
              refund policy outlined in our{" "}
              <Link
                href="/legal"
                className="text-orange-500 hover:text-orange-400"
              >
                Legal Disclaimer
              </Link>
              . By making a payment, you acknowledge that the Service has not
              yet launched and agree to the terms stated therein.
            </p>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 mt-4">
              <p className="text-zinc-200 font-semibold mb-3">
                30-Day Money Back Guarantee
              </p>
              <p className="text-zinc-300 leading-relaxed">
                We stand behind our product with a 30-day money back guarantee.
                If you're not completely satisfied with your purchase for any
                reason, you may request a full refund within 30 days of your
                payment date. Contact us at{" "}
                <a
                  href="mailto:evan@aquietlife.io"
                  className="text-orange-500 hover:text-orange-400"
                >
                  evan@aquietlife.io
                </a>{" "}
                to initiate a refund.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              8. Modifications to Terms
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              {siteConfig.name} may revise these terms of service at any time
              without notice. By using this Service, you are agreeing to be
              bound by the then-current version of these terms of service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">9. Privacy</h2>
            <p className="text-zinc-300 leading-relaxed">
              Your use of {siteConfig.name} is also governed by our Privacy
              Policy. We respect your privacy and are committed to protecting
              your personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              10. Contact Information
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us at:{" "}
              <a
                href="mailto:evan@aquietlife.io"
                className="text-orange-500 hover:text-orange-400"
              >
                evan@aquietlife.io
              </a>
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-zinc-500 py-8 border-t border-zinc-900">
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
