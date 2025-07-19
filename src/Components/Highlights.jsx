import { CirclePlay } from "lucide-react";
import React from "react";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  return (
    <div className="bg-[#1D1D1F] pt-40 pb-56">
      <div className="ml-36">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-bold text-6xl text-[#F5F5F7]">
            Get the highlights.
          </h2>
          <a
            href="#"
            className="mr-48 text-[17px] text-[#2997ff] flex gap-2 justify-center items-center"
          >
            Watch the film <CirclePlay />
          </a>
        </div>
        <VideoCarousel />
      </div>
    </div>
  );
};

export default Highlights;
