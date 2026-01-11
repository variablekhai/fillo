import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="bg-white h-screen flex flex-col font-sans overflow-hidden">
      <Header />
      <main className="grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
