"use client";

import { useEffect } from "react";

const Tooltip = ({
  className,
  text,
  id,
  isActive,
  onToggle,
}: {
  className: string;
  text: string;
  id: string;
  isActive: boolean;
  onToggle: (id: string) => void;
}) => {
  useEffect(() => {
    if (isActive) {
      const handleScroll = () => {
        onToggle(id);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isActive, onToggle, id]);

  
  const handleParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); 

    const firstClass = className.split(" ")[0];
  
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as any).gtag("event", "click", {
        event_category: firstClass,
      });
    }
  
    onToggle(id);
  };  

  return (
    <div
      className={`${className} transition-all duration-300 ease-in-out delay-150 absolute ${
        isActive ? "z-[99999]" : "z-[10]"
      }`}
      onClick={handleParentClick}
    >
      <div className="relative size-[23px]">
        <div
          className={`absolute z-[99] ${
            isActive ? "size-[15px]" : "animate-ringPulse size-[23px]"
          } transition-all duration-500 ease-in-out top-1/2 bottom-1/2 left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] shadow-[0px_0px_9px_0px_rgba(0,0,0,0.3)] flex items-center bg-[#FAFAFA] border-[2px] border-[#FFFFFF] justify-center rounded-full`}
        ></div>
        <div className="bg-[#FAFAFA] absolute z-[999] top-1/2 bottom-1/2 left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] size-[13px] rounded-full shadow-[0px_0px_9px_0px_#000000CC]"></div>
        <div
          className={`fixed z-[99999] ${
            isActive ? "scale-100" : "scale-0"
          } transition-all duration-500 ease-in-out top-[40%] md:top-[-5%] lg:top-0 left-[50%] right-[50%] translate-x-[-50%] bg-white shadow-[2px_1px_13px_0px_rgba(0,0,0,0.12)] text-black text-[14px] leading-[19px] p-[15px] md:p-[12px] rounded-[15px] w-[265px] h-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          {text}
          <img
            src="https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/close.svg"
            alt="Close"
            className="w-[10px] h-[10px] absolute right-[12px] top-[12px] flex md:hidden"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Tooltip;