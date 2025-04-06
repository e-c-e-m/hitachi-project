"use client";

import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import powerLottie from "../assets/lottie/power.json";
import Tooltip from "./Tooltip";

gsap.registerPlugin(ScrollTrigger);

const Power = () => {
  const containerRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTooltipToggle = (id: string) => {
    setActiveId((currentId) => (currentId === id ? null : id));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = window.matchMedia("(max-width: 767px)");
  
      let tl;
  
      if (mm.matches) {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom+=250%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
  
        tl.to(firstTextRef.current, { y: "0", duration: 1 }, "-=1")
          .to(firstTextRef.current, { y: "-150vh", duration: 1 })
          .to(secondTextRef.current, { y: "0%", duration: 1 }, "-=1")
          .to(secondTextRef.current, { y: "-180vh", duration: 1 })
          .to(thirdTextRef.current, { y: "0%", duration: 1 }, "-=1");
      } else {

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom+=100%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
  
        tl.to(firstTextRef.current, { y: "0", duration: 0.2 }, "-=0.2")
          .to(firstTextRef.current, { y: "-100vh", duration: 0.4 })
          .to(secondTextRef.current, { y: "0%", duration: 0.4 }, "-=0.4")
          .to(secondTextRef.current, { y: "-100vh", duration: 0.4 })
          .to(thirdTextRef.current, { y: "0%", duration: 0.4 }, "-=0.4");
      }
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
          {isMobile ? (
              <img
                src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/power.png"
                alt="Static representation"
                className="w-full h-full object-cover fallback-video"
               />
            ) : (
              <Lottie
                animationData={powerLottie}
                loop={true}
                className="scale-[1.46] w-full mt-10 md:-mt-10 md:scale-[1.2]"
              />
            )}
          </div>
          <div className="absolute top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
            <Tooltip
              id="1"
              className="tooltip-power-1 top-[50%] left-[51%] cursor-pointer"
              text="HVDC subsea cables can be over 500km long²"
              isActive={activeId === "1"}
              onToggle={handleTooltipToggle}
            />
            <Tooltip
              id="2"
              className="tooltip-power-2 top-[35.4%] right-[42%] cursor-pointer"
              text="HVDC cables lose about half as much energy as AC cables over long distances¹"
              isActive={activeId === "2"}
              onToggle={handleTooltipToggle}
            />
            <Tooltip
              id="3"
              className="tooltip-power-3 top-[25%] left-[51%] cursor-pointer"
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
            className="absolute z-[9999] top-[30vh] xxl:top-[40vh] text-[20px] leading-[27px] font-[400] translate-y-[110vh] md:translate-y-0 md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px]"
          >
            Cities rely on clean electricity produced at remote locations, such as offshore wind farms. It needs to be transmitted from where it’s produced to where it’s needed.
            <br /><br />
            High voltage direct current (HVDC) technology is key to integrating large amounts of renewable power into the energy mix and connecting grids efficiently, with the lowest possible energy loss.
            <br /><br />
            Sea-based converter stations change the AC (alternating current) power produced by turbines into DC (direct current).
            <br /> <br />
            Huge HVDC cables can then transmit that electricity over large distances with roughly half the power loss compared to AC. An onshore terminal turns the electricity back into AC for use in the grid.
          </div>

          <div
            ref={secondTextRef}
            className="absolute z-[9999] top-[33vh] xxl:top-[40vh] text-[20px] leading-[27px] font-[400]  translate-y-[110vh] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px]"
          >
            For example, the Dogger Bank development off the Yorkshire coast is set to become the world’s largest offshore wind farm. On completion in 2027³, it will use HVDC technology to connect more than 270 turbines via subsea cables to onshore transmission centres, powering 6mn homes.
            <br /><br /> 
            Another project, the Shetland Caithness–Moray Link will enable the use of more renewable power, which will be rolled out in phases using multi-terminal HVDC.
          </div>

          <div
            ref={thirdTextRef}
            className="absolute z-[9999] top-[40vh] text-[20px] leading-[27px] font-[400]  translate-y-[110vh] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px]"
          >
            The UK’s planned Holistic Network Design will rely heavily on HVDC technology to make the most of the offshore locations of such systems – accelerating grid expansion to connect offshore renewable power and helping to decarbonise the electricity system.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Power;
