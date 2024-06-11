# BuildersTribe Assignment

A Crypto Currency Real Time Price Tracker and DEX Application [Next.js](https://nextjs.org/docs) 



## Getting Started

1. Setup the required API keys

| **API Keys**           | **Description**                                                                                                  | **Code**                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| walletConnectProjectId | WalletConnect's SDK to help with connecting wallets (create one [here](https://cloud.walletconnect.com/sign-in)) | Add in the `.env` file at `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`                                         |
| 0x                     | 0x API key (create one [here](https://0x.org/docs/introduction/getting-started))                                 | Add in the `.env` file at `NEXT_PUBLIC_ZEROEX_API_KEY`                                                    |
2. Install project dependencies

```
npm install
```

3. Start the Next.js development server

```
npm run dev
```

4. Navigate to [http://localhost:3000](http://localhost:3000)

```
open http://localhost:3000
```


## Required Functionalities:

| Task Description                                                                                                                                                                                                 | Status    |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **Wallet Connection**                                                                                                                                                                                            |           |
| Construct a UI component leveraging Web3 modal libraries to interface with Ethereum wallets via MetaMask or WalletConnect. This includes auto-detection of wallet presence, secure session establishment, and error management. | ✅ Done    |
| **Cryptocurrency Price Charting**                                                                                                                                                                                |           |
| Utilize any suitable charting library to construct interactive charts for displaying cryptocurrency prices.                                                                                                      | ✅ Done    |
| Fetch historical price data from APIs like CoinGecko or CryptoCompare to initially populate these charts.                                                                                                        | ✅ Done    |
| Implement filters within the chart to allow users to view price data by day, week, and month, providing flexibility in data analysis and visualization.                                                           | ✅ Done    |
|**Bonus Task** Implement websocket connections to the selected cryptocurrency data APIs, such as CoinGecko or CryptoCompare. Use these websocket connections for real-time data streaming to dynamically update the charts, reflecting live price changes. | ✅ Done    |
| **Token Swapping Mechanism**                                                                                                                                                                                     |           |
| Integrate a decentralized exchange protocol API (such as 0x or Bungee) to enable ERC-20 token swaps directly within the application.                                                                              | ✅ Done    |
| Execute swap transactions .                                                                                                                           | ✅ Done    |
