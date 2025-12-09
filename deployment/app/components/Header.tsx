"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="Covid MedGemma Logo"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-200 dark:ring-blue-300"
              />
              {/* <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-white bg-green-600 dark:border-slate-800" /> */}
            </div>
            <div>
              <h1 className="text-lg font-semibold">Covid MedGemma</h1>
              <p className="text-xs text-gray-700 dark:text-gray-500">
                Medical AI Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 sm:flex">
            <a
              href="#"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-slate-900 transition-colors"
            >
              My Profile
            </a>
            <a
              href="#"
              className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
            >
              Covid MedGemma
            </a>
            <a
              href="#"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-slate-900 transition-colors"
            >
              HIV Risk Estimate
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full border-b border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out sm:hidden ${isMenuOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col space-y-1 px-4 py-3">
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-slate-900 border-b border-gray-300"
          >
            My Profile
          </a>
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 border-b border-gray-300"
          >
            Covid MedGemma
          </a>
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-slate-900"
          >
            HIV Risk Estimate
          </a>
        </nav>
      </div>
    </header>
  );
}
