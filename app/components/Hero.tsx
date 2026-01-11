"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

// Strikethrough Animation Component
const StrikethroughText = () => {
  return (
    <span className="relative inline-block text-stone-900 mx-1 whitespace-nowrap group">
      <span className="relative z-10 text-stone-400 group-hover:text-fillo-400 transition-colors duration-300">
        writing logs manually
      </span>
      <svg
        className="absolute top-1/2 left-0 w-full h-[140%] -translate-y-1/2 pointer-events-none z-20 overflow-visible"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 12 Q 50 10.5, 100 12"
          fill="transparent"
          strokeWidth="2"
          className="stroke-fillo-600"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 3,
          }}
        />
      </svg>
    </span>
  );
};

const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative h-full flex flex-col justify-center items-center overflow-hidden bg-fillo-50">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-size-[40px_40px] opacity-20"></div>

      {/* Hero Visual - Top Right Rings */}
      <div className="absolute -top-[15%] -right-[20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-20 pointer-events-none z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[75%] aspect-square border-2 border-dashed border-fillo-400 rounded-full animate-[spin_20s_linear_infinite]"></div>
        </div>
      </div>

      {/* Hero Visual - Bottom Left Rings */}
      <div className="absolute -bottom-[15%] -left-[20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-20 pointer-events-none z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[50%] aspect-square border-2 border-dashed border-stone-300 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center justify-center text-center h-full gap-6 md:gap-8">
        <div className="inline-flex items-center gap-2 border border-dashed border-stone-400 px-4 py-2 bg-white/50 backdrop-blur-sm mt-auto md:mt-0">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-stone-600 tracking-widest uppercase">
            Developmental V1.0
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-stone-900 leading-[0.9] tracking-tight font-medium">
          Stop <br className="hidden md:block" />
          <StrikethroughText />
        </h1>

        <p className="text-base md:text-lg text-stone-600 max-w-2xl leading-relaxed">
          Automate your logbook in minutes so you can spend more time on the
          work that actually matters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 relative z-20 mb-auto md:mb-0">
          <Button
            size="lg"
            rightIcon={<ArrowRight size={18} />}
            className="text-base h-12 md:h-14 px-8 md:px-10"
            onClick={() => router.push("/get-started")}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base h-12 md:h-14 px-8 md:px-10"
          >
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
