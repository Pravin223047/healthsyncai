"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { myProjects } from "../../constants";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

const projectCount = myProjects.length;

const ImportantFeatures = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction: string) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      `.animatedText`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
    );
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="w-full py-20">
      <p className="text-2xl md:text-4xl w-full items-center justify-center text-center">
        🤖 <span className="head-text">Important Features</span> 🤖
      </p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl border-2 rounded-lg border-slate-900 shadow-black-200">
          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-full rounded-lg flex items-center justify-between gap-2"
            style={currentProject.logoStyle}
          >
            <div className="w-10 h-10 flex justify-center items-center text-4xl shadow-sm">
              {currentProject.logo}
            </div>
            {currentProject.title}
            <div className="w-10 h-10 flex justify-center items-center text-4xl shadow-sm">
              {currentProject.logo}
            </div>
          </div>
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-lg font-semibold animatedText xl:text-2xl">
              {currentProject.title}
            </p>
            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo text-2xl">
                  {tag.path}
                </div>
              ))}
            </div>
            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>View Live Project</p>
              <ArrowUp />
            </a>
          </div>
          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn flex items-center justify-center"
              onClick={() => handleNavigation("previous")}
            >
              <ArrowLeft />
            </button>

            <button
              className="arrow-btn flex items-center justify-center"
              onClick={() => handleNavigation("next")}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        <div className="border border-black-300 bg-black-200 rounded-lg h-full flex items-center justify-center">
          <img
            src={currentProject.texture}
            alt={currentProject.title}
            className="bg-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default ImportantFeatures;
