"use client";
import { historicalChart } from "@/coingecko/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartButton from "./ChartButton";
import Loader from "./Loader";
import { chartsInfoProps } from "@/utils/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = [
  {
    day: "1D",
    value: 1,
  },
  {
    day: "1W",
    value: 7,
  },
  {
    day: "1M",
    value: 30,
  },
  {
    day: "3M",
    value: 90,
  },
  {
    day: "1Y",
    value: 365,
  },
];

const ChartsInfo = ({ id, currency, name }: chartsInfoProps) => {
  const [days, setDays] = useState<number>(1);
  const [historicalData, setHistoricalData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getHistoricalData = async () => {
    try {
      const response = await axios.get(historicalChart(id, days, currency));
      const data = response.data;
      setHistoricalData(data.prices);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistoricalData();
  }, [currency, days]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="md:w-10/12 w-full  mx-auto text-white">
      <div>
        <h3 className="md:text-4xl text-2xl underline mt-2 md:mt-10">
          Performance of {name}
        </h3>
      </div>
      <div className="flex gap-4 justify-end mt-5">
        {data.map((m, i) => (
          <ChartButton
            key={i}
            handleClick={() => setDays(m.value)}
            isActive={m.value == days}
          >
            <p className="text-sm md:text-base">{m.day}</p>
          </ChartButton>
        ))}
      </div>
      <Line
        data={{
          labels: historicalData.map((coin: number[]) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              label: `Price in ${currency}`,
              data: historicalData.map((coin: number[]) => coin[1]),
              borderColor: "#5773ff",
              fill: true,
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#6b7284",
              },
              type: "category",
              grid: {
                color: "#323546",
                display: false,
              },
            },
            y: {
              grid: {
                color: "#323546",
              },
              ticks: {
                color: "#6b7284",
              },
              beginAtZero: false,
            },
          },
        }}
      />
    </div>
  );
};

export default ChartsInfo;
