import React from "react";

const Hero = () => {
  return (
    <div className="relative flex flex-col justify-center  mx-auto   text-center  ">
      <h2 className="text-4xl font-semibold leading-[32px] absolute inset-0 top-58 tracking-[0.196px] z-10">
        iPhone 16 Pro
      </h2>
      <div className="w-full h-[1100px] overflow-y-hidden relative z-0">
        <video
          src="/HeroLarge.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-83"
        />
      </div>
      <div>
        <button className="relative w-fit  rounded-full text-white px-5 py-3 cursor-pointer bg-[rgb(0,113,227)] hover:bg-[rgb(0,118,223)] transition-colors duration-500 justify-center items-center text-xl font-semibold bottom-66">
          Buy
        </button>
      </div>
    </div>
  );
};

export default Hero;
