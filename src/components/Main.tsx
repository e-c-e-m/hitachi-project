"use client";

import { useEffect } from "react";
import Hero from "./Hero";
import First from "./First";
import Power from "./Power";
import Substain from "./Substain";
import Grid from "./Grid";
import Rail from "./Rail";
import DataCenter from "./DataCenter";
import Lenis from "@studio-freight/lenis";
import Nav from "./Nav";
import Footnotes from "./Footnotes";

const Main = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
    <div className="bg-[#FBFBFB] text-[#000000] relative">
      <img
        src="/heroBg.png"
        alt=""
        className="absolute inset-0 z-[-1] h-full w-full opacity-10"
      />
      <div className="fixed inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#E9E9E9,transparent_1.2px),linear-gradient(to_bottom,#E9E9E9,transparent_1.2px)] bg-[size:80px_80px]"></div>
      <div className="relative z-[10]">
        <Hero />
        <First />
        <div className="relative">
          <Nav />
          <Power />
          <Substain />
          <Grid />
          <Rail />
          <DataCenter />
          <Footnotes />
        </div>
      </div>
    </div>
    </>
  );
};

export default Main;
