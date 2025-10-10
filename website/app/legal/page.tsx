"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/config/site";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function LegalPage() {
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
              Legal Disclaimer
            </h1>
            <p className="text-zinc-400 text-sm">
              Last Updated: October 10, 2025
            </p>
          </div>

          {/* Important Notice Banner */}
          <div className="bg-orange-900/20 border-2 border-orange-500/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle
                className="text-orange-500 flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="text-xl font-bold text-orange-400 mb-2">
                  Important Notice
                </h3>
                <p className="text-zinc-200 leading-relaxed">
                  <strong>{siteConfig.name} has not yet launched.</strong> This
                  website is currently accepting early-bird payments and
                  waitlist signups for a product that is still in development.
                  By making a payment or joining the waitlist, you acknowledge
                  and accept the terms outlined in this Legal Disclaimer.
                </p>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              1. Pre-Launch Status
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              {siteConfig.name} is currently in development and has not been
              officially launched. All features, functionality, pricing, and
              timelines presented on this website are preliminary and subject to
              change without notice.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              We are working diligently to bring {siteConfig.name} to market,
              but we cannot guarantee a specific launch date or that all
              described features will be available at launch.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              2. Payment and Refund Policy
            </h2>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 space-y-3">
              <p className="text-zinc-200 font-semibold text-lg">
                Full Refund Guarantee
              </p>
              <p className="text-zinc-300 leading-relaxed">
                <strong className="text-orange-400">
                  If {siteConfig.name} does not launch, all payments received
                  will be refunded in full.
                </strong>
              </p>
              <p className="text-zinc-300 leading-relaxed">
                We commit to providing full refunds to all customers who have
                made early-bird payments in the event that we decide not to
                proceed with the launch of {siteConfig.name}. Refunds will be
                processed to the original payment method within 30 business days
                of the cancellation announcement.
              </p>
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 space-y-3">
              <p className="text-zinc-200 font-semibold text-lg">
                30-Day Money Back Guarantee
              </p>
              <p className="text-zinc-300 leading-relaxed">
                <strong className="text-orange-400">
                  We offer a 30-day money back guarantee on all purchases.
                </strong>
              </p>
              <p className="text-zinc-300 leading-relaxed">
                If you're not satisfied with your purchase for any reason, you
                can request a full refund within 30 days of your payment date.
                Simply contact us at{" "}
                <a
                  href="mailto:evan@aquietlife.io"
                  className="text-orange-500 hover:text-orange-400"
                >
                  evan@aquietlife.io
                </a>{" "}
                and we'll process your refund promptly, no questions asked.
              </p>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              By making a payment, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
              <li>The product has not yet launched</li>
              <li>You are making an early-bird payment for future access</li>
              <li>The product features and timeline are subject to change</li>
              <li>
                You will receive a full refund if the product does not launch
              </li>
              <li>
                You can request a refund within 30 days of purchase for any
                reason
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              3. No Guarantee of Service
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              While we are committed to launching {siteConfig.name}, we make no
              guarantees regarding:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
              <li>The launch date of the product</li>
              <li>The specific features that will be available at launch</li>
              <li>The ongoing availability or uptime of the service</li>
              <li>Compatibility with specific tools or platforms</li>
              <li>Performance metrics or results</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              4. Changes to Product and Pricing
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect
              of {siteConfig.name} at any time, including but not limited to
              features, specifications, pricing, and availability. Any changes
              to the product or pricing will be communicated to early-bird
              customers via email.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Early-bird customers who have already made payments will be
              honored at their original payment tier, regardless of future price
              increases, provided the product launches.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              5. Intellectual Property
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              All content on this website, including but not limited to text,
              graphics, logos, images, and software, is the property of{" "}
              {siteConfig.name} or A Quiet Life and is protected by
              international copyright laws. Unauthorized use of any materials
              may violate copyright, trademark, and other laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              6. Limitation of Liability
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              To the maximum extent permitted by law, {siteConfig.name} and A
              Quiet Life shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly, or
              any loss of data, use, goodwill, or other intangible losses
              resulting from:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
              <li>Your use or inability to use the service</li>
              <li>Any delay or failure to launch the product</li>
              <li>
                Any changes or discontinuation of features or functionality
              </li>
              <li>Any unauthorized access to or alteration of your data</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              7. Indemnification
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              You agree to defend, indemnify, and hold harmless{" "}
              {siteConfig.name}, A Quiet Life, and their respective officers,
              directors, employees, and agents from and against any claims,
              liabilities, damages, losses, and expenses arising out of or in
              any way connected with your access to or use of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              8. Communication and Updates
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              By joining the waitlist or making a payment, you agree to receive
              email communications from {siteConfig.name} regarding product
              updates, launch announcements, and important notices. You may
              unsubscribe from marketing communications at any time, but you
              will continue to receive transactional emails related to your
              account or payment.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              9. Governing Law
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              This Legal Disclaimer and your use of {siteConfig.name} shall be
              governed by and construed in accordance with applicable laws. Any
              disputes arising from this disclaimer or your use of the service
              shall be resolved through binding arbitration.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              10. Changes to This Disclaimer
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              We reserve the right to update or modify this Legal Disclaimer at
              any time. Any changes will be posted on this page with an updated
              "Last Updated" date. We encourage you to review this page
              periodically for any changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-100">
              11. Contact Information
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              If you have any questions, concerns, or requests regarding this
              Legal Disclaimer, refund policy, or the status of{" "}
              {siteConfig.name}, please contact us at:
            </p>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
              <p className="text-zinc-200">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:evan@aquietlife.io"
                  className="text-orange-500 hover:text-orange-400"
                >
                  evan@aquietlife.io
                </a>
              </p>
              <p className="text-zinc-200 mt-2">
                <strong>Company:</strong> A Quiet Life
              </p>
            </div>
          </section>

          {/* Final Acknowledgment */}
          <div className="bg-zinc-800/50 border-2 border-zinc-700 rounded-lg p-6 mt-8">
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-zinc-100">
                By using this website, making a payment, or joining the
                waitlist, you acknowledge that you have read, understood, and
                agree to be bound by this Legal Disclaimer.
              </strong>
            </p>
          </div>
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
