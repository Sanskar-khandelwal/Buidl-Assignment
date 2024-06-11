import { ChartButtonProps } from "@/utils/types";
import React from "react";

const ChartButton = ({ children, isActive, handleClick }: ChartButtonProps) => {
  return (
    <span
      className={`border-2 p-1 text-base w-12 text-center rounded-2xl ${
        isActive &&
        "border-[#5773ff] bg-white/80 text-black bg-gray-300 bg-opacity-40"
      }`}
      onClick={handleClick}
    >
      {children}
    </span>
  );
};

export default ChartButton;
