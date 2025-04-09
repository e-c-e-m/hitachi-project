"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import railLottie from "../assets/lottie/rail.json";
import Tooltip from "./Tooltip";
import Nav from "./Nav";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const Rail = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleTooltipToggle = (id: string) => {
    setActiveId((currentId) => (currentId === id ? null : id));
  };

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const bottomText = useRef(null);

  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);

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
        .to(secondTextRef.current, { y: "0%", duration: 0.5 }, "-=0.5")
        .to(secondTextRef.current, { y: "-100vh", duration: 1 })
        .to(thirdTextRef.current, { y: "0%", duration: 0.5 }, "-=0.5");
      // .to(contentRef.current, { y: "-100vh", duration: 1 })
      // .to(bottomText.current, { y: 0, duration: 0.5 }, "-=0.75");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        id="nav-rail"
        className="w-full px-5 h-screen overflow-hidden relative"
      >
        {/* <Nav active={5} /> */}

        <div
          ref={contentRef}
          className="max-w-[1500px] mx-auto w-full h-full flex md:flex-row flex-col-reverse "
        >
          {/* Text Section (Left Column) */}
          <div className="flex flex-col w-full md:w-[49%] md:max-w-[570px] md:ml-[10%] h-full md:relative md:overflow-hidden">
            <div
              ref={firstTextRef}
              className="absolute z-[99999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[40vh] text-[20px] leading-[27px] font-[400] translate-y-[100vh] md:translate-y-0"
            >
              To move away from fossil fuels, cities need to electrify as much
              of their infrastructure as possible. For example, Hitachi has
              devised commuter trains that can be fully electric, hybrid or
              tri-brid (battery, electric and diesel).
            </div>

            <div
              ref={secondTextRef}
              className="absolute z-[99999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[40vh] text-[20px] leading-[27px] font-[400] translate-y-[100vh]"
            >
              In Italy, Hitachi Rail’s “Blues” commuter train is already in
              action. It uses electricity on electrified track, and battery on
              non-electric track. Its battery can be charged when the train is
              in motion, as well as in stations via overhead cables. The
              batteries are modular, and can be configured with different scales
              of battery packs, depending on need. This puts the technology in
              reach of more cities, allowing them to start small and scale
              later.
            </div>

            <div
              ref={thirdTextRef}
              className="absolute z-[99999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[40vh] text-[24px] leading-[32px] font-[400] translate-y-[100vh]"
            >
              “Switzerland is the only country in Europe whose train tracks are
              100 per cent electrified. Every other country will need to think
              about batteries”
              <p className="text-[16px] leading-[26px] font-[400] mt-3">
                Koji Agatsuma, Hitachi Rail Europe
              </p>
            </div>
          </div>

          {/* Lottie Animation (Right Column) */}
          <div className=" w-full md:w-[50%] h-full relative">
            <div className="absolute z-[10] top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
              <Tooltip
                id="1"
                className="top-[47%] left-[32%] tooltip-rail-1"
                text="There can be two, four or more batteries in the underframe."
                isActive={activeId === "1"}
                onToggle={handleTooltipToggle}
              />
              <Tooltip
                id="2"
                className="top-[40%] right-[38%] tooltip-rail-2"
                text="Roof cooling systems save space and weight."
                isActive={activeId === "2"}
                onToggle={handleTooltipToggle}
              />
              <Tooltip
                id="3"
                className="top-[35%] left-[44%] tooltip-rail-3"
                text="In stations, batteries can be recharged using the pantograph."
                isActive={activeId === "3"}
                onToggle={handleTooltipToggle}
              />
            </div>
            <div className="absolute top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
              <Lottie
                animationData={railLottie}
                loop={true}
                className="scale-[1.46] mt-10 md:mt-0 md:scale-[1.2]"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bottomText}
        className="w-full flex items-center h-screen justify-center text-center"
      >
        <div className="max-w-[750px] font-[400] text-[21px] md:text-[34px] px-6 leading-[28px] md:leading-[38px]">
          Cities are more digitally connected than ever. But how can they ensure
          they are sharing information in a way that doesn’t waste energy and
          space?
        </div>
      </div>
    </>
  );
};

export default Rail;
