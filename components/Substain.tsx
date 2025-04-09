"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import substainLottie from "../assets/lottie/substitution.json";
import substainLevelsLottie from "../assets/lottie/substitutionlevels.json";
import Tooltip from "./Tooltip";
import Nav from "./Nav";

gsap.registerPlugin(ScrollTrigger);

const Substain = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showLevels, setShowLevels] = useState(false);

  const handleTooltipToggle = (id: string) => {
    setActiveId((currentId) => (currentId === id ? null : id));
  };

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);

  const lottieContainerRef = useRef(null);
  const lottieLevelsContainerRef = useRef(null);

  const lottieLevelsRef = useRef<any>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(firstTextRef.current, { y: "0", duration: 0.5 }, "-=0.5")
        .to(firstTextRef.current, { y: "-100vh", duration: 0.5 }, "-=0.5")
        .to(secondTextRef.current, { y: "0%", duration: 1 }, "swap")
        .to(
          lottieContainerRef.current,
          {
            opacity: 0,
            display: "none",
            duration: 0.5,
            onReverseComplete: () => setShowLevels(false),
          },
          "swap"
        )
        .to(
          lottieLevelsContainerRef.current,
          {
            opacity: 1,
            display: "flex",
            duration: 0.5,
            onStart: () => {
              if (lottieLevelsRef.current) {
                lottieLevelsRef.current.goToAndPlay(0, true);
              }
            },
            onComplete: () => {
              setShowLevels(true);
            },
          },
          "swap"
        )
        .to(secondTextRef.current, { y: "-100vh", duration: 1 })
        .to(
          lottieLevelsContainerRef.current,
          {
            opacity: 0,
            display: "none",
            duration: 0.5,
            onStart: () => {
              setShowLevels(false);
            },
          },
          "swapBack"
        )
        .to(
          lottieContainerRef.current,
          {
            opacity: 1,
            display: "flex",
            duration: 0.5,
            onReverseComplete: () => setShowLevels(true),
          },
          "swapBack"
        )
        .to(
          thirdTextRef.current,
          { y: "0%", duration: 1, delay: -0.3 },
          "swapBack"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Intro text */}
      <div className="w-full h-screen flex items-center justify-center text-center px-8">
        <div className="max-w-[600px] font-[400] text-[21px] md:text-[24px] leading-[28px] md:leading-[32px]">
          Once electricity reaches the city, a substation is needed to step the
          voltage down so it can be used safely in homes and offices. But there
          are a few problems.
        </div>
      </div>

      {/* Main section with ScrollTrigger */}
      <div
        ref={containerRef}
        id="nav-substain"
        className="w-full px-8 h-screen overflow-hidden relative"
      >
        {/* <Nav active={3} /> */}

        <div
          ref={contentRef}
          className="max-w-[1500px] mx-auto w-full h-full grid md:grid-cols-2"
        >
          <div className="relative">
            {/* Tooltips */}
            <div className="absolute z-[10] top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
              <Tooltip
                id="1"
                className={`${
                  showLevels
                    ? "top-[26.5%]"
                    : "duration-[0.1s] top-[33%] tooltip-substation-1"
                } right-[25%]`}
                text="Substations in the UK can be huge, for example: a new substation in London will use over 1,000 m2 of space."
                isActive={activeId === "1"}
                onToggle={handleTooltipToggle}
              />
              <Tooltip
                id="2"
                className={`${
                  showLevels
                    ? "top-[39%] md:top-[37%]"
                    : "duration-[0.1s] top-[48%] md:top-[43.5%] tooltip-substation-2"
                } left-0 md:left-[9%]`}
                text="Up to 98% of an indoor or underground substation can be hidden from view."
                isActive={activeId === "2"}
                onToggle={handleTooltipToggle}
              />
              <Tooltip
                id="3"
                className={`${
                  showLevels
                    ? "top-[64%] md:top-[55%]"
                    : "duration-[0.1s] top-[72%] md:top-[59%] tooltip-substation-3"
                } right-[25%]`}
                text="Indoor and underground substations are waterproof, soundproof and airtight. They are temperature-controlled and fire-protected."
                isActive={activeId === "3"}
                onToggle={handleTooltipToggle}
              />
            </div>

            {/* Original Lottie (kept looping) */}
            <div
              ref={lottieContainerRef}
              className="absolute w-full top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center"
            >
              <Lottie
                animationData={substainLottie}
                loop={true}
                className="scale-[1.46] w-full mt-10 md:-mt-10 md:scale-[1.2]"
              />
            </div>

            {/* LottieLevels container (hidden by default) */}
            <div
              ref={lottieLevelsContainerRef}
              className="absolute w-full hidden  top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square items-center justify-center"
            >
              <Lottie
                animationData={substainLevelsLottie}
                loop={false}
                lottieRef={lottieLevelsRef}
                className="scale-[1.46] w-full mt-10 md:-mt-10 md:scale-[1.2]"
              />
            </div>
          </div>

          {/* Text section */}
          <div className="flex flex-col max-w-[570px] w-full h-full md:relative md:overflow-hidden">
            <div
              ref={firstTextRef}
              className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[33vh] text-[20px] leading-[27px] font-[400] translate-y-[800px] md:translate-y-0"
            >
              Traditional substations need space which, in cities, may be
              limited and expensive; plus they can be noisy and unattractive.
              <br /> <br />
              Hitachi has determined how to shrink the size of a substation by
              up to 70 per cent and significantly reduce noise levels. By
              putting it indoors or underground, up to 98 per cent of a
              substation is hidden from view, leaving space that can be used for
              parks, shops and offices, instead.
            </div>

            <div
              ref={secondTextRef}
              className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[33vh] text-[20px] leading-[27px] font-[400] translate-y-[100vh]"
            >
              Substations are getting smarter, too. Use of power electronics
              technology, such as Grid-enSure™ – the same as in HVDC – can
              enhance power quality and system stability, ensuring reliable
              electricity delivery to homes, offices and streets. <br /> <br />{" "}
              Providing both AC and DC power output facilitates the optimal
              electrification of sectors such as public transport, data centres,
              heating and cooling, and other energy-intensive operations.
            </div>

            <div
              ref={thirdTextRef}
              className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[40vh] text-[24px] leading-[32px] font-[400] translate-y-[100vh]"
            >
              “Substations will become smaller, more eco-efficient and
              seamlessly provide AC and DC power at various voltage levels – to
              advance a more sustainable, flexible and secure energy system”
              <br />
              <p className="mt-3 text-[16px] leading-[26px]">
                Adrian Timbus, Hitachi Energy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final text */}
      <div className="w-full flex items-center h-screen justify-center text-center ">
        <div className="max-w-[600px] font-[400] text-[24px] leading-[32px] px-7">
          Digitalisation of grids is optimising power at various levels, from
          city to countryside, and even regions.
        </div>
      </div>
    </>
  );
};

export default Substain;
