"use client";
import { useState, useEffect } from "react";
import { allCoins } from "@/coingecko/api";
import CurrencyTable from "@/components/CurrencyTable";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Loader from "./loading";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(allCoins("usd"));
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          "Please wait for 30 seconds and reload, Coingecko Free version of API provides very few requests per minute."
        );
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto bg-red-200 text-black text-xl text-center rounded-2xl py-3">
        <span className="text-xl">Wait ⏲️ !! </span>
        {error}{" "}
      </div>
    );
  }

  return (
    <div>
      {data && (
        <>
          <CurrencyTable coins={data} />
        </>
      )}
    </div>
  );
}
