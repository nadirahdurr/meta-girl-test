import React, { useState, useEffect } from "react";
// import Sound from "react-sound";
// import MetaGirlAudio from "../assets/metagirl-audio/Sammy - Metagirl INSTRUMENTAL.mp3";
import { FaPlay, FaStop } from "react-icons/fa";
import { MetaCard } from "../components/metaCard";
import { MetaCardTwo } from "../components/metaCardTwo";
import { MetaCardThree } from "../components/metaCardThree";
import Aos from "aos";
import "aos/dist/aos.css";
import Gradient from "rgt";
import Story from "./Story";

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className=".container">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <p
            data-aos="zoom-in-up"
            className="mt-1 text-[40px] md:text-[83px] font-extrabold text-[#231c0d] sm:tracking-tight 2xl:text-[160px] xl:text-[120px] lg:text-[100px]"
            style={{ fontFamily: "Orbitron" }}
          >
            <Gradient dir="left-to-right" from="black" to="#231c11">
              METAGIRL
            </Gradient>
          </p>
          <div className="text-[#515340] xl:text-[20px] text-[8px] md:mb-10" style={{ fontFamily: "Orbitron" }}> The Digital Heart Collection and Music NFT By Sammy Arriaga</div>

          {/* <p className="max-w-xl my-5	md:mb-10 mx-auto text-xl text-[##f2e2d3]">
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {!isPlaying ? (
                <FaPlay className="text-2xl text-[#231c0d] hover:text-[#515340]" />
              ) : (
                <FaStop className="text-2xl text-[#231c0d] hover:text-[#515340] animate-pulse" />
              )}
            </button>
            <Sound
              url={MetaGirlAudio}
              loop={true}
              playStatus={
                isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
              }
            />
          </p> */}
          <div className="flex justify-center md:mb-20 mb-10 mt-5">
            <button
              className="bg-[#231c11] text-[#f2e2d3] font-bold md:w-[160px] md:h-[50px] md:text-lg text-xs w-[80px] h-[25px] rounded-md"
              style={{ fontFamily: "Orbitron" }}
            >
              mint
            </button>
          </div>
          <Story />

          <div
            data-aos="flip-up"
            className="md:flex justify-center hidden  md:visible"
          >
            <MetaCard />
            <MetaCardTwo />
            <MetaCardThree />
          </div>

          <div data-aos="flip-up" className="visible  md:hidden">
            <MetaCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
