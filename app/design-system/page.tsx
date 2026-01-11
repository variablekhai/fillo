import React from "react";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import Input from "@/app/components/ui/Input";
import { ArrowRight, Upload, Calendar } from "lucide-react";

const DesignSystemPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto border-x border-dashed border-stone-300">
        {/* Header */}
        <div className="bg-stone-900 text-white p-12 md:p-24 border-b border-dashed border-stone-300">
          <h1 className="font-display text-6xl mb-4">Design System</h1>
          <p className="text-stone-400 text-xl font-light">
            v1.0 / Fillo / Technical
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3 p-8 border-r border-dashed border-stone-300 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="space-y-1">
              {[
                "Colors",
                "Typography",
                "Buttons",
                "Inputs",
                "Cards",
                "Badges",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-bold uppercase tracking-wide"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 bg-fillo-50/30">
            {/* 1. Colors */}
            <section
              id="colors"
              className="p-12 border-b border-dashed border-stone-300"
            >
              <h2 className="font-display text-3xl mb-8 uppercase">
                Color Palette
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                    Brand (Fillo's Earth Tones)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {[
                      { step: 50, className: "bg-fillo-50" },
                      { step: 100, className: "bg-fillo-100" },
                      { step: 200, className: "bg-fillo-200" },
                      { step: 300, className: "bg-fillo-300" },
                      { step: 400, className: "bg-fillo-400" },
                      { step: 500, className: "bg-fillo-500" },
                      { step: 600, className: "bg-fillo-600" },
                      { step: 700, className: "bg-fillo-700" },
                      { step: 800, className: "bg-fillo-800" },
                      { step: 900, className: "bg-fillo-900" },
                    ].map(({ step, className }) => (
                      <div key={step} className="space-y-2">
                        <div
                          className={`h-16 w-full shadow-sm ${className} border border-stone-200`}
                        ></div>
                        <div className="text-xs">
                          <p className="text-stone-700">fillo-{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Typography */}
            <section
              id="typography"
              className="p-12 border-b border-dashed border-stone-300"
            >
              <h2 className="font-display text-3xl mb-8 uppercase">
                Typography
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Display (Playfair Display)
                  </h3>
                  <div>
                    <h1 className="font-display text-5xl">HEADING 1</h1>
                  </div>
                  <div>
                    <h2 className="font-display text-4xl">Heading 2</h2>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      Heading 3 Bold
                    </h3>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Body / Mono (Space Mono)
                  </h3>
                  <div>
                    <p className="text-base text-stone-600 font-sans">
                      Regular body text (Space Mono). Used for the majority of
                      the content.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">
                      Small Text and CAPITALIZED SMALL TEXT
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Buttons */}
            <section
              id="buttons"
              className="p-12 border-b border-dashed border-stone-300"
            >
              <h2 className="font-display text-3xl mb-8 uppercase">Buttons</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                    Variants
                  </h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="primary">Get Started</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                    Interaction
                  </h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button rightIcon={<ArrowRight size={16} />}>
                      Hover Me
                    </Button>
                    <Button
                      leftIcon={<ArrowRight size={16} className="rotate-180" />}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Inputs */}
            <section
              id="inputs"
              className="p-12 border-b border-dashed border-stone-300"
            >
              <h2 className="font-display text-3xl mb-8 uppercase">
                Form Elements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                <Input label="Email Address" placeholder="name@example.com" />
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-stone-600 mb-2 uppercase tracking-widest">
                    File Upload
                  </label>
                  <div className="border border-dashed border-stone-400 bg-white p-8 text-center hover:bg-fillo-50 cursor-pointer transition-colors">
                    <Upload className="mx-auto text-stone-400 mb-2" />
                    <span className="text-stone-600 text-sm">Upload File</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Cards */}
            <section
              id="cards"
              className="p-12 border-b border-dashed border-stone-300"
            >
              <h2 className="font-display text-3xl mb-8 uppercase">Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic Card */}
                <div className="bg-white p-6 border border-stone-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <h4 className="font-bold text-lg mb-2">BASIC_CARD</h4>
                  <p className="text-stone-600 text-sm">
                    Simple container with hard shadow.
                  </p>
                </div>

                {/* Feature Card */}
                <div className="bg-white p-6 border border-dashed border-stone-300 hover:border-solid hover:border-stone-400 transition-all">
                  <div className="w-10 h-10 bg-fillo-100 text-fillo-700 flex items-center justify-center mb-4">
                    <Calendar size={20} />
                  </div>
                  <h4 className="font-bold font-display uppercase text-lg mb-2">
                    Feature Card
                  </h4>
                  <p className="text-stone-600 text-sm">
                    Includes an icon and hover state.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Badges */}
            <section id="badges" className="p-12">
              <h2 className="font-display text-3xl mb-8 uppercase">Badges</h2>
              <div className="flex flex-wrap gap-4">
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="brand">Brand</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPage;
