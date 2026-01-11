import React from "react";
import { Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dashed border-stone-300 bg-stone-50 mt-auto">
      <div className="max-w-[1400px] mx-auto border-x border-dashed border-stone-300">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dashed divide-stone-300">
          {/* Copyright */}
          <div className="p-6 flex flex-col items-center md:items-start justify-center gap-1">
            <p className="text-[10px] text-stone-400 max-w-[400px] text-center md:text-left leading-tight">
              This is an independent student project. Not affiliated with,
              endorsed by, or sponsored by{" "}
              <a
                href="https://www.umpsa.edu.my"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-600 underline decoration-dashed underline-offset-2 transition-colors"
              >
                UMPSA
              </a>{" "}
              in any way.
            </p>
          </div>

          {/* Made by & Open Source */}
          <div className="p-6 flex items-center justify-center gap-6">
            <span className="text-xs text-stone-600 flex items-center gap-1 font-mono uppercase">
              Made by
              <a
                href="https://www.linkedin.com/in/khai-azfar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fillo-600 transition-colors group"
              >
                <span className="border-b border-dashed border-stone-400 group-hover:border-fillo-600">
                  Khairul Azfar
                </span>
              </a>
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-stone-600 hover:text-fillo-600 transition-colors font-mono uppercase group"
            >
              <Github size={14} />
              <span className="border-b border-dashed border-stone-400 group-hover:border-fillo-600">
                Proudly Open Source
              </span>
            </a>
          </div>

          {/* System Status */}
          <div className="p-6 flex items-center justify-center md:justify-end">
            <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500 uppercase tracking-widest">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              SYSTEMS OPERATIONAL
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
