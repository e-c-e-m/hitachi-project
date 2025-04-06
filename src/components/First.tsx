"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const First = () => {
  const sectionRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const mediaRef = useRef(null);

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
      const isSafari =
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
        /Apple/.test(navigator.vendor);
      setVideoSrc(isSafari ? "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completesafari.mp4" : "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completevideo.webm");
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
        .set(bottomTextRef.current, { y: 350, opacity: 0 })
        .set(bottomTextRef.current, { zIndex: -50 })
        .set(mediaRef.current, { zIndex: 99 })
        .to(topTextRef.current, { y: "-100vh", opacity: 0, duration: 1 })
        .to(
          bottomTextRef.current,
          { y: -50, opacity: 1, duration: 1 },
          "-=0.6"
        )
        .to(mediaRef.current, { y: "60vh", duration: 1 }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="first"
      className="h-screen relative overflow-y-visible w-full flex flex-col justify-center items-center"
    >
      <div className="flex flex-col md:justify-start justify-center w-full h-full max-w-[900px] mx-auto md:mt-32 px-8">
        <div
          ref={topTextRef}
          className="absolute top-24 left-0 px-7 right-0 text-[25px] md:text-[34px] leading-[32px] md:leading-[38px] font-[400] text-center  max-w-[780px] m-auto"
        >
          By 2050, seven in 10 people will live in cities, with the global urban population forecast to double. And people in cities use much more electricity than those living in rural areas.
        </div>
        <div
          ref={bottomTextRef}
          className="absolute top-[200px] px-7 left-0 right-0 z-0 text-[21px] md:text-[24px] leading-[28px] md:leading-[32px] text-center max-w-[620px] mx-auto translate-y-[100vh]"
        >
          <span className="nue-medium">
            As cities grow and adapt for the future, they are adopting better, cleaner and more efficient electrified heating and cooling, transport and industrial applications.
          </span>
          <br /><br />
          How are companies like Hitachi helping cities build this electric future?
        </div>
      </div>
      {isMobile ? (
        <img
          ref={mediaRef}
          src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completeImg.png"
          alt="Static representation"
          className="absolute w-full max-w-[600px] bottom-0 z-[200]"
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
            className={
              videoSrc === "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completesafari.mp4"
                ? "absolute w-full bottom-0"
                : "w-full absolute top-[30%] xl:top-12 left-0 right-0 z-[200]"
            }
          >
            <source src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completevideo.webm" type="video/webm" />
            <source src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/completesafari.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      )}
    </div>
  );
};

export default First;
