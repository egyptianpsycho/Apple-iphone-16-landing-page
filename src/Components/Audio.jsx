import React from "react";

const Audio = () => {
  return (
    <section className="mt-20 p-80 ">
      <div className="flex items-center justify-center flex-col mx-auto container">
        <h2 className="text-[64px] font-semibold leading-[68px] tracking-[-0.576px] text-center mb-12">
          Audio Mix.
          <br />
          Make your voice heard.
        </h2>
        <p className="max-w-4xl text-center text-[21px] font-semibold tracking-[0.231px] leading-[29.001px] text-[rgb(134,134,139)]">
          Powered by advanced intelligence and Spatial Audio capture, Audio Mix
          lets you{" "}
          <span className="text-[#F5F5F7]">
            adjust the way voices sound in your videos
          </span>
          using three different voice options. Want to decrease background
          sound? Or just focus on the voices that are in frame? Simply select
          the mix and adjust intensity to get the sound you want after video
          capture.
        </p>
        <img src="./audio.jpg" alt="audio" className="mt-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-30 mt-20 w-full max-w-5xl mx-auto font-semibold">
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-[0.231px] leading-[29.001px] text-[21px] text-[#f5f5f7] mb-2 ">
              In-frame
            </h3>
            <div className="border-b border-white/40" />
            <p className="leading-[25px] tracking-[-0.374px] font-semibold text-[17px] text-[rgb(134,134,139)] mt-3">
              Only captures the voices of the people on camera, even if people
              off-camera are talking during the recording.
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-[0.231px] leading-[29.001px] text-[21px] text-[#f5f5f7] mb-2 ">
              Studio
            </h3>
            <div className="border-b border-white/40"></div>
            <p className="leading-[25px] tracking-[-0.374px] font-semibold text-[17px] text-[rgb(134,134,139)] mt-3">
              Makes voices sound like you’re recording in a professional studio
              equipped with sound-dampening walls. Great for vloggers or
              podcasters because the recording will sound like the mic is close
              to the subject’s mouth, even if it’s a few feet away.
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-[0.231px] leading-[29.001px] text-[21px] text-[#f5f5f7] mb-2 ">
              Cinematic
            </h3>
            <div className="border-b border-white/40"></div>
            <p className="leading-[25px] tracking-[-0.374px] font-semibold text-[17px] text-[rgb(134,134,139)] mt-3">
              Captures all of the voices around you and consolidates them toward
              the front of the screen — just like sound is formatted for the
              movies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audio;
