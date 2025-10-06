"use client";

import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="relative">
        {/* iPhone Frame */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] p-3 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>

          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-white z-10 flex items-center justify-between px-8 pt-2">
              <span className="text-xs font-semibold">9:41</span>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 10"
                >
                  <rect x="0" y="3" width="4" height="7" rx="1" />
                  <rect x="6" y="1" width="4" height="9" rx="1" />
                  <rect x="12" y="0" width="4" height="10" rx="1" />
                </svg>
                <svg
                  className="w-4 h-3"
                  fill="currentColor"
                  viewBox="0 0 16 12"
                >
                  <path d="M8 0C5.79 0 3.84 1.11 2.75 2.75L0 5l1 1 2.25-2.25C4.41 2.63 6.09 2 8 2s3.59.63 4.75 1.75L15 6l1-1-2.75-2.75C12.16 1.11 10.21 0 8 0z" />
                  <circle cx="8" cy="9" r="3" />
                </svg>
                <svg
                  className="w-6 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 12"
                >
                  <rect
                    x="0"
                    y="0"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <rect x="19" y="4" width="3" height="4" rx="1" />
                  <rect
                    x="2"
                    y="2"
                    width="14"
                    height="8"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="w-full h-full overflow-y-auto pt-12">
              {children}
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-50"></div>
      </div>
    </div>
  );
}
