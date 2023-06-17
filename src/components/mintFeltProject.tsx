import { useMemo, useState } from "react";
import { useContractWrite, useContractReads, Address } from "wagmi";
import { useAccount } from "wagmi";
import {
  housePlantsABI,
  usePrepareMechaFuturesMint,
} from "../wagmi/generated";
import { formatEther } from "viem";


export function MintFeltProject({
  abi,
  address,
  prepareWrite,
}: {
  abi: typeof housePlantsABI;
  address: Address;
  prepareWrite: any,
}) {
  const { isConnected } = useAccount();
  const [quantity, setQuantity] = useState(BigInt(1)); // quantity is a BigNumber from the start

  const inputStyle: React.CSSProperties = {
    //border: "1px solid #ccc",
    //borderRadius: "1px",
    //padding: "4px",
    border: 'none',
    borderRadius: '20px',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    backgroundImage: 'linear-gradient(to bottom, #f8f8f8, #e1e1e1)',
    outline: 'none',
    transition: 'box-shadow 0.3s ease-in-out',
    width: '100px',    
  };

  const divStyle: React.CSSProperties = {
    marginTop: "10px", // Add margin at the top to create new lines
    marginBottom: "10px", // Add margin at the bottom to create new lines
    color: "white",
    fontWeight: 'bold',
    textShadow: '1px 1px 2px black',
    fontSize: '18px'
  };

  const soldOutStyle: React.CSSProperties = {
    marginTop: "10px", // Add margin at the top to create new lines
    marginBottom: "10px", // Add margin at the bottom to create new lines
    color: "red",
    fontWeight: 'bold',
    textShadow: '1px 1px 2px black',
    fontSize: '24px'
  };


  const headerStyle: React.CSSProperties = {
    marginTop: "10px", // Add margin at the top to create new lines
    marginBottom: "10px", // Add margin at the bottom to create new lines
    color: "white",
    fontWeight: 'bold',
    textShadow: '1px 1px 2px black',
    fontSize: '34px'
  };

  const header2Style: React.CSSProperties = {
    marginTop: "10px", // Add margin at the top to create new lines
    marginBottom: "10px", // Add margin at the bottom to create new lines
    color: "white",
    fontWeight: 'bold',
    textShadow: '1px 1px 2px black',
    fontSize: '24px'
  };

  // onChange handler for the input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = BigInt(e.target.value);
    setQuantity(newQuantity);
  };

  const { data: mintData } = useContractReads({
    allowFailure: false,
    contracts: [
      {
        abi,
        address,
        functionName: "MAX_SUPPLY",
      },
      {
        abi,
        address,
        functionName: "totalSupply",
      },
      {
        abi,
        address,
        functionName: "PRICE",
      },
      {
        abi,
        address,
        functionName: "name",
      },      
      {
        abi,
        address,
        functionName: "MAX_MULTIMINT",
      },            
    ],
  });

  const [maxSupply, totalSupply, price, name, maxMint] = useMemo(() => {
    if (!mintData) {
      return new Array(5).map(() => undefined);
    }
    return mintData;
  }, [mintData]);

  const totalPrice = useMemo(() => {
    return BigInt(price || 0) * quantity;
  }, [quantity, price])

  const { config: mintConfig, error } = prepareWrite({
    enabled: !!price,
    args: [BigInt(quantity)],
    value: totalPrice,
  });
  const { write: writeMint, isLoading } = useContractWrite(mintConfig);
  if (isConnected)
    return (
      <div className="flex items-center justify-center h-screen pb-48">        
        <div style={{ textAlign: "center" }}>
         <h1 style={headerStyle}>{name}</h1>
         <p></p>
         <p></p>
         <h2 style={header2Style}>Price: {price ? formatEther(price) : '...'} ETH Per Mint</h2>
          <div style={divStyle}>Mint Amount :</div>
          <input
            type="number"
            value={quantity.toString()}
            onChange={handleQuantityChange}
            name=""
            style={inputStyle} // Apply inline style here
          />
          <div style={divStyle}>Total price: {totalPrice > BigInt(0) ? formatEther(totalPrice) : '...'} eth + gas</div>
          <div style={divStyle}> {totalSupply?.toString() || "..."} / {maxSupply?.toString() || "..."} Minted    </div>
          <div style={divStyle}> {maxMint?.toString() || "..."} Max Mint Limit Per Transaction </div>

          {error && totalSupply < maxSupply ? (
             <p style={soldOutStyle}> Error: {error.shortMessage.toString()}</p> 
            ): error && <p style={soldOutStyle}>SOLD OUT</p>}
            
          <button style={divStyle}
            disabled={isLoading}
            onClick={() => writeMint?.()}
            className="border-[2px] border-black px-3 py-1 rounded hover:bg-black hover:text-white"
          >
            Mint
          </button>
          <p></p>
          <p></p>
          <a style={divStyle} href="https://twitter.com/feltzine">FELT ZINE TWITTER </a>
          <p></p>
          <p></p>
          <a style={divStyle} href="https://www.feltzine.art/">HOME </a>

        </div>
      </div>
    );
  return <p style={divStyle}>pls connect wallet</p>;
}
