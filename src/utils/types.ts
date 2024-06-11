// types for DEX
import { Address } from "viem";
import { Dispatch, SetStateAction, ReactNode } from "react";

export interface PriceResponse {
  chainId: number;
  price: string;
  estimatedPriceImpact: string;
  value: bigint;
  gasPrice: bigint;
  grossBuyAmount: string;
  gas: bigint;
  estimatedGas: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  buyAmount: string;
  sellTokenAddress: string;
  sellAmount: string;
  sources: any[];
  allowanceTarget: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  expectedSlippage: string | null;
}

export interface QuoteResponse {
  chainId: number;
  price: string;
  guaranteedPrice: string;
  estimatedPriceImpact: string;
  to: Address;
  from: string;
  data: Address;
  value: bigint;
  gas: bigint;
  estimatedGas: string;
  gasPrice: bigint;
  grossBuyAmount: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  buyAmount: string;
  sellAmount: string;
  sources: any[];
  orders: any[];
  allowanceTarget: string;
  decodedUniqueId: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  expectedSlippage: string | null;
}

export interface CurrencyTableProps {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null | number;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export interface CurrencyPaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
export interface chartsInfoProps {
  id: string;
  currency: string;
  name: string;
}

export interface ChartButtonProps {
  children: ReactNode;
  handleClick: () => void;
  isActive: boolean;
}

export interface SidebarProps {
  name: string;
  symbol: string;
  image: string;
  initialPrice: number;
  initialMarketCap: number;
  marketCapRank: number;
  high: number;
  low: number;
}
