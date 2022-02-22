import roadmap from "../assets/images/Metagirl_Roadmap.png";
import { useEffect } from "react";
import Aos from 'aos'
import "aos/dist/aos.css"

const Roadmap = () => {
  useEffect(() => {
    Aos.init({duration: 1000});

  },[])
  return (
    <div className="">
      <div
        className="mt-1 mb-4 text-[20px] md:text-[65px] font-bold text-[#231c0d] sm:tracking-tight"
        style={{ fontFamily: "Orbitron" }}
      >
        <center>PULSE 1.0</center>
      </div>
      <center>
        <img data-aos="fade-up"
          className="flew justify-center lg:m-[-20rem] md:m-[-15rem] m-[-7rem] md:max-w-5xl mb-[1px]"
          src={roadmap}
        />
      </center>
      {/* <img class="roadmap-text" src={roadmap} /> */}
      {/* <img class="roadmap-background" src="/assets/images/gradient-white-background.png" /> */}
      {/* <img class="content-box" src="/assets/images/content-box-img.png" /> */}
    </div>
  );
};

export default Roadmap;
