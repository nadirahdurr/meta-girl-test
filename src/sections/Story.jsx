import React, { useState } from "react";
import Sound from "react-sound";
import StoryAudio from "../assets/metagirl-audio/SAMMYDROPTRAILER.mp3";
import { FaPlay, FaStop } from "react-icons/fa";

const Story = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="">
      <div
        className="md:mt-2 mt-3 mb-4 text-[14px] md:text-[45px] font-bold text-[#231c0d] sm:tracking-tight"
        style={{ fontFamily: "Orbitron" }}
      >
        <button
          className=" text-[20px] md:text-[45px] font-bold text-[#231c0d] sm:tracking-tight"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying ? (
            <FaPlay className="md:text-4xl text-sm text-[#231c0d] hover:text-[#515340]" />
          ) : (
            <FaStop className="md:text-4xl text-sm text-[#231c0d] hover:text-[#515340] animate-pulse" />
          )}
        </button>
        <Sound
          url={StoryAudio}
          loop={false}
          playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
        />{" "}
        THE STORY BEHIND THE DIGITAL HEARTS
      </div>
      <p className="text-[#515340]" style={{ fontFamily: "Libre Franklin" }}>
        The end of times are upon us and we the human race have found ourselves
        in a post apocalyptic world. As a result of this immeasurable tragedy,
        the aftermath has left a treasured collection of 3,501 eternally beating
        hearts; These represent the only pure, never-ending love that ever
        existed on the face of our planet. The Blockchain, a digital landscape
        where love can beat infinitely on, has endlessly changed the condition
        of love. These Digital Hearts have endured destruction and are now
        scattered across the deserted earth awaiting discovery by those destined
        to wield them. Who will be the chosen ones?
      </p>
      <p style={{ fontFamily: "Libre Franklin" }}className="text-[#515340] uppercase font-bold text-[10px] md:text-[12px] mt-2" >Voiced by Robert Ricotta</p>
    </div>
  );
};

export default Story;
