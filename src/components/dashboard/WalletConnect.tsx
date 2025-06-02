import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WalletConnectProps {
  onWalletConnect: (address: string, balance: string, chainId: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onWalletConnect }) => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          // Check if we're already connected
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const address = accounts[0];
            const balance = await provider.getBalance(address);
            const network = await provider.getNetwork();
            
            setWalletAddress(address);
            setWalletBalance(ethers.utils.formatEther(balance));
            setChainId(network.chainId.toString());
            
            onWalletConnect(address, ethers.utils.formatEther(balance), network.chainId.toString());
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkConnection();
  }, [onWalletConnect]);

  // Handle wallet connection
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed. Please install MetaMask to connect.");
      return;
    }

    setIsConnecting(true);

    try {
      // Request account access
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();
      
      setWalletAddress(address);
      setWalletBalance(ethers.utils.formatEther(balance));
      setChainId(network.chainId.toString());
      
      onWalletConnect(address, ethers.utils.formatEther(balance), network.chainId.toString());
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Format address for display
  const formatAddress = (address: string): string => {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Get network name based on chainId
  const getNetworkName = (chainId: string): string => {
    switch (chainId) {
      case "1":
        return "Ethereum Mainnet";
      case "56":
        return "Binance Smart Chain";
      case "97":
        return "BSC Testnet";
      case "137":
        return "Polygon";
      case "43114":
        return "Avalanche";
      case "42161":
        return "Arbitrum";
      default:
        return `Chain ID: ${chainId}`;
    }
  };

  return (
    <div className="flex items-center gap-4">
      {walletAddress ? (
        <div className="flex items-center gap-2 bg-staking-lightBlue px-3 py-2 rounded-lg">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Connected: {formatAddress(walletAddress)}</span>
            <span className="text-sm font-medium">
              {parseFloat(walletBalance).toFixed(4)} {chainId === "56" || chainId === "97" ? "BNB" : "ETH"}
            </span>
            <span className="text-xs text-gray-500">{getNetworkName(chainId)}</span>
          </div>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-staking-blue text-white hover:bg-staking-blue/90"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;