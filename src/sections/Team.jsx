import GoldenMeta from "../assets/images/golden-meta-2.jpeg";
import RedEth from "../assets/images/red-eth.png";
import BlueEth from "../assets/images/blue-eth.png";
import GreenEth from "../assets/images/green-eth.png";
import GoldEth from "../assets/images/gold-eth.png";
import PinkEth from "../assets/images/pink-eth.png";
import PurpleEth from "../assets/images/purple-eth.png";
import SilverEth from "../assets/images/silver-eth.png";
import { SiTwitter } from "react-icons/si";
import MetaGold from "../assets/images/meta-gold.jpeg"
import MetaGoldTwo from "../assets/images/meta-gold-2.jpeg"
import { useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

const Team = () => {
  const people = [
    {
      name: "Sammy",
      role: "Founder",
      imageUrl: RedEth,
      twitter: "https://twitter.com/SammyArriaga",
    },
    {
      name: "Smokey",
      role: "Project Manager",
      imageUrl: BlueEth,
      twiter: "https://twitter.com/BakedFoodieETH",
    },
    {
      name: "Kash",
      role: "Developer",
      imageUrl: GreenEth,
      twitter: "https://twitter.com/0xKash_",
    },
    {
      name: "Nadirah",
      role: "Developer",
      imageUrl: GoldEth,
      twitter: "https://twitter.com/nadirahlinaa",
    },
    {
      name: "Megan",
      role: "Artist",
      imageUrl: PinkEth,
      twitter: "https://twitter.com/magnoliamegan_",
    },
    {
      name: "Haddy",
      role: "Artist",
      imageUrl: PurpleEth,
      twitter: "https://twitter.com/TheHaddy",
    },
    {
      name: "Logan",
      role: "Artist",
      imageUrl: SilverEth,
      twitter: "https://twitter.com/raspiarts",
    },
  ];

  useEffect(() => {
    Aos.init({duration: 1000});

  },[])
  return (
    <div className="">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 ">
          <div className="space-y-5 sm:space-y-4">
            <img
              data-aos="fade-right"
              className="rounded-md w-[300px] h-[200px]"
              src={GoldenMeta}
            />
            <img
              data-aos="fade-right"
              className="rounded-md w-[300px] h-[200px]"
              src={MetaGold}
            />
       <img
              data-aos="fade-right"
              className="rounded-md w-[300px] h-[200px]"
              src={MetaGoldTwo}
            />

          </div>
          <div className="lg:col-span-2">
            <h2
              className="text-[20px] md:text-[65px] font-bold tracking-tight md:pl-[90px] pl-[75px] text-[#231c0d]"
              style={{ fontFamily: "Orbitron" }}
            >
              TEAM
            </h2>
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <img
                      className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                      src={person.imageUrl}
                      alt="ethereum"
                    />
                    <div className=" text-lg leading-6 space-y-1 ">
                      <h3
                        className="h3 text-[#515340]"
                        style={{ fontFamily: "Orbitron" }}
                      >
                        {person.name}
                      </h3>
                      <p
                        style={{ fontFamily: "Orbitron" }}
                        className="text-[#231c0d] font-bold"
                      >
                        {person.role}
                      </p>
                      <a href={person.twiter} target="_blank">
                        <SiTwitter
                          className="cursor-pointer text-[#231c0d] space-y-1 ml-[20px] text-2xl "
                          alt={`${person}'s-twitter`}
                        />
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
