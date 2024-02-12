import React, { useState } from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { checkSafetyV2 } from "evm-web2-kit";
import { FcProcess } from "react-icons/fc";

const Testbox = () => {
  const [formData, setFormData] = useState({
    tokenAddress: "",
    wethAddress: "",
    v2FactoryAddress: "",
    rpcUrl: "",
  });
  const [tokenData, setTokenData] = useState([]);
  const [screenLoad, setScreen] = useState(true);
  const [screenError, setScreenError] = useState(false);
  const [tokenError, setTokenError] = useState(true);
  const [isLoad, setLoad] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      tokenAddress: "",
      wethAddress: "",
      v2FactoryAddress: "",
      rpcUrl: "",
    });
    setLoad(false);
    setTokenError(true);
  };

  const handleBUSD = () => {
    setFormData({
      tokenAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      wethAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      v2FactoryAddress: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
      rpcUrl: "https://bsc-pokt.nodies.app",
    });
    setLoad(false);
    setTokenError(true);
  };
  const handleBUSDEth = () => {
    setFormData({
      tokenAddress: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
      wethAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      v2FactoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      rpcUrl: "https://rpc.ankr.com/eth",
    });
    setLoad(false);
    setTokenError(true);
  };
  const handleBUSDPolygon = () => {
    setFormData({
      tokenAddress: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
      wethAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      v2FactoryAddress: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
      rpcUrl: "https://rpc.ankr.com/polygon",
    });
    setLoad(false);
    setTokenError(true);
  };

  const handleTest = () => {
    setLoad(true);
    setScreen(false);
    const rpcUrl = formData.rpcUrl;
    const contractAddress = formData.tokenAddress;
    const uniswapFactoryAddress = formData.v2FactoryAddress;
    const wethAddress = formData.wethAddress;
    const check = async () => {
      await checkSafetyV2(
        rpcUrl,
        contractAddress,
        uniswapFactoryAddress,
        wethAddress
      )
        .then((result) => {
          setTokenData(result);
          setTokenError(false);
          setScreen(true);
          setScreenError(false);
        })
        .catch((error) => {
          setTokenError(true);
          setScreenError(true);
        });
    };
    check();
  };

  return (
    <div>
      <div className="flex h-screen flex-col justify-center items-center">
        <div className=" bg-sec w-[700px] border-[#22501a] border rounded-lg ">
          <div className="bg-[#1e222d] w-full p-4 flex justify-between rounded-lg">
            <div className="text-white font-semibold text-xl">
              EVM Smartcontract Honeypot Check
            </div>
            <div className="text-white">
              <a href="https://github.com/onweb3/evm-kit" target="_blank">
                <IoMdHelpCircleOutline />
              </a>
            </div>
          </div>
          {/* Form Beigns */}
          <div className="flex p-2">
            <div className="w-1/2">
              <div className="flex flex-col py-2 ">
                <label className=" text-white text-lg font-medium">
                  Token Address
                </label>
                <input
                  type="text"
                  required="true"
                  className="p-1 rounded-lg border-[#5aca47] border bg-transparent text-white"
                  placeholder="0xAdv...D34s"
                  name="tokenAddress"
                  value={formData.tokenAddress}
                  onChange={handleInputChange}
                ></input>
              </div>

              <div className="flex flex-col py-2 ">
                <label className=" text-white text-lg font-medium">
                  WETH/WBNB Address
                </label>
                <input
                  type="text"
                  required="true"
                  className="p-1 rounded-lg border-[#5aca47] border bg-transparent text-white"
                  placeholder="0xAdv...D34s"
                  name="wethAddress"
                  value={formData.wethAddress}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="flex flex-col py-2 ">
                <label className=" text-white text-lg font-medium">
                  V2 Factory Address
                </label>
                <input
                  type="text"
                  required="true"
                  className="p-1 rounded-lg border-[#5aca47] border bg-transparent text-white"
                  placeholder="0xAdv...D34s"
                  name="v2FactoryAddress"
                  value={formData.v2FactoryAddress}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="flex flex-col py-2 ">
                <label className=" text-white text-lg font-medium">
                  RPC Url
                </label>
                <input
                  type="text"
                  required="true"
                  className="p-1 rounded-lg border-[#5aca47] border bg-transparent text-white"
                  placeholder="https://rpc.eth.link"
                  name="rpcUrl"
                  value={formData.rpcUrl}
                  onChange={handleInputChange}
                ></input>
              </div>

              <div className="flex justify-between p-2">
                <button className="bg-gray-300 px-2 py-1 rounded-md " onClick={handleClear}>
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoad}
                  className="bg-gray-300 px-2 py-1 rounded-md"
                  onClick={handleTest}
                >
                  {isLoad ? (
                    <>
                      <FcProcess />
                    </>
                  ) : (
                    <>Test</>
                  )}
                </button>
              </div>
            </div>
            <div className="w-1/2 p-2 text-xs">
              <div className="bg-black w-full h-full p-2">
                {screenLoad ? (
                  <>
                    {tokenError ? (
                      <>
                        <p className="text-gray-300">
                          T3 an OpenSource Serverless project that helps you
                          find if a token contract is Honeypot or not. if any
                          tokens that has the ability to sell token is
                          considered as not honeypot. this is an experimental
                          project use with caution{" "}
                        </p>
                        <p className="text-green-400">
                          Please provide details to continue
                        </p>
                      </>
                    ) : (
                      <>
                        {tokenData ? (
                          <>
                            <p className="text-white">
                              Token Name :{tokenData?.tokenName}
                            </p>
                            <p className="text-white">
                              Token Symbol :{tokenData?.tokenSymbol}
                            </p>
                            <p className="text-white">
                              Token Decimal :{tokenData?.tokenDecimal}
                            </p>
                            <p className="text-white">
                              WETH :{tokenData?.WETH}
                            </p>
                            <p className="text-white">
                              Contract Balance :{tokenData?.contractBalance}
                            </p>
                            <p className="text-white">
                              Transaction Count :{tokenData?.transactionsCount}
                            </p>
                            <p className="text-white">
                              Trading Pair Address :
                              {tokenData?.traidingPairAddress}
                            </p>
                            <p className="text-white">
                              Bid Price Value :{tokenData?.bidPriceValue}
                            </p>
                            <p className="text-white">
                              Ask Price Value :{tokenData?.askPriceValue}
                            </p>
                            <p className="text-white">
                              Bid Message :{tokenData?.bidPriceMessage}
                            </p>
                            <p className="text-white">
                              Ask Message :{tokenData?.askPriceMessage}
                            </p>
                            <p className="text-white">
                              Token Price :{tokenData?.tokenPrice} WETH
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-white">
                              There seems to be some issue with the given
                              contract address or RPC URL or the token might
                              have some vulnerbilities please double check and
                              continue
                            </p>
                            <p className="text-green-400 text-xs">
                              This program can be used to connect with multi
                              chain that supports evm . check for the main net
                              V2 Factory address ,Token contract address and Rpc
                              url
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-green-400">Loading...</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Form Ends */}
        </div>

        <div className=" mt-4">
          <button onClick={handleBUSD} className="text-white">
            BUSD Data on Binance Smartchain
          </button>
        </div>
        <div>
          <button onClick={handleBUSDEth} className="text-white">
            SHIB Data on Ethereum
          </button>
        </div>
        <div>
          <button onClick={handleBUSDPolygon} className="text-white">
            BUSD Data on Polygon Network
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testbox;
