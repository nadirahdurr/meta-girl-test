import React, { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { TransactionContext } from "../context/TransactionContext";

const ErrorAlert = () => {
  const transactionContext = useContext(TransactionContext);
  const { insufficientFunds } = transactionContext;
  return (
    <div
      className="bg-red-300 border-l-4 border-red-400 p-4"
      style={{ fontFamily: "Libre Franklin" }}
    >
      <div className="flex justify-center">
        <div className="">
          <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
        <div className="">
          <p className="text-xs text-red-700">
            <p className="font-medium text-red-700 hover:text-red-600">
              <ul role="list" className="list-disc pl-5 space-y-1">
                {insufficientFunds
                  ? "Insufficient funds to complete this transaction."
                  : ""}
                {/* {maxMinted ? "This wallet reached its maximum mints" : ""} */}
              </ul>{" "}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ErrorAlert;
