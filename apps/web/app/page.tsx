"use client"
import HomePage from "./component/homePage";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Pricing from "./component/pricing";
import Footer from "./component/footer";


export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <div className="bg-gradient-to-b from-blue-950 relative z-0 via-black to-black w-full h-auto">
        
        <HomePage />
      </div>
      <div className="bg-gradient-to-b to-blue-950 pt-10 from-black">
        <div className="flex justify-center">
          <Pricing />
        </div>
        <div className="mt-4 w-full h-full flex items-center justify-center">
        <Footer/>
        </div>
      </div>
    </main>
  );
}
