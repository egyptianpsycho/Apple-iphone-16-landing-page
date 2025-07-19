import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom-=70% top",
          scrub: true,
        },
        y: -300,
        opacity: 0,
        ease: "power2.out",
      });

      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom center",
          scrub: true,
        },
        scale: 0.5,
        filter: "brightness(1) ",
        ease: "power2.out",
      });

      ScrollTrigger.create({
        trigger: videoRef.current,
        start: "top 80%",
        end: "bottom 20%",
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="h-[200vh] relative bg-black mt-140 ">
        <div className="sticky top-0 h-screen w-full">
          <div
            ref={containerRef}
            className="relative w-full h-full"
            style={{
              transform: "scale(2)",
              filter: "brightness(0.7) ",
              transition: "transform 0.3s ease",
            }}
          >
            <img
              src="./man.png"
              alt="iPhone Frame"
              className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none scale-105 "
            />

            <img
              ref={videoRef}
              src="./mann.jpg"
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover 2xl:rounded-[90px]   z-0"
            />
          </div>
          <div
            ref={textRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[80px] tracking-[-1.2px] leading-[84px] font-semibold text-center z-10"
          >
            4K 120 fps Dolby Vision.
            <br />
            Cinemasterful.
          </div>
        </div>
      </section>

      <section className="flex  justify-center gap-10 px-20 flex-col items-center relative bottom-50  bg-black text-white mt-15">
        
        <div className="flex justify-center gap-72 px-20  bg-black text-white">
          <div className="flex justify-center gap-5 flex-col max-w-xl text-[21px]">
            <p className="text-[#86868B] w-[450px] font-semibold">
              iPhone 16 Pro adds a second 48MP camera to the Pro camera system.
              The new 48MP Ultra Wide camera has a more advanced quad-pixel
              sensor for super-high-resolution 48MP ProRAW and HEIF photos with
              autofocus.
            </p>
          </div>
          <div className="flex justify-center gap-28 flex-col max-w-xl font-semibold w-[400px]">
            <p className="text-[#86868B] text-[21px] ">
              So you can{" "}
              <span className="text-[#EFCDBB]">
                capture a mesmerizing new level of detail
              </span>{" "}
              in macro photos and sweeping, wide-angle shots.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParallaxImage;
