"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SidebarProps } from "@/utils/types";

// Binance WebSocket URL
const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws/";

const Sidebar = ({
  name,
  symbol,
  image,
  initialPrice,
  initialMarketCap,
  marketCapRank,
  high,
  low,
}: SidebarProps) => {
  const [price, setPrice] = useState(initialPrice);
  const [marketCap, setMarketCap] = useState(initialMarketCap);

  useEffect(() => {
    const ws = new WebSocket(
      `${BINANCE_WS_URL}${symbol.toLowerCase()}usdt@ticker`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, "web socket data");

      // Check if the received data contains the required fields
      if (data && data.c && data.q) {
        setPrice(parseFloat(data.c));
        setMarketCap(parseFloat(data.q));
      } else {
        console.warn("Unexpected WebSocket data format", data);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      ws.close();
    };
  }, [name]);

  return (
    <div className="md:border-r border-[#323546] text-white h-screen flex justify-center items-center md:mt-5 mt-3">
      <div className="md:px-10 px-5">
        <Image
          src={image}
          width={200}
          height={200}
          alt={`a ${name} logo`}
          className="rounded-full md:w-52 md:h-52 h-30 w-30 mx-auto"
        />
        <h1 className="text-xl md:text-2xl font-bold text-center mt-3 md:mt-5">
          {name}
        </h1>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-3xl underline mt-10">
            Details about {name}
          </h1>
          <p className="text-xl md:text-2xl text-white mt-3 md:mt-5">
            <span className="text-lg md:text-2xl  text-white">Price:</span> $
            <span className="font-medium">{price}</span>
          </p>
          <p className="text-xl md:text-2xl text-white">
            <span className="text-lg md:text-2xl  text-white">Market Cap:</span>{" "}
            $
            <span className="font-medium text-base md:text-lg">
              {marketCap}
            </span>
          </p>
          <p className="text-xl md:text-2xl text-white">
            <span className="text-lg md:text-2xl  text-white">Rank:</span>{" "}
            <span className="font-medium">{marketCapRank}</span>
          </p>
          <p className="text-xl md:text-2xl text-white">
            <span className="text-lg md:text-2xl  text-white">24H High:</span> ${" "}
            <span className="font-medium">{high}</span>
          </p>
          <p className="text-xl md:text-2xl text-white">
            <span className="text-lg md:text-2xl  text-white">24H Low:</span> ${" "}
            <span className="font-medium">{low}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
