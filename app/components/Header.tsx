"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-fillo-50/90 backdrop-blur-md border-b border-dashed border-stone-300">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 h-16 items-center">
        {/* Logo Section */}
        <div className="col-span-6 md:col-span-3 lg:col-span-2 px-6 flex items-center border-r border-dashed border-stone-300 h-full">
          <Link href="/" className="flex justify-center items-center">
            <span className="font-display text-xl font-bold tracking-tight text-stone-900">
              Fillo
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex md:col-span-6 lg:col-span-8 h-full items-center justify-center border-r border-dashed border-stone-300">
          <div className="flex space-x-12">
            <Link
              href="/design-system"
              className="text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-fillo-600 transition-colors"
            >
              Design System
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="hidden md:flex md:col-span-3 lg:col-span-2 h-full items-center justify-center px-6">
          <Button
            size="md"
            rightIcon={<ArrowRight size={18} />}
            className="text-md"
            onClick={() => router.push("/get-started")}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="col-span-6 md:hidden h-full flex items-center justify-end px-6">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-stone-600 hover:text-fillo-600 transition-colors"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-dashed border-stone-300 bg-white">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="#how-it-works"
              className="text-stone-600 hover:text-fillo-600 uppercase tracking-widest font-bold text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Workflow
            </Link>
            <Link
              href="#features"
              className="text-stone-600 hover:text-fillo-600 uppercase tracking-widest font-bold text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/design-system"
              className="text-stone-600 hover:text-fillo-600 uppercase tracking-widest font-bold text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              System
            </Link>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
