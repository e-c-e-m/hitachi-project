"use client";

import { useEffect, useState, useRef } from "react";

const Nav = () => {
  const [active, setActive] = useState<number>(0);
  const observersRef = useRef<IntersectionObserver | null>(null);

  const [isVisible, setIsVisible] = useState(true);

  const sections = [
    { id: "nav-power", index: 1 },
    { id: "nav-substain", index: 3 },
    { id: "nav-grid", index: 4 },
    { id: "nav-rail", index: 5 },
    { id: "nav-datacenter", index: 7 },
  ];

  const hiddenSections = ["hero", "first"];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const allSections = [...sections.map(({ id }) => id), ...hiddenSections]; // Track all sections

    const sectionElements = allSections.map((id) =>
      document.getElementById(id)
    );

    if (observersRef.current) observersRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.find(
              (section) => section.id === entry.target.id
            )?.index;
            if (index !== undefined) {
              setActive(index);
            }

            // Hide the navbar if any hidden section is visible
            setIsVisible(!hiddenSections.includes(entry.target.id));
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.6, // Trigger when 60% of the section is visible
      }
    );

    sectionElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    observersRef.current = observer;

    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   const sectionElements = sections.map(({ id }) =>
  //     document.getElementById(id)
  //   );

  //   if (observersRef.current) observersRef.current.disconnect();

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const index = sections.find(
  //             (section) => section.id === entry.target.id
  //           )?.index;
  //           if (index !== undefined) {
  //             setActive(index);
  //           }
  //         }
  //       });
  //     },
  //     {
  //       root: null, // viewport
  //       threshold: 0.6, // Trigger when 60% of the section is visible
  //     }
  //   );

  //   sectionElements.forEach((element) => {
  //     if (element) observer.observe(element);
  //   });

  //   observersRef.current = observer;

  //   return () => observer.disconnect();
  // }, []);

  return (
    <div
      className={`fixed md:block hidden bottom-[20px] left-[30px] w-[420px] h-auto z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {sections.map(({ id, index }) => (
        <div
          key={id}
          onClick={() => scrollToSection(id)}
          className={`w-[72px] absolute ${
            id === "nav-power"
              ? "bottom-0 left-[0.19px]"
              : id === "nav-substain"
              ? "bottom-[40px] left-[37px]"
              : id === "nav-grid"
              ? "bottom-[-2.2px] left-[73px]"
              : id === "nav-rail"
              ? "bottom-[40px] left-[110px]"
              : "bottom-[-2px] left-[146px]"
          } group`}
        >
          <img
            src={`https://ft-shorthand-prod-eu.s3.amazonaws.com/partnercontent/hitachi/dist/nav/nav${index}.png`}
            alt={id}
            className={`w-full cursor-pointer transition-all duration-300 ease-in-out ${
              active === index ? "opacity-[1]" : "opacity-[0.5]"
            } group-hover:scale-[1.03] group-hover:opacity-[0.75]`}
          />
          <div className="bg-[#ffffff] text-[14px] text-nowrap absolute z-[99] bottom-[70px] group-hover:scale-[1] scale-0 transition-all duration-300 ease-in-out translate-y-[50px] group-hover:translate-y-0 backdrop-blur-md left-0 leading-[1] text-black p-[12px] rounded-[15px] shadow-[2px_1px_13px_0px_rgba(0,0,0,0.12)]">
            {id === "nav-power"
              ? "Power transmission"
              : id === "nav-substain"
              ? "Substations"
              : id === "nav-grid"
              ? "Digital grids"
              : id === "nav-rail"
              ? "Battery-powered trains"
              : "Data centres"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Nav;
