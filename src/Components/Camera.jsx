import React, { useEffect, useRef } from "react";
import Glow from "./Glow.jsx";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { CameraCN } from "../CONSTANTS.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
const Camera = () => {
  const glowRef = useRef();
  const videoRef = useRef();
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const scrollContainerRef = useRef();

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      let closestIndex = 0;
      let closestDistance = Infinity;

      videoRefs.current.forEach((video, i) => {
        const rect = video.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const videoCenter = rect.left + rect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const distance = Math.abs(videoCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      videoRefs.current.forEach((video, i) => {
        if (i === closestIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      glowRef.current,
      { autoAlpha: 0, opacity: 0 },
      {
        autoAlpha: 1,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: glowRef.current,
          start: "top 100%",
          toggleActions: "play none none reverse",
          scrub: true,
        },
      }
    );
    ScrollTrigger.create({
      trigger: videoRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        videoRef.current.play();
      },
      onLeave: () => {
        videoRef.current.pause();
      },
      onEnterBack: () => {
        videoRef.current.play();
      },
      onLeaveBack: () => {
        videoRef.current.pause();
      },
    });
  }, []);
  return (
    <div className="relative mt-40 bg-gradient-to-t from-gray-100/10 to-black min-h-screen ">
      <div className="relative text-[5rem] text-[rgb(200,194,189)] font-semibold tracking-[-1.2px] leading-none flex flex-col items-center justify-center  ">
        <h2>Take total</h2>
        <div className="relative flex items-center justify-center">
          <h2 className="absolute z-0 pointer-events-none top-0 whitespace-nowrap ">
            Camera Control
          </h2>
        </div>
        <div className="">
          <div className=" z-100 text-center opacity-0 " ref={glowRef}>
            <Glow text={"Camera Control"} />
          </div>
        </div>
      </div>
      <div className="relative  flex items-center justify-center mx-auto w-[87%] bottom-50 ">
        <video
          ref={videoRef}
          id="video"
          playsInline
          preload="auto"
          autoPlay
          muted
          className="w-full"
        >
          <source src="eights.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative overflow-hidden ">
        <div className="relative z-10 ">
          <div className="flex justify-center mx-auto container gap-60 font-medium text-[#86868B] text-[21px] tracking-[0.231px] leading-[29.0011px]">
            <p className="w-112">
              Now you can take the perfect photo or video in record time. Camera
              Control gives you an{" "}
              <span className="text-white font-bold">
                easier way to quickly access camera tools.
              </span>{" "}
              Simply slide your finger to adjust camera functions like exposure
              or depth of field, and toggle through each lens or use digital
              zoom to frame your shot — just how you like it.
            </p>
            <p className="w-96">
              Later this year, Camera Control will introduce a two-stage shutter
              that lets you
              <span className="text-white font-bold">
                {" "}
                automatically lock focus and exposure
              </span>{" "}
              a light press — so you can reframe your shot without losing focus
              on your subject.
              <a href="#" className="mt-10">
                How to use Camera
              </a>
            </p>
          </div>
          <div
            className="mt-30 overflow-x-auto scroll-smooth  pr-120 pl-70 scrollbar-hide  "
            ref={scrollContainerRef}
          >
            <div className="inline-flex gap-8">
              <div className="w-[10vw] flex-shrink-0"></div>{" "}
              {CameraCN.map((cam, index) => (
                <div
                  key={cam.id}
                  className="min-w-[500px] flex-shrink-0 rounded-xl overflow-hidden"
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={cam.video}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full rounded-xl"
                  />
                  <p className="text-[#86868B]  mt-8 text-[17px] font-semibold tracking-[-0.374px] leading-[25px] ml-9 w-[280px] ">
                    {cam.description}
                    <span className="text-white ">{cam.strong}</span>
                    {cam?.de}
                  </p>
                </div>
              ))}
              <div className="w-[50vw] flex-shrink-0"></div>
            </div>
          </div>
          <div className="flex justify-end mt-15 gap-3 mr-46">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="px-2 py-2 bg-gray-600/10  rounded-full"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="px-2 py-2 bg-gray-600/30  rounded-full"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="mt-40 mb-52 w-[64rem] rounded-3xl mx-auto bg-black ">
            <div className="relative flex justify-between items-center flex-1">
              <div className="flex flex-col ml-32 w-110">
                <h3 className="text-[#6E6E73] font-semibold text-[21px] leading-6 tracking-[0.231px]">
                  Visual intelligence
                </h3>
                <h2 className="mt-3 text-[#f5f5f7] font-semibold text-3xl tracking-[0.128px] leading-9">
                  See the world through an entirely new lens.
                </h2>
                <p className="mt-4 text-[19px] tracking-[0.228px] leading-[23px] text-[#6e6e73] font-semibold">
                  Use{" "}
                  <span className="text-[#f5f5f7]">visual intelligence</span>
                  through Camera Control to instantly learn about things you
                  see. Just{" "}
                  <span className="text-[#f5f5f7]">
                    point your iPhone 16 Pro to discover more
                  </span>{" "}
                  or interact with something in front of you. Search for where
                  to buy a new item you spotted, identify plants and animals,
                  and more.
                </p>
              </div>
              <div className="mr-6 overflow-hidden">
                <img
                  src="./visual_intelligence.jpg"
                  alt="visual_intelligence"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
