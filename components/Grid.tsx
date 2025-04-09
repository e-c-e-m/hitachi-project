"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gridLottie from "../assets/lottie/grid.json";
import Tooltip from "./Tooltip";
import Nav from "./Nav";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const Grid = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleTooltipToggle = (id: string) => {
    setActiveId((currentId) => (currentId === id ? null : id));
  };
  const containerRef = useRef(null);

  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);
  const fourthTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=180%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(firstTextRef.current, { y: "0", duration: 0.5 }, "-=0.5")
        .to(firstTextRef.current, { y: "-100vh", duration: 0.5 })
        .to(secondTextRef.current, { y: "0%", duration: 1 }, "-=0.5")
        .to(secondTextRef.current, { y: "-100vh", duration: 0.5 })
        .to(thirdTextRef.current, { y: "0%", duration: 1 }, "-=0.5")
        .to(thirdTextRef.current, { y: "-100vh", duration: 0.5 })
        .to(fourthTextRef.current, { y: "0%", duration: 1 }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="nav-grid"
      className="w-full px-8 h-screen overflow-hidden relative"
    >
      {/* <Nav active={4} /> */}

      <div className="max-w-[1500px] mx-auto w-full h-full grid md:grid-cols-2 gap-4">
        {/* Lottie Animation */}
        <div className="relative">
          <div className="absolute z-[11] top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
            <Tooltip
              id="1"
              className="top-[42%] right-[33%] tooltip-grid-1"
              text="More than 1mn homes across the UK have solar panels, and surplus energy can be sold back into the grid"
              isActive={activeId === "1"}
              onToggle={handleTooltipToggle}
            />
            <Tooltip
              id="2"
              className="top-[43.4%] left-[43%] tooltip-grid-2"
              text="Over a million electric cars have been sold in the UK."
              isActive={activeId === "2"}
              onToggle={handleTooltipToggle}
            />
          </div>
          <div className="absolute top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
            <Lottie
              animationData={gridLottie}
              loop={true}
              className="scale-[1.46] mt-10 md:mt-0 md:scale-[1.2]"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col max-w-[550px] h-full md:relative md:overflow-hidden">
          <div
            ref={firstTextRef}
            className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[25vh] text-[20px] leading-[27px] font-[400] translate-y-[120vh] md:translate-y-0"
          >
            Digital technology monitors how electricity is used, and balances
            supply and demand in real time across all these levels. As grid
            complexity increases – with more assets and asset types connected,
            weather-dependent generation patterns and new load patterns defined
            by sectors such as electrical mobility and industrial processes –
            digitalisation of the grid is an imperative.
            <br /> <br />
            Artificial intelligence (AI) can help to manage this complexity.
            Hitachi used AI technology to develop new power and energy
            forecasting solutions, which can be integrated with the company’s
            Market & Network Management to contribute significantly to system
            stability and reliability and enhance energy affordability.
          </div>

          <div
            ref={secondTextRef}
            className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[28vh] text-[20px] leading-[27px] font-[400] translate-y-[120vh]"
          >
            Artificial intelligence (AI) can help to manage this complexity.
            Hitachi used AI technology to develop new power and energy
            forecasting solutions, which can be integrated with the company’s
            Market & Network Management to contribute significantly to system
            stability and reliability and enhance energy affordability.
            <br /> <br />
            Another key aspect of the digital grid is the fact that electricity
            no longer moves in only one direction. Now it can move
            bidirectionally, and the grid can therefore integrate distributed
            energy assets such as roof-top solar, batteries and even electric
            vehicles. Bidirectional power flows can help improve stability and
            reliability of the grid.
          </div>

          <div
            ref={thirdTextRef}
            className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[30vh] text-[20px] leading-[27px] font-[400] translate-y-[120vh]"
          >
            All of this has opened opportunities for communities to become
            integral to the energy system, and help shape its future. More than
            1mn homes across the UK have solar panels, and surplus energy can be
            sold back to the grid. Hitachi technology such as the multi-port EV
            charger means that electric cars have the potential to be used as
            power sources themselves. <br /> <br /> Digital grid technology
            allows consumers to be part of the energy market, flexing the load
            by regulating power consumption of domestic devices including EVs,
            hot water storage and refrigeration units.
          </div>

          <div
            ref={fourthTextRef}
            className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[35vh] text-[24px] leading-[32px] font-[400] translate-y-[120vh]"
          >
            “If your electric hot water boiler is a few degrees lower, or your
            car is charged a bit later or earlier overnight, you won’t realise
            it's happening. There are a lot of demand response opportunities
            like these, which are insignificant to the user but beneficial to
            grid management and the environment”
            <p className="text-[16px] leading-[26px] font-[400] mt-2">
              Gerhard Salge, Hitachi Energy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
