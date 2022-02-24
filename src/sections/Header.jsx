import React, { useState, useEffect, useContext } from "react";
import Sound from "react-sound";
import MetaGirlAudio from "../assets/metagirl-audio/Sammy - Metagirl INSTRUMENTAL.mp3";
import { FaPlay, FaStop } from "react-icons/fa";
import { MetaCard } from "../components/metaCard";
import { MetaCardTwo } from "../components/metaCardTwo";
import { MetaCardThree } from "../components/metaCardThree";
import Aos from "aos";
import "aos/dist/aos.css";
import Gradient from "rgt";
import Story from "./Story";
import { TransactionContext } from "../context/TransactionContext";
// import { MetaHeartFour } from "../components/metaCardFour";

const Header = () => {
  const transactionContext = useContext(TransactionContext);

  const {
    state,
    handleInputChange,
    handleIncrementClick,
    handleDecrementClick,
    sendTransaction,
    renderAlert,
  } = transactionContext;
  const [isPlaying, setIsPlaying] = useState(false);

  const mintMetaHeart = (e) => {
    // if (state.amount => 5) {
    e.preventDefault();
    sendTransaction();
    // }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className=".container">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-4">
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
          <div
            className="text-[#515340] xl:text-[20px] lg:text-[80%] text-[60%] md:mb-10"
            style={{ fontFamily: "Libre Franklin" }}
          >
            {" "}
            The Digital Heart Collection and Music NFT By Sammy Arriaga
          </div>

          <p className="max-w-xl my-5	md:mb-10 mx-auto text-xl text-[##f2e2d3]">
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {!isPlaying ? (
                <FaPlay className="md:text-2xl text-xl text-[#231c0d] hover:text-[#515340]" />
              ) : (
                <FaStop className="md:text-2xl text-xl text-[#231c0d] hover:text-[#515340] animate-pulse" />
              )}
            </button>
            <Sound
              url={MetaGirlAudio}
              loop={true}
              playStatus={
                isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
              }
            />
          </p>
          <div
            className="flex justify-center md:mb-5 mb-2 font-bold text-[10px] md:text-[15px] text-[#231c11]"
            style={{ fontFamily: "Libre Franklin" }}
          >
            {" "}
            {state.preSaleList === "0x00" && state.preSaleActive
              ? "Sorry your wallet is not on the presale list."
              : ""}
          </div>
          <div className="flex justify-center mt-5">
            <div className="pr-2">
              <button
                className="rounded-lg bg-[#231c11] md:text-[20px] text-[#f2e2d3] font-bold w-10 h-10"
                onClick={handleDecrementClick}
              >
                -
              </button>
            </div>
            <input
              className="rounded-lg w-12 h-10 pl-5"
              min="1"
              max="5"
              name="amount"
              type="number"
              value={state.amount}
              onChange={handleInputChange}
            />
            <div className="pl-2">
              <button
                className="rounded-lg bg-[#231c11] md:text-[20px] text-[#f2e2d3] font-bold md:w-25 w-10 h-10"
                onClick={handleIncrementClick}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-center md:mb-4 mb-2 mt-5">
            <button
              onClick={mintMetaHeart}
              className="bg-[#231c11] text-[#f2e2d3] font-bold w-[180px] h-[50px] md:w-[200px] md:h-[65px] md:text-lg text-xs rounded-md"
              style={{ fontFamily: "Orbitron" }}
              disabled={state.amount > 5 || state.amount < 0 || renderAlert}
            >
              MINT
            </button>
          </div>
          <div
            className="flex justify-center md:mb-14 mb-6 font-bold text-[#231c11] text-[10px] md:text-[15px]"
            style={{ fontFamily: "Libre Franklin" }}
          >
            {(state !== null || state != undefined) &&
            (state.amount > 5 || state.amount < 0)
              ? "*Mint max is 5 per wallet"
              : ""}
          </div>
          <div
            className="flex justify-center md:mb-14 mb-6 font-bold text-[#231c11] text-[10px] md:text-[15px]"
            style={{ fontFamily: "Libre Franklin" }}
          >
            {(state !== null || state != undefined) &&
            (state.amount > 5 || state.amount < 0)
              ? "*Mint max is 5 per wallet"
              : ""}
          </div>
          <Story />

          {/* <div
            data-aos="flip-up"
            className="md:flex justify-center hidden  md:visible"
          >
            <MetaCard />
            <MetaCardTwo />
            <MetaCardThree />
          </div> */}

          {/* <div data-aos="flip-up" className="visible  md:hidden">
            <MetaCard />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
