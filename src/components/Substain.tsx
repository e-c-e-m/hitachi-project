"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import substainLottie from "../assets/lottie/substitution.json";
import substainLevelsLottie from "../assets/lottie/substitutionlevels.json";
import Tooltip from "./Tooltip";

gsap.registerPlugin(ScrollTrigger);

const Substain = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showLevels, setShowLevels] = useState(false);
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
  
        tl.to(firstTextRef.current, { y: "0", duration: 0.4 }, "-=0.4")
          .to(firstTextRef.current, { y: "-120vh", duration: 0.4 }, "swap")
          .to(secondTextRef.current, { y: "0%", duration: 0.4 })
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
  
        tl.to(firstTextRef.current, { y: "0", duration: 0.4 }, "-=0.4")
          .to(firstTextRef.current, { y: "-100vh", duration: 0.4 }, "swap")
          .to(secondTextRef.current, { y: "0%", duration: 0.4 }, "-=0.4")
          .to(secondTextRef.current, { y: "0%", duration: 0 })
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
              duration: 0.4,
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
          .to(secondTextRef.current, { y: "-100vh", duration: 0.4 })
          .to(
            lottieLevelsContainerRef.current,
            {
              opacity: 0,
              display: "none",
              duration: 0.4,
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
              duration: 0.4,
              onReverseComplete: () => setShowLevels(true),
            },
            "swapBack"
          )
          .to(
            thirdTextRef.current,
            { y: "0%", duration: 1, delay: -0.3 },
            "swapBack"
          );
      }
    }, containerRef);
  
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Intro text */}
      <div className="w-full h-screen flex items-center justify-center text-center px-8">
        <div className="max-w-[740px] font-[400] text-[21px] md:text-[24px] lg:text-[32px] leading-[28px] md:leading-[32px]">
        Once electricity reaches the city, a substation is needed to step the voltage down so that it can be used safely in homes and offices. But there are a few challenges.
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
                    ? "tooltip-substation-1 top-[26.5%]"
                    : "tooltip-substation-1 duration-[0.1s] top-[33%]"
                } right-[25%] cursor-pointer`}
                text="Substations in the UK can be huge, for example: a new substation in London will use over 1,000 m² of space."
                isActive={activeId === "1"}
                onToggle={handleTooltipToggle}
              />
              <Tooltip
                id="2"
                className={`${
                  showLevels
                    ? "tooltip-substation-2 top-[39%] md:top-[37%]"
                    : "tooltip-substation-2 duration-[0.1s] top-[48%] md:top-[43.5%]"
                } left-0 md:left-[9%] cursor-pointer`}
                text="Up to 98% of an indoor or underground substation can be hidden from view."
                isActive={activeId === "2"}
                onToggle={handleTooltipToggle}
              />
              <Tooltip
                id="3"
                className={`${
                  showLevels
                    ? "tooltip-substation-3 top-[64%] md:top-[55%]"
                    : "tooltip-substation-3 duration-[0.1s] top-[72%] md:top-[59%]"
                } right-[25%] cursor-pointer`}
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
              {isMobile ? (
              <img
              src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/substation.png"
              alt="Static representation"
              className="w-full h-full object-cover fallback-video"
             />
            ) : (
              <Lottie
                animationData={substainLottie}
                loop={true}
                className="scale-[1.46] w-full mt-10 md:-mt-10 md:scale-[1.2]"
              />
            )}
            </div>

            {/* LottieLevels container (hidden by default) */}
            <div
              ref={lottieLevelsContainerRef}
              className="absolute w-full hidden  top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square items-center justify-center"
            >
              {isMobile ? (
              <img
                src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/substation-levels.png"
                alt="Static representation"
                className="w-full h-full object-cover fallback-video"
               />
            ) : (
              <Lottie
                animationData={substainLevelsLottie}
                loop={false}
                lottieRef={lottieLevelsRef}
                className="scale-[1.46] w-full mt-10 md:-mt-10 md:scale-[1.2]"
              />
            )}
            </div>
          </div>

          {/* Text section */}
          <div className="flex flex-col max-w-[570px] w-full h-full md:relative md:overflow-hidden">
            <div
              ref={firstTextRef}
              className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[33vh] xxl:top-[43vh] text-[20px] leading-[27px] font-[400] translate-y-[800px] md:translate-y-0"
            >
              Cities need to make the most of their space.
              <br /><br />
              But traditional substations take up much-needed space. Ideally, in cities they should be invisible. And they can be. 
              <br /><br />
              <span className="nue-medium">Hitachi offers solutions to shrink the size of a substation by up to 70 per cent and significantly reduce noise levels.</span>
              <br /><br />
              In addition, by putting it indoors or underground, it can be integrated seamlessly with residential and commercial spaces.
            </div>

            <div
              ref={secondTextRef}
              className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[33vh] text-[20px] leading-[27px] font-[400] translate-y-[100vh]"
            >
              Substations are getting smarter, too. Use of power electronics technology can enhance power quality and system stability, ensuring reliable electricity delivery. 
              <br /> <br />
              Providing both AC and DC power output facilitates the optimal electrification of public transport, data centres, heating and cooling, and other energy-intensive operations.
            </div>

            <div
              ref={thirdTextRef}
              className="absolute z-[9999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[40vh] text-[24px] leading-[32px] font-[400] translate-y-[100vh]"
            >
              “Substations will become smaller, more eco-efficient and seamlessly provide AC and DC power at various voltage levels – to advance a more sustainable, flexible and secure energy system”
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
        <div className="max-w-[740px] font-[400] text-[21px] md:text-[24px] lg:text-[32px] leading-[28px] md:leading-[32px]">
          Cities need a huge variety of electric devices connected and in balance – so many, in fact, that manual and analogue systems are unable to handle their complexity.
          <br /><br />
          <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          Digitalisation of grids is optimising power at various levels, from city to countryside, and even regions.
          </span>
        </div>
      </div>
    </>
  );
};

export default Substain;
