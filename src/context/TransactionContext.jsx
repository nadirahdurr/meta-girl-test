import React, { useEffect, useState, useReducer, useCallback } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Authereum from "authereum";

import {
  contractABI,
  contractAddress,
  VITE_INFURA_ID,
} from "../utils/constants";

export const TransactionContext = React.createContext();
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: VITE_INFURA_ID,
      chainId: 1,
    },
  },
  authereum: {
    package: Authereum,
    chainId: 1,
  },
  walletlink: {
    package: WalletLink,
    options: {
      infuraId: VITE_INFURA_ID,
      chainId: 1,
    },
  },
};

let web3Modal;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: false,
    disableInjectedProvider: false,
    providerOptions, // required
    theme: {
      background: "rgba(118,231,226,255)",
      main: "rgba(25,28,18,255)",
      secondary: "rgba(25,28,18,255)",
      border: "rgba(25,28,18,255)",
      hover: "rgba(118,231,226,255)",
    },
  });
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
  renderAlert: false,
  amount: 1,
  connected: false,
  preSaleList: null,
  preSaleActive: false,
  txn: null,
  mintComplete: false,
  insufficientFunds: false,
  maxMinted: false,
};

function init() {
  return {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
    renderAlert: false,
    amount: 1,
    connected: false,
    preSaleList: null,
    preSaleActive: false,
    txn: null,
    mintComplete: false,
    insufficientFunds: false,
    maxMinted: false,
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
        connected: action.connected,
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
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.amount,
      };
    case "SET_PRESALE_LIST":
      return {
        ...state,
        preSaleList: action.preSaleList,
      };
    case "IS_PRESALE_ACTIVE":
      return {
        ...state,
        preSaleActive: action.preSaleActive,
      };
    case "SET_TRANSACTION_LINK":
      return {
        ...state,
        txn: action.txn,
      };
    case "IS_MINT_COMPLETE":
      return {
        ...state,
        mintComplete: action.mintComplete,
      };
    case "IS_INSUFFICIENT_FUNDS":
      return {
        ...state,
        insufficientFunds: action.insufficientFunds,
      };
    case "IS_MAX_AMOUNT_MINTED":
      return {
        ...state,
        maxMinted: action.maxMinted,
      };
    case "RESET_WEB3_PROVIDER":
      return init();
    default:
      throw new Error();
  }
}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    provider,
    web3Provider,
    address,
    renderAlert,
    amount,
    connected,
    preSaleList,
    insufficientFunds,
    txn,
    mintComplete
  } = state;

  const handleInputChange = (e) => {
    dispatch({
      type: "SET_AMOUNT",
      amount: e.target.value,
    });

    e.preventDefault();
  };

  const handleIncrementClick = () => {
    if (state.amount >= 0 && state.amount < 5) {
      dispatch({
        type: "SET_AMOUNT",
        amount: amount + 1,
      });
    }
  };

  const handleDecrementClick = () => {
    if (state.amount > 0 && state.amount !== 1) {
      dispatch({
        type: "SET_AMOUNT",
        amount: amount - 1,
      });
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!provider) {
        return;
      } else {
        const accounts = await provider.listAccounts();
        if (accounts.length) {
          dispatch({
            type: "SET_ADDRESS",
            address: address[0],
          });
        } else {
          console.log("no accounts found");
        }
        console.log("accounts", accounts);
      }
    } catch (error) {
      console.log("no accounts found:", error);
    }
  };

  const connectWallet = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider: provider,
        web3Provider: web3Provider,
        address: address[0],
        chainId: network.chainId,
        connected: true,
      });

      dispatch({
        type: "RENDER_ALERT",
        renderAlert: network.chainId !== 1 ? true : false,
      });

      // console.log("provider", provider);
      // console.log("web3Provider", web3Provider);
      // console.log("Connected", address);
      // console.log("network", network);
      // console.log("addresses", address);
    } catch (error) {
      console.log(error);

      throw new Error("No Provider Object");
    }
  }, []);

  const sendTransaction = async () => {
    const provider = state.provider;

    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();

    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    try {
      if (connected) {
        const preSaleActive = await transactionContract.preSaleActive();
        const publicSaleActive = await transactionContract.publicSaleActive();

        const preSaleTransactionValue = (amount * 0.05).toFixed(2).toString();
        const publicSaleTransactionValue = (amount * 0.07)
          .toFixed(2)
          .toString();

        if (preSaleActive) {
          let preSaleTxn = await transactionContract.preSaleMint(state.amount, {
            value: ethers.utils.parseEther(preSaleTransactionValue)._hex,
          });

          console.log(
            `Minted, see transaction: https://etherscan.io/tx/${preSaleTxn.hash}`
          );

          dispatch({
            type: "SET_TRANSACTION_LINK",
            txn: preSaleTxn.hash,
          });

          dispatch({
            type: "IS_MINT_COMPLETE",
            mintComplete: true,
          });
        } else if (publicSaleActive) {
          let publicSaleTxn = await transactionContract.publicSaleMint(
            state.amount,
            { value: ethers.utils.parseEther(publicSaleTransactionValue)._hex }
          );

          console.log(
            `Minted, see transaction: https://etherscan.io/tx/${publicSaleTxn.hash}`
          );

          dispatch({
            type: "SET_TRANSACTION_LINK",
            txn: publicSaleTxn.hash,
          });

          dispatch({
            type: "IS_MINT_COMPLETE",
            mintComplete: true,
          });
        }
      }
    } catch (error) {
      if (error.code === "INSUFFICIENT_FUNDS") {
        dispatch({
          type: "IS_INSUFFICIENT_FUNDS",
          insufficientFunds: true,
        });
        // if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        //   dispatch({
        //     type: "IS_MAX_AMOUNT_MINTED",
        //     maxMinted: true,
        //   });
        // }
      }
      console.log(error.code);
      throw new Error(error);
    }
  };

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

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

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
    <TransactionContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        address,
        renderAlert,
        state,
        amount,
        txn,
        insufficientFunds,
        mintComplete,
        handleInputChange,
        handleIncrementClick,
        handleDecrementClick,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
