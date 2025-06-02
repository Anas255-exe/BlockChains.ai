
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StakingData } from "@/lib/stakingData";
import { Wallet } from "lucide-react";

interface WalletCardProps {
  data: StakingData;
  onRecharge: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ data, onRecharge }) => {
  // Function to truncate the wallet address for display
  const formatAddress = (address: string): string => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-staking-blue" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Wallet Address</span>
              <span className="font-medium text-sm">
                {formatAddress(data.walletAddress)}
              </span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="bg-staking-blue text-white hover:bg-staking-blue/90"
            onClick={onRecharge}
          >
            Recharge
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-3 bg-staking-lightBlue rounded-lg">
            <span className="text-sm text-gray-500 block">Wallet Balance</span>
            <span className="text-lg font-bold">${data.walletBalance.toFixed(2)} USDT</span>
          </div>
          
          <div className="p-3 bg-staking-lightGray rounded-lg">
            <span className="text-sm text-gray-500 block">Total Invested</span>
            <span className="text-lg font-bold">${data.totalInvested.toFixed(2)} USDT</span>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <span className="text-sm text-gray-500 block">Total Earnings</span>
            <span className="text-lg font-bold text-green-600">${data.totalEarnings.toFixed(2)} USDT</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
