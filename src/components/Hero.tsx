"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const overlayRef = useRef(null);
  const invisibleTextRef = useRef(null);

  const [videoSrc, setVideoSrc] = useState("/hero.webm"); // Default video source

  useEffect(() => {
    // Check if the browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Function to update the video source based on screen width
    const updateVideoSrc = () => {
      if (window.innerWidth < 1025) {
        setVideoSrc(isSafari ? "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/mobilehero.mp4" : "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/hero-main-mobile.webm");
      } else {
        setVideoSrc(isSafari ? "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/hero-alt.mp4" : "https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/hero-main-desktop.webm");
      }
    };

    updateVideoSrc(); // Set on initial render
    window.addEventListener("resize", updateVideoSrc); // Listen for window resize

    return () => window.removeEventListener("resize", updateVideoSrc); // Cleanup
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { y: "100%" },
      { y: "0%", duration: 2.5, ease: "power4.out", delay: 0.5 }
    );

    const colorTl = gsap.timeline({ repeat: -1, delay: 3.4 });
    colorTl
      .to(invisibleTextRef.current, {
        color: "black",
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(invisibleTextRef.current, {
        color: "white",
        duration: 1,
        delay: 0.3,
        ease: "power2.inOut",
      });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: `#${sectionId}`, autoKill: false },
        ease: "power2",
        duration: 1,
      });
    }
  };

  return (
    <div
      id="hero"
      className="relative z-[10] h-screen w-full px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover absolute inset-0"
      ></video>
      <div className="absolute w-[25px] bottom-12 left-1/2 right-1/2 translate-x-[-50%] z-[999]">
        <img
          src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/arrow.svg"
          alt=""
          className="w-[20px] object-contain h-auto cursor-pointer"
          onClick={() => scrollToSection("first")}
        />
      </div>
    </div>
  );
};

export default Hero;