import React, { useContext } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { TransactionContext } from "../context/TransactionContext";

const SuccessfulAlert = () => {
  const transactionContext = useContext(TransactionContext);
  const { txn } = transactionContext;

  return (
    <div
      className=" bg-green-100 p-4 border-l-4 border-green-400"
      style={{ fontFamily: "Libre Franklin" }}
    >
      <div className="flex justify-center">
        <div className="flex-shrink-0 font-medium text-red-700 hover:text-red-600 "></div>
        <div className="ml-3">
          <a
            href={`https://etherscan.io/tx/${txn}`}
            target="_blank"
            type="button"
            style={{ fontFamily: "Libre Franklin" }}
            className=" px-3  font-medium text-green-700 hover:green-red-600"
          >
            Click to view transaction
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulAlert;
