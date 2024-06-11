"use client";
import React from "react";
import ConnectButton from "./ui/ConnectButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center  py-5 max-w-5xl mx-auto">
      <h2
        onClick={() => router.push("/")}
        className="text-xl cursor-pointer font-bold  text-white leading-4 rounded-xl p-2"
      >
        Buidl Assignment
      </h2>

      <div className="flex gap-5 items-center ">
        <Link
          href="/exchange"
          className="text-white  justify-center border-2 border-[#5773ff] rounded-full py-2 px-8  flex items-center"
        >
          {" "}
          <span className="font-medium text-base">Swap</span>
        </Link>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Nav;
