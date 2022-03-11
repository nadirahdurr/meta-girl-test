import roadmap from "../assets/images/Metagirl_Roadmap1.0.png";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Roadmap = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="">
      <div
        className="md:mb-2 -md:m-2 text-[20px] md:text-[50px] font-bold text-[#231c0d] sm:tracking-tight"
        style={{ fontFamily: "Orbitron" }}
      >
        <center>PULSE 1.0</center>
      </div>
      <center>
        <img
          data-aos="fade-up"
          className="flew justify-center lg:m-[-20rem] md:m-[-18rem] m-[-7rem] md:max-w-5xl mb-[1px]"
          src={roadmap}
        />
      </center>
          </div>
  );
};

export default Roadmap;
