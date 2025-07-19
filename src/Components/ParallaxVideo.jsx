import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ParallaxVideo = () => {
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
          end: "bottom-=70% top", // End fade near section end
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
        onEnter: () => videoRef.current.play(),
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ⬇️ This section is pinned and animated */}
      <section ref={sectionRef} className="h-[200vh] relative bg-black mt-60">
        <div className="sticky top-0 h-screen w-full">
          <div
            ref={containerRef}
            className="relative w-full h-full"
            style={{
              transform: "scale(1.5)", // Initial zoom
              filter: "brightness(0.7) ",
              transition: "transform 0.3s ease",
            }}
          >
            {/* Frame overlay */}
            <img
              src="./frame.png"
              alt="iPhone Frame"
              className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none scale-105 "
            />

            {/* Video inside frame */}
            <video
              ref={videoRef}
              src="./hourses.mp4"
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

      {/* ⬇️ This content scrolls in after the pinned section */}
      <section className="flex  justify-center gap-10 px-20 flex-col items-center relative bottom-50  bg-black text-white">
        <span className="font-medium text-[#86868B] text-[14px] tracking-[-0.224px] leading-[18.0008px]">
          A herd of Icelandic horses, captured in stunning 4K 120 fps Dolby
          Vision
        </span>
        <div className="flex justify-center gap-30 px-20  bg-black text-white">
          <div className="flex justify-center gap-5 flex-col max-w-xl text-[21px]">
            <p className="text-[#86868B] w-[550px] font-semibold">
              iPhone 16 Pro takes video capture to a whole new level with{" "}
              <span className="text-[#EFCDBB]">4K 120 fps Dolby Vision</span> —
              our highest resolution and frame rate combo yet. Enabled by the
              new 48MP Fusion camera with second-generation quad-pixel sensor
              and our powerful A18 Pro chip, iPhone 16 Pro lets you record 4K
              120 fps Dolby Vision in video mode or slo-mo.
            </p>
            <p className="text-[#86868B] w-[550px] font-semibold">
              And now you can{" "}
              <span className="text-[#EFCDBB]">
                adjust the playback speed after capture
              </span>{" "}
              in the redesigned Photos app, giving you greater editing
              capabilities. To add a dreamy quality to your shot, try out the
              new half-speed option. Or for a cinematic effect, slow it right
              down to 24 fps playback.
            </p>
          </div>
          <div className="flex justify-center gap-28 flex-col max-w-xl font-semibold w-[550px]">
            <h2 className="text-[40px] font-semibold leading-[44px] ">
              <span className="text-[#EFCDBB]">
                Highest-quality video <br />
              </span>{" "}
              in a smartphone
            </h2>
            <p className="text-[#86868B] text-[21px] ">
              iPhone 16 Pro also provides{" "}
              <span className="text-[#EFCDBB]">
                a big leap in audio performance
              </span>{" "}
              with four studio-quality mics for higher-quality recording. They
              provide a lower noise floor so you get more true-to-life sounds.
              New Spatial Audio capture makes your videos sound more immersive
              when listening with AirPods. And thanks to wind noise reduction,
              the audio quality is even clearer. AudioAudio Mix. Make your voice
              heard. Audio Mix.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParallaxVideo;
