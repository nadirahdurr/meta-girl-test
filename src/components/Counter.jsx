import React, { useState, useEffect, useReducer } from "react";

const Counter = () => {
  let saveData = () => {
    localStorage.setItem("Object 1", "test object");
  };
  return (
    <div>
      <button onClick={saveData}>Save!</button>
    </div>
  );
};

export default Counter;
