import Sound from "react-sound";
import InfinityGaunlet from "../assets/metagirl-audio/INFINITYGAUNTLETEXPLAINED.mp3";
import React, {useState} from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaPlay, FaStop } from "react-icons/fa";

const FAQINFINITY = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    let pulse = 'animate-pulse'
    if (!isPlaying) {
        pulse = ''
    }
  return (
    <div>
      <div>
        <button
          className=" text-[20px] md:text-[45px] font-bold text-[#231c0d] sm:tracking-tight"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying ? (
            <FaPlay className="md:text-4xl text-sm text-[#231c0d] hover:text-[#515340]" />
          ) : (
            <FaStop className={`md:text-4xl text-sm text-[#231c0d] hover:text-[#515340] animate-pulse `}/>
          )}
        </button>
        <Sound
          url={InfinityGaunlet}
          loop={true}
          playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
        />
      </div>
    </div>
  );
};
export default FAQINFINITY