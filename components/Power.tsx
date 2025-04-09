"use client";

import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import powerLottie from "../assets/lottie/power.json";
import Tooltip from "./Tooltip";
import Nav from "./Nav";

gsap.registerPlugin(ScrollTrigger);

const Power = () => {
  const containerRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleTooltipToggle = (id: string) => {
    setActiveId((currentId) => (currentId === id ? null : id));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=170%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(firstTextRef.current, { y: "0", duration: 0.5 }, "-=0.5")
        .to(firstTextRef.current, { y: "-110vh", duration: 0.5 })
        .to(secondTextRef.current, { y: "0%", duration: 1 }, "-=0.6")
        .to(secondTextRef.current, { y: "-110vh", duration: 0.5 })
        .to(thirdTextRef.current, { y: "0%", duration: 1 }, "-=0.6");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="nav-power"
      className="w-full px-8 h-screen overflow-hidden relative"
    >
      {/* <Nav active={1} /> */}
      <div className="max-w-[1500px] mx-auto w-full h-full grid md:grid-cols-2">
        {/* Lottie Animation */}
        <div className="relative">
          <div className="absolute top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
            <Lottie
              animationData={powerLottie}
              loop={true}
              className="scale-[1.46] w-full mt-10 md:-mt-10 md:scale-[1.2]"
            />
          </div>
          <div className="absolute top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
            <Tooltip
              id="1"
              className="top-[50%] left-[51%] tooltip-power-1"
              text="HVDC subsea cables can be over 500km long"
              isActive={activeId === "1"}
              onToggle={handleTooltipToggle}
            />
            <Tooltip
              id="2"
              className="top-[35.4%] right-[42%] tooltip-power-2"
              text="HVDC cables lose about half as much energy as AC cables over long distances"
              isActive={activeId === "2"}
              onToggle={handleTooltipToggle}
            />
            <Tooltip
              id="3"
              className="top-[25%] left-[51%] tooltip-power-3"
              text="Offshore and onshore transmission hubs transform DC to AC for connection to the local power grid"
              isActive={activeId === "3"}
              onToggle={handleTooltipToggle}
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col max-w-[570px] h-full md:relative md:overflow-hidden">
          <div
            ref={firstTextRef}
            className="absolute z-[9999] top-[30vh] text-[20px] leading-[27px] font-[400] translate-y-[110vh] md:translate-y-0 md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px]"
          >
            High voltage direct current (HVDC) technology is key to integrating
            large amounts of renewable power into the energy mix, and
            interconnecting grids efficiently, with the lowest possible energy
            losses.
            <br /> <br />
            Sea-based converter stations change the AC power produced by
            turbines into DC (Direct Current).   <br /> <br />
            Huge HVDC cables can then transmit that electricity over large
            distances with roughly half the power loss compared to AC. An
            onshore terminal turns the electricity back into AC for use in the
            grid.
          </div>

          <div
            ref={secondTextRef}
            className="absolute z-[9999] top-[33vh] text-[20px] leading-[27px] font-[400]  translate-y-[110vh] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px]"
          >
            This electricity transmission technology could transform the UK
            energy sector. For example, the Dogger Bank development off the
            Yorkshire coast is set to become the world’s largest offshore
            windfarm. Upon its completion in 2027, it will use HVDC technology
            to connect more than 270 turbines via subsea cables to onshore
            transmission centres and power 6mn homes. <br /> <br /> The Shetland
            Caithness–Moray Link will also benefit from a long-term plan for
            carbon-free generation, which will be rolled out in phases using
            multi-terminal HVDC.
          </div>

          <div
            ref={thirdTextRef}
            className="absolute z-[9999] top-[40vh] text-[20px] leading-[27px] font-[400]  translate-y-[110vh] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px]"
          >
            The UK’s Holistic Network Design relies heavily on HVDC technology
            to make the most of the offshore locations of such systems and
            accelerate grid expansion to connect offshore renewable power and
            help decarbonise the electricity system.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Power;
