import React, { useRef } from "react";
import Glow from "./Glow.jsx";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { FeaturesCN } from "../CONSTANTS.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
const Features = () => {
  const glowRef = useRef();
  const videoRef = useRef();
  const swiperRef = useRef(null);

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
    <div className="relative mt-40 ">
      <div className="relative text-[5rem] text-[rgb(200,194,189)] font-semibold tracking-[-1.2px] leading-none flex flex-col items-center justify-center  ">
        <h2>Strength.Beauty.</h2>
        <div className="relative flex items-center justify-center">
          <h2 className="absolute z-0 pointer-events-none top-0 ">Titanium.</h2>
        </div>
        <div className="">
          <div className=" z-100 text-center opacity-0 " ref={glowRef}>
            <Glow text={"Titanium."} />
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
          <source src="seventh.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none 
                  bg-[radial-gradient(circle_at_40%_50%,#2C201A_0%,#000000_100%)] 
                  [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
<div className="realtive z-10">
          <div className="flex justify-center mx-auto container gap-60 text-[#86868B]">
            <p className="w-96">
              iPhone 16 Pro features a Grade 5 titanium design with a new,
              refined microblasted finish. Titanium has one of the highest
              strength-to-weight ratios of any metal, making these models{" "}
              <span className="text-white font-bold">
                incredibly strong and impressively light.
              </span>{" "}
              iPhone 16 Pro comes in four stunning colors — including new Desert
              Titanium.
            </p>
            <p className="w-96">
              Internal design improvements — including a 100 percent recycled
              aluminum thermal substructure and back glass optimizations that
              further dissipate heat — enable up to 20 percent{" "}
              <span className="text-white font-bold">
                {" "}
                better sustained performance
              </span>{" "}
              than iPhone 15 Pro. So you can do all the things you love — like
              high-intensity gaming — for longer.
            </p>
          </div>
          <div className="flex mt-40 justify-center items-center  mx-auto ">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[FreeMode]}
              spaceBetween={20}
              slidesPerView={"1.2"}
              freeMode={true}
              centeredSlides={true}
              grabCursor={true}
              className="w-full px-8 "
            >
              {FeaturesCN.map((feat) => (
                <SwiperSlide
                  key={feat.id}
                  className="!w-[500px] rounded-xl overflow-hidden "
                >
                  <img
                    src={feat.image}
                    alt={feat.id}
                    className="w-full rounded-xl"
                  />
                  <p className="bg-gradient-to-r from-[#EFCDBB] via-[#DAB8A4] to-[#A3735E] bg-clip-text text-transparent mt-8 text-[17px] font-semibold tracking-[-0.374px] leading-[25px] ml-15 w-[350px] ">
                    {feat.description}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
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
          <div className="flex justify-center mx-auto container gap-60 text-[#86868B] mt-20">
            <p className="w-96">
              New display technology allows us to route display data under
              active pixels with no distortion, resulting in thinner borders for
              larger 6.3-inch and 6.9-inch
              <span className="text-white font-bold">
                Super Retina XDR displays
              </span>{" "}
              that feel great in the hand.
            </p>
            <p className="w-96">
              iPhone 16 Pro is splash, water, and dust resistant.It also has our
              latest-generation Ceramic Shield material that’s
              <span className="text-white font-bold">
                {" "}
                two times tougher than any smartphone glass.
              </span>{" "}
              Talk about durable.
            </p>
          </div>
      </div>
</div>
    </div>
  );
};

export default Features;
