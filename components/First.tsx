"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const First = () => {
  const sectionRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const imageRef = useRef(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

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
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /Apple/.test(navigator.vendor);
        setVideoSrc(isSafari ? "completesafari.mp4" : "/completevideo.webm");
      }
    }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            scrub: 1,
            pin: true,
          },
        })
        .to(topTextRef.current, { y: "-100vh", opacity: 0, duration: 1 })
        .to(bottomTextRef.current, { y: -100, duration: 1 }, "-=0.6")
        .to(imageRef.current, { y: "60vh", duration: 1 }, "-=0.2")
        // .to(bottomTextRef.current, { y: 0, duration: 0.6 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="first"
      className="h-screen relative overflow-hidden w-full flex flex-col justify-center items-center "
    >
      <div className="flex flex-col md:justify-start justify-center w-full h-full max-w-[900px] mx-auto md:mt-32 px-8">
        <div
          ref={topTextRef}
          className="absolute top-24 left-0 px-7 right-0 text-[25px] md:text-[34px] leading-[32px] md:leading-[38px] font-[400] text-center"
        >
          An unprecedented shift in power generation and{" "}
          <br className="md:block hidden" /> energy use is under way, as nations
          endeavour to <br className="md:block hidden" />
          <span className="nue-medium">
            move away from fossil fuels to electricity
          </span>
        </div>
        <div
          ref={bottomTextRef}
          className="absolute top-[200px] px-7 left-0 right-0 z-[99] text-[21px] md:text-[24px] leading-[28px] md:leading-[32px] text-center max-w-[600px] mx-auto translate-y-[100vh]"
        >
          Companies are working to create a{" "}
          <span className="nue-medium">
            complex web of novel infrastructure{" "}
          </span>
          to accelerate world cities on their journey to a more sustainable,
          “everything electric” future.
        </div>
      </div>

      <>
        {videoSrc && (
          <video 
          ref={imageRef} 
          src={videoSrc}
          autoPlay
          muted
          playsInline
          >
            <source src="/completevideo.webm" type="video/webm" className="w-full h-auto absolute  top-0 left-0 right-0" />
            <source src="/completesafari.mp4" type="video.mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        </>
      
    </div>
  );
};

export default First;
