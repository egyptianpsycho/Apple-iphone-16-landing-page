import React, { useRef, useState } from "react";
import { phonesModel } from "../CONSTANTS";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Model = () => {
  const [currentPhone, setCurrentPhone] = useState(phonesModel[0]);
  const imageRef = useRef(null);
  useGSAP(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {  autoAlpha: 0},
        {  autoAlpha: 1,duration: 1, ease: "power2.out" }
      );
    }
  }, [currentPhone]);
  return (
    <section className=" mt-10 bg-black mx-auto container pb-10 ">
      <h2 className="text-6xl font-semibold mt-20">Take a closer look.</h2>
      {currentPhone && (
        <img src={currentPhone.picture} ref={imageRef} className="opacity-0" />
      )}
      <div className="">
        <div className="z-10 flex flex-col gap-4 items-center">
          <p className="text-xs text-[#F5F5F7] font-medium">
            {currentPhone.description}
          </p>
          <div className="rounded-full flex justify-center items-center w-58 h-15 bg-neutral-800/80 backdrop-blur-md">
            {phonesModel.map((phone) => (
              <button
              key={phone.id}
                className="rounded-full shadow-lg p-4 mx-1.5 cursor-pointer border-b border-white/40 focus:ring-2 ring-white/85 hover:ring-2 duration-500 hover:ring-white/40  "
                style={{ backgroundColor: phone.theme }}
                onClick={() => {
                  setCurrentPhone(phone);
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
