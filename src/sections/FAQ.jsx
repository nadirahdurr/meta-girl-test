import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Aos from 'aos'
import "aos/dist/aos.css"
import MetaInfinity from '../assets/images/infinity-meta.png'

const faqs = [
  {
    question: "WHAT IS AN NFT?",
    answer:
      "An NFT stands for “Non Fungible Token” or a “Digital Certificate of Authenticity of a virtual asset” Since they’re non-fungible (irreplaceable) it cannot be traded. It holds scarcity and limitation. Every digital asset is stored on what is called the BLOCKCHAIN, a public ledger where every transaction is public and fully transparent. Each NFT has their own string of numbers & letters, creating their own UNIQUE one of a kind code. With individual smart contracts tied to each of them, they are impossible to copy. Think of it like trying to print out a video and share it…it just can’t be done.",
  },
  {
    question: "WHAT WILL I NEED?",
    answer:
      "We suggest looking into acquiring cryptocurrency via crypto exchanges such as Coinbase, Crypto.com & Paypal. You will also need a trusted crypto wallet, such as MetaMask (Industry Standard), Coinbase Wallet or SafePal Wallet. If you would like some more assistance with this process, follow our Discord server and open a “support ticket” and our community willingly will assist you.",
  },
  {
    question: "WHEN IS MINT DATE + SUPPLY?",
    answer:
      "The mint date will be February 25th, 12AM EST. Pre-sale will last all weekend long. Public mint will be on Monday the 28th, also at 12AM EST. Total supply: 3,501. 700 of each ETH color and only one single 1:1. The winner of the 1:1 will receive a custom METAGIRL acoustic guitar (black) including a personalized message and signature from SAMMY.",
  },
  {
    question: "INFINITY GAUNTLET EXPLAINED?",
    answer:
      "If you notice there is a unique ETH jewel on the Digital Heart. The collection of 3,501 will be divided into 5 various colors, 700 of each ETH jewel color represented. (blue, red, green, yellow, purple), just like the infamous infinity gauntlet wielded by the almighty Thanos. Once one attains all 5 ETH jewels and completes their infinity gauntlet of Digital Hearts, they will then be rewarded with the BEATBOX; an exclusive package containing all kinds of goodies. These loyal members will also be granted access to the “The Gauntlet” discord chat where those who wield the maximum ethereal power can connect with each other. The lucky winner of the only 1:1 Golden Heart will receive a gifted, custom-made METAGIRL acoustic guitar (black) with the 2D render on the front of it, including a personalized message and signature from Sammy himself.",
    image: MetaInfinity
    },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FAQ = () => {
  return (
    <div className="lg:pt-80 md:pt-56 pt-1" style={{ fontFamily: "Orbitron" }}>
      <div data-aos="fade-up" className="max-w-7xl mx-auto py-12 px-20 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-[#231c0d]">
          <h2
            className="text-center text-[20px] md:text-[65px] font-bold text-[#231c0d] sm:tracking-tight"
            style={{ fontFamily: "Orbitron" }}
          >
            FAQ
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-[#231c0d]">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-[#231c0d]">
                        <span className="font-bold text-[#231c0d]">
                          {faq.question}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <center><p className="text-base text-[#515340] text-sm">{faq.answer}</p></center>
                      <center>{faq.image ? <img className="rounded-lg mt-5 w-[75%]" src={faq.image} /> : ""}</center>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
