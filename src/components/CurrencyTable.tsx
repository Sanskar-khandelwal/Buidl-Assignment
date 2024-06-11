"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import CurrencyPagination from "./CurrencyPagination";
import { useRouter } from "next/navigation";
import Loader from "./ui/Loader";
import { CurrencyTableProps } from "@/utils/types";

const CurrencyTable = ({ coins }: { coins: CurrencyTableProps[] }) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [realTimePrices, setRealTimePrices] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  const paginatedCoins = useMemo(() => {
    return coins.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [coins, page]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws");

    ws.onopen = () => {
      const params = coins.map(
        (coin: any) => `${coin.symbol.toLowerCase()}usdt@ticker`
      );
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params,
          id: 1,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === "24hrTicker") {
        setRealTimePrices((prev: any) => ({
          ...prev,
          [data.s]: {
            price: data.c,
            change: data.P,
          },
        }));
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [coins]);

  useEffect(() => {
    setLoading(false);
  }, [paginatedCoins]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Table className="max-w-5xl mx-auto text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="text-bold text-xl">#</TableHead>
            <TableHead className="text-bold text-xl"> Name</TableHead>
            <TableHead className="text-bold text-xl">Market Cap</TableHead>
            <TableHead className="text-bold text-xl">Price</TableHead>
            <TableHead className="text-right">24 Hour Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCoins.map((coin: any, i: number) => {
            const realTimePrice =
              realTimePrices[`${coin.symbol.toUpperCase()}USDT`];
            const priceChange = realTimePrice?.change || coin.price_change_24h;
            const changeClass =
              priceChange > 0 ? "text-green-500" : "text-red-500";

            return (
              <TableRow
                key={coin.id}
                className="cursor-pointer hover:bg-[#222430]/40"
                onClick={() => router.push(`/coins/${coin.id}`)}
              >
                <TableCell className="font-medium ">
                  {(page - 1) * 10 + i + 1}
                </TableCell>
                <TableCell className="font-medium flex gap-2">
                  <p>{coin.name}</p>
                  <Image
                    src={coin.image}
                    width={100}
                    height={100}
                    className="w-5 h-5 rounded-full"
                    alt={`a logo of ${coin.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{coin.market_cap}</TableCell>
                <TableCell className="font-medium">
                  {realTimePrice?.price || coin.current_price}
                </TableCell>
                <TableCell
                  className={`text-right flex gap-1 justify-end items-center font-medium ${changeClass}`}
                >
                  <span
                    className={`w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 ${
                      priceChange > 0
                        ? "border-t-green-500 rotate-180"
                        : "border-t-red-500 "
                    } `}
                  ></span>
                  <p> {priceChange}%</p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-end mx-auto max-w-5xl mt-5 text-white">
        <CurrencyPagination page={page} setPage={setPage} />
      </div>
    </>
  );
};

export default CurrencyTable;
