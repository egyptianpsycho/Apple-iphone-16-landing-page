import React from "react";
import Header from "./Components/UI/Header";
import Hero from "./Components/Hero";
import Highlights from "./Components/Highlights";
import Model from "./Components/Model";
import Features from "./Components/Features";
import Camera from "./Components/Camera";
import ParallaxVideo from "./Components/ParallaxVideo";
import Audio from "./Components/Audio";
import ParallaxImage from "./Components/ParallaxImage";

const App = () => {
  return (
    <div className="bg-[#000] min-h-screen text-white z-[-100]">
        <Header />
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <Camera />
        <ParallaxVideo />
        <Audio />
        <ParallaxImage />
    </div>
  );
};

export default App;
