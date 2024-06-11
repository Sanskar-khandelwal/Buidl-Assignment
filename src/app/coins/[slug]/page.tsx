import { singleCoin } from "@/coingecko/api";
import axios from "axios";
import Sidebar from "@/components/ui/Sidebar";
import ChartsInfo from "@/components/ui/ChartsInfo";

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const response = await axios.get(singleCoin(id));
  const data = response.data;

  return (
    <div className=" flex flex-col  md:grid  md:grid-cols-4 ">
      <div className="md:col-span-1 flex items-center justify-center">
        <Sidebar
          symbol={data.symbol}
          name={data.name}
          image={data.image.large}
          initialPrice={data.market_data.current_price["usd"]}
          initialMarketCap={data.market_data.market_cap["usd"]}
          marketCapRank={data.market_cap_rank}
          high={data.market_data.high_24h["usd"]}
          low={data.market_data.low_24h["usd"]}
        />
      </div>
      <div className="md:col-span-3 md:p-10 p-2">
        <ChartsInfo id={id} currency="usd" name={data?.name} />
      </div>
    </div>
  );
}
