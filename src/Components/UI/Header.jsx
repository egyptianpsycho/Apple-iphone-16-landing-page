import React, {useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(()=> {
    gsap.fromTo("#fixedHeader",{
      y:-200,
      opacity:0,
    },{
      y:0,
      opacity:1,
      duration:0.5
    })
    
  },[hasScrolled])
  useGSAP(()=> {
    gsap.fromTo("#head",{
      y:-50,
      opacity:0,
    },{
      y:0,
      opacity:1,
      duration:1
    })
    
  },[!hasScrolled])

  return hasScrolled ? (
    <>
    {hasScrolled && <div className="h-15"/>}
      <header id="fixedHeader" className="opacity-0 fixed top-0 left-0 w-full z-50 p-4 border-b border-white/25 bg-[#161617CC] backdrop-blur-md transition-all duration-500">
        <div className="container mx-auto">
          <div className="flex justify-between items-center w-[90%]">
            <a href="#" className="sm:text-2xl text-lg font-semibold text-white sm:ml-80">
              iPhone 16 Pro
            </a>
            <div className="flex items-center gap-4">
              <ul className="flex text-white/80 gap-6 ">
                <li className="hover:text-white/90">Overview</li>
                <li>Switch from Android to iPhone</li>
                <li>Tech Spechs</li>
              </ul>
              <button className="rounded-full text-white px-4 py-1 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors duration-500 justify-center items-center">
                Buy
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  ) : (
    <header className="w-full mx-auto z-[1] opacity-0 " id="head">
      <ul className="flex justify-center gap-18  items-center text-sm  text-white/80">
        <img src="./Apple.png" alt="logo" width={20} />
        <li>Mac</li>
        <li>iPad</li>
        <li>iPhone</li>
        <li>Watch</li>
        <li>AirPods</li>
        <li>TV & Home</li>
        <li>Entertainment</li>
        <li>Support</li>
        <li>Where to Buy</li>
        <div className="flex justify-center">
          <SearchIcon
            className="cursor-pointer"
            color="white"
            width={20}
            strokeWidth="1.5"
          />
        </div>
      </ul>
    </header>
  );
};

export default Header;
