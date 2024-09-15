import { FaLocationArrow } from "react-icons/fa";

import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-2 pb-10 relative" id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="background grid"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[48vw] text-center">
          Transform Health with{" "}
          <span className="text-purple">HealthSync AI</span>
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Connect with us today and discover how HealthSyn.AI can help you
          maintain your health details.
        </p>
        <a href="mailto:contact@healthsync.ai">
          <MagicButton
            title="Get Started"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex justify-center text-center w-full mt-10 items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          © 2024 HealthSyn.AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
