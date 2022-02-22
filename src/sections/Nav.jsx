import React, { useCallback, useEffect, useReducer } from "react";
import logo from "../assets/images/logo.png";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Authereum from "authereum";
import Alert from "../components/Alert";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { SiDiscord, SiTwitter } from "react-icons/si";

const INFURA_ID = "72ed9f10d5c943cca084d16e06879ac0";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
      chainId: 4,
    },
  },
  authereum: {
    package: Authereum,
    chainId: 4,
  },
  walletlink: {
    package: WalletLink,
    options: {
      infuraId: INFURA_ID,
      chainId: 4,
    },
  },
};

let web3Modal;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "rinkeby", // optional
    cacheProvider: false,
    disableInjectedProvider: false,
    providerOptions, // required
  });
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
  renderAlert: false,
};

function init() {
  return {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
    renderAlert: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RENDER_ALERT":
      return {
        ...state,
        renderAlert: action.renderAlert,
      };
    case "RESET_WEB3_PROVIDER":
      return init();
    default:
      throw new Error();
  }
}

const Nav = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId, renderAlert } = state;

  const connectWallet = useCallback(async () => {
    const provider = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();

    const network = await web3Provider.getNetwork();

    dispatch({
      type: "SET_WEB3_PROVIDER",
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    });

    dispatch({
      type: "RENDER_ALERT",
      renderAlert: network.chainId !== 4 ? true : false,
    });

    console.log("web3Provider", web3Provider);
    console.log("Connected", address);
    console.log("network", network);
  }, []);

  const disconnectWallet = useCallback(
    async function () {
      if (address == undefined) {
        connectWallet();
      } else {
        await web3Modal.clearCachedProvider();
        if (provider?.disconnect && typeof provider.disconnect === "function") {
          await provider.disconnect();
        }
        dispatch({
          type: "RESET_WEB3_PROVIDER",
        });
      }
    },
    [state.provider]
  );

  const renderConnectionButton = (str) =>
    str === null || str == undefined || str === "" ? (
      <button
        style={{ fontFamily: "Orbitron" }}
        onClick={connectWallet}
        className="bg-[#231c11] text-[#f2e2d3] font-bold w-[160px] h-[60px] rounded-md"
      >
        connect wallet
      </button>
    ) : (
      <button
        style={{ fontFamily: "Orbitron" }}
        onClick={disconnectWallet}
        className="bg-[#231c11] text-lg text-[#f2e2d3] font-bold w-[160px] h-[60px] rounded-md"
      >
        {str == undefined
          ? "connect wallet"
          : `disconnect ${
              str.substring(0, 6) + "..." + str.substring(str.length - 4)
            }`}
      </button>
    );

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnectWallet();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnectWallet]);

  return (
    <Disclosure
      as="nav"
      className="bg-[#72eae8] fixed top-0 left-0 right-0 z-10"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between md:h-[6rem] h-[4rem]">
              <div className="flex items-center">
                <div className="">
                  <img className="nav-icon" src={logo} alt="METAGIRL Logo" />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    {/* <a
                    href="#"
                    className="text-gray-3
                    \00 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold"
                  >
                    EXCLUSIVES
                  </a> */}
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 items-center">
                  {/* <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  <div className="nav-banner-right-wallet">
                    {renderConnectionButton(address)}
                  </div>
                  <a
                    href="https://discord.com/invite/Gsgd78aswK"
                    target="_blank"
                  >
                    <SiDiscord
                      className="cursor-pointer text-[#231c0d] text-2xl"
                      alt="METAGIRL Discord"
                    />
                  </a>
                  <a href="https://twitter.com/metagirldh" target="_blank">
                    <SiTwitter
                      className="cursor-pointer  text-[#231c0d] text-2xl"
                      alt="METAGIRL Twitter"
                    />
                  </a>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-[#231c0d] hover:text-[#231c0d] hover:bg-[#72eae8] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#231c0d]">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              {/* <Disclosure.Button
                as="a"
                href="#"
                className="text-[#231c0d] hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                EXCLUSIVES
              </Disclosure.Button> */}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex justify-center items-center px-5">
                <div className="">{renderConnectionButton(address)}</div>
                <div className="ml-3"></div>
              </div>
              <div className="flex justify-center mt-3">
                <a href="https://discord.com/invite/Gsgd78aswK" target="_blank">
                  <SiDiscord
                    className="cursor-pointer text-[#231c0d] text-2xl"
                    alt="METAGIRL Discord"
                  />
                </a>
                <a href="https://twitter.com/metagirldh" target="_blank">
                  <SiTwitter
                    className="cursor-pointer ml-2 text-[#231c0d] text-2xl"
                    alt="METAGIRL Twitter"
                  />
                </a>
              </div>
            </div>
          </Disclosure.Panel>
          {renderAlert ? <Alert /> : ""}
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
