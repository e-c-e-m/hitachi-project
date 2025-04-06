"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dataCenterLottie from "../assets/lottie/datacenter.json";
import Tooltip from "./Tooltip";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const DataCenter = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [_animate, setAnimate] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

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
  const bottomText = useRef(null);
  const mediaRef = useRef(null);

  const botttomTextRef2 = useRef(null);
  const bottomTextContainer = useRef(null);
  const bottomImageRef = useRef(null);

  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSafari =
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
        /Apple/.test(navigator.vendor);
      setVideoSrc(isSafari ? "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completesafari.mp4" : "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completevideo.webm");
    }
  }, []);

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
  
        tl.to(firstTextRef.current, { y: "0", duration: 0.2 }, "-=0.2")
          .to(firstTextRef.current, { y: "-120vh", duration: 0.4 })
          .to(secondTextRef.current, { y: "0%", duration: 0.4 }, "-=0.4")
          .to(secondTextRef.current, { y: "-100vh", duration: 0.4 })
          .to(thirdTextRef.current, { y: "0%", duration: 0.4 }, "-=0.4");
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomTextContainer.current,
          start: "top top",
          end: "+=80%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(bottomText.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
        .to(bottomImageRef.current, {
          y: "-50%",
          duration: 0.5,
          onComplete: () => setAnimate(true),
          onReverseComplete: () => setAnimate(false),
        })
        .to(botttomTextRef2.current, { y: 0, opacity: 1, duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        id="nav-datacenter"
        className="w-full px-8 h-screen overflow-hidden relative"
      >
        {/* <Nav active={7} /> */}

        <div
          ref={contentRef}
          className="max-w-[1500px] mx-auto w-full h-full flex flex-col-reverse md:flex-row"
          style={{ float: "none" }}
        >
          {/* Text Section (Left Column) */}
          <div className="flex flex-col w-full md:w-[50%] max-w-[560px] md:ml-[10%] h-full md:relative md:overflow-hidden">
            <div
              ref={firstTextRef}
              className="absolute z-[99999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[30vh] xxl:top-[45vh] text-[20px] leading-[27px] font-[400]  translate-y-[100vh] md:translate-y-0"
            >
              <span className="nue-medium">AI is transforming work and communications, but it is energy intensive: a generative AI request⁴ uses 2.9 watt-hours of electricity, roughly 10 times more than a standard internet search.</span>
              <br /><br />
              And the huge increase in data centres supporting the AI boom is driving power demands ever higher.
              <br /><br />
              For example, Ireland’s data centres used more electricity in 2023 than all of its urban homes put together (21 per cent vs 18 per cent).
            </div>

            <div
              ref={secondTextRef}
              className="absolute z-[99999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[36vh] xxl:top-[45vh] text-[20px] leading-[27px] font-[400] translate-y-[100vh]"
            >
              Data centres need land, too.  Covering 50 acres, Europe’s largest data centre is in Cardiff. But companies such as Hitachi are creating smaller, enterprise-grade AI and data centres. This involves a combination of methods. First, updating old systems can save up to 50 per cent of server capacity. Second, using “virtual servers” means that fewer physical servers are needed. 
            </div>

            <div
              ref={thirdTextRef}
              className="absolute z-[99999] md:bg-transparent bg-[#FFFFFF99] md:backdrop-blur-0 backdrop-blur-[11px] px-[32px] py-[24px] top-[36vh] xxl:top-[45vh] text-[20px] leading-[27px] font-[400] translate-y-[100vh]"
            >
              Rather than tying each server to a client who might or might not be using it, the technology allows the servers to be shared, and processing power to be scaled up or down, based on client demand.
              <br /><br />
              Hitachi’s Storage Virtualization Operating System (SVOS) can reduce electricity consumption by up to 65 per cent, while also saving space. These kinds of solutions can help to ensure that data centres serve cities without wasting energy or swallowing land.
            </div>
          </div>

          {/* Lottie Animation (Right Column) */}
          <div className="h-full relative w-full md:w-[50%]">
            {/* <img
            ref={lottieImageRef}
            src="/centerb.png"
            alt=""
            className="w-[720px] h-auto object-contain absolute top-[-16.7%] z-[99] right-[0%] opacity-0"
          /> */}
            <div className="absolute z-[10] top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
              <Tooltip
                id="1"
                className="tooltip-datacentre-1 top-[39%] left-[27.5%] cursor-pointer"
                text="Gen AI uses 10 times the power of a standard internet search."
                isActive={activeId === "1"}
                onToggle={handleTooltipToggle}
              />
              <Tooltip
                isActive={activeId === "2"}
                onToggle={handleTooltipToggle}
                id="2"
                className="tooltip-datacentre-2 top-[40%] left-[48%] cursor-pointer"
                text="Updating old systems can save up to 50% of server capacity."
              />
              <Tooltip
                isActive={activeId === "3"}
                onToggle={handleTooltipToggle}
                id="3"
                className="tooltip-datacentre-3 top-[51%] right-[30%] cursor-pointer"
                text="Virtual servers can reduce electricity consumption by up to 65%."
              />
            </div>
            <div className="absolute top-1/2 bottom-1/2 left-0 right-0 -translate-y-1/2 aspect-square flex items-center justify-center">
              {isMobile ? (
                <img
                src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/datacentre.png"
                alt="Static representation"
                className="w-full h-full object-cover fallback-video"
                />
              ) : (
                <Lottie
                  animationData={dataCenterLottie}
                  loop={true}
                  className="scale-[1.46] w-full mt-10 md:-mt-10 md:scale-[1.2]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bottomTextContainer}
        className="w-full flex flex-col relative items-center h-screen overflow-hidden justify-center px-8 text-center"
      >
        <div
          ref={bottomText}
          className="absolute top-[10%] max-w-[900px] font-[400] text-[24px] md:text-[34px] leading-[31px] md:leading-[38px] px-8 mb-8"
        >
          <div className="max-w-[850px] font-[400] text-[21px] md:text-[24px] lg:text-[32px] leading-[28px] md:leading-[32px]">
            Our cities are forever evolving and adapting. Their latest chapter is a generational power shift, as they move towards an all-electric future.
        </div>
        </div>

        <div className="relative w-full flex flex-col items-center justify-center gap-8">
        {isMobile ? (
        <img
          ref={mediaRef}
          src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completeImg.png"
          alt="Static representation"
          className="absolute w-full max-w-[600px] bottom-0 z-[200] complete-static"
        />
        ) : (
        videoSrc && (
          <video
            ref={mediaRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            poster="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completeImg.png"
            className="max-w-full h-auto md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]"
          >
            <source src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completevideo.webm" type="video/webm" />
            <source src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completesafari.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      )}
        </div>

        <div
          ref={botttomTextRef2}
          className="text-[16px] md:text-[24px] px-8 leading-[26px] font-[400] max-w-[400px] mx-auto mt-8 absolute bottom-[10%]"
        >
          To read more about how Hitachi is transforming cities, visit:
          <a
            href="https://social-innovation.hitachi/en-eu/"
            target="_blank"
            className="underline nue-bold mt-[16px] block cta cursor-pointer"
          >
            Social Innovation : Hitachi
          </a>
        </div>
      </div>
    </>
  );
};

export default DataCenter;
