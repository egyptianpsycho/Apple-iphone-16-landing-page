import { useEffect, useRef, useState } from "react";
import { highlightsSlides } from "../CONSTANTS";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const startTimeRef = useRef(null);
  

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;
  const isVideo = !!highlightsSlides[videoId].video;
  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);
  const handleLoadedMetadata = (i, e) => {
    const actualDuration = e.target.duration;
    highlightsSlides[i].duration = actualDuration;
    setLoadedData((pre) => [...pre, e]);
  };
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    if (!span[videoId]) return;

    const duration = highlightsSlides[videoId]?.duration || 5;
    gsap.set(span[videoId], { width: "0%" });

    let anim = gsap.to(span[videoId], {
      duration,
      width: "100%",
      ease: "none",
      backgroundColor: "white",
      onUpdate: () => {
        const progress = Math.ceil(anim.progress() * 100);
        if (progress !== currentProgress) {
          currentProgress = progress;
          gsap.to(videoDivRef.current[videoId], {
            width:
              window.innerWidth < 760
                ? "10vw"
                : window.innerWidth < 1200
                ? "10vw"
                : "4vw",
          });
        }
      },
      onComplete: () => {
        if (isPlaying) {
          gsap.to(videoDivRef.current[videoId], { width: "12px" });
          gsap.to(span[videoId], { backgroundColor: "#afafaf" });
        }
      },
    });

    startTimeRef.current = performance.now();

    const animUpdate = () => {
      if (isVideo) {
        const currentTime = videoRef.current[videoId]?.currentTime || 0;
        const duration = highlightsSlides[videoId]?.duration || 5;
        anim.progress(currentTime / duration);
      } else {
        const duration = highlightsSlides[videoId]?.duration || 5;
        const elapsed = (performance.now() - startTimeRef.current) / 1000;
        anim.progress(Math.min(elapsed / duration, 1));
      }
    };

    gsap.ticker.add(animUpdate);

    let timeoutId;
    if (!isVideo && isPlaying) {
      const duration = highlightsSlides[videoId]?.duration || 5;
      timeoutId = setTimeout(() => {
        if (videoId === highlightsSlides.length - 1) {
          handleProcess("video-last");
        } else {
          handleProcess("video-end", videoId);
        }
      }, duration * 1000);
    }

    return () => {
      gsap.ticker.remove(animUpdate);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;
      case "pause":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: false,
        }));
        break;

      default:
        return video;
    }
  };
  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((List, i) => (
          <div key={List.id} id="slider" className="sm:pr-5 pr-10">
            <div className="relative sm:w-[86vw] w-[88vw] md:h-[80vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                {List.video ? (
                  <video
                    id="video"
                    playsInline
                    preload="auto"
                    muted
                    className="w-full "
                    ref={(el) => {
                      videoRef.current[i] = el;
                    }}
                    onPlay={() => {
                      setVideo((prevVideo) => ({
                        ...prevVideo,
                        isPlaying: true,
                      }));
                    }}
                    onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                    onEnded={() =>
                      i !== 5
                        ? handleProcess("video-end", i)
                        : handleProcess("video-last")
                    }
                  >
                    <source src={List?.video} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={List?.picture}
                    alt="highlight"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute top-12 left-[4%] z-10">
                {List.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium ">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex justify-center items-center mt-10">
        <button
          className="rounded-full px-4 py-4 bg-[#424245B3] mr-4 cursor-pointer"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
              ? () => handleProcess("play")
              : () => handleProcess("pause")
          }
        >
          {isLastVideo ? (
            <RotateCcw />
          ) : isPlaying ? (
            <Pause />
          ) : (
            <Play fill="white" />
          )}
        </button>
        <div className="flex justify-center items-center py-5 px-7 bg-[#424245B3] backdrop-blur rounded-full">
          {highlightsSlides.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-[#F5F5F7] rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full "
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-end my-6 gap-3 mr-10">
        <button
          onClick={() => {
            if (videoId > 0)
              setVideo((prev) => ({
                ...prev,
                isEnd:true,
                isPlaying:false,
                startPlay:false,
                videoId: prev.videoId - 1,
              }));
              
          }}
          className="px-2 py-2 bg-gray-600/40  rounded-full"
        >
              <ChevronLeft />
        </button>

        <button
          onClick={() => {
            if (videoId < highlightsSlides.length - 1)
              setVideo((prev) => ({
                ...prev,
                isEnd:true,
                isPlaying:false,
                startPlay:false,
                videoId: prev.videoId + 1,
              }));
          }}
          className="px-2 py-2 bg-gray-600/40  rounded-full"
        >
              <ChevronRight />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
