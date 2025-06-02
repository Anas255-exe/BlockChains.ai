
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StakingTier } from "@/lib/stakingData";

interface StakingCalculatorProps {
  stakingTiers: StakingTier[];
  onStake: (amount: number, days: number) => void;
}

// New interest slab structure
const interestSlabs = [
  { min: 15, max: 19, apy: 15 },
  { min: 20, max: 29, apy: 16 },
  { min: 30, max: 39, apy: 17 },
  { min: 40, max: 49, apy: 18 },
  { min: 50, max: 59, apy: 19 },
  { min: 60, max: 69, apy: 20 },
  { min: 70, max: 79, apy: 21 },
  { min: 80, max: 89, apy: 22 },
  { min: 90, max: 100, apy: 23 }
];

const StakingCalculator: React.FC<StakingCalculatorProps> = ({ stakingTiers, onStake }) => {
  const [amount, setAmount] = useState<number>(100);
  const [days, setDays] = useState<number>(30);
  const [currentApy, setCurrentApy] = useState<number>(0);
  
  // Calculate APY based on the new interest slabs
  useEffect(() => {
    const getApyRate = (amount: number): number => {
      // Default APY if amount is below minimum
      if (amount < 15) return 0;
      
      // Find the applicable interest slab
      const slab = interestSlabs.find(
        slab => amount >= slab.min && amount <= slab.max
      );
      
      // Return the APY or default to the highest tier if amount exceeds all slabs
      return slab ? slab.apy : interestSlabs[interestSlabs.length - 1].apy;
    };
    
    setCurrentApy(getApyRate(amount));
  }, [amount]);

  const calculateDailyReturn = (): number => {
    const dailyRate = currentApy / 365 / 100;
    return amount * dailyRate;
  };

  const calculateMonthlyReturn = (): number => {
    const dailyRate = currentApy / 365 / 100;
    return amount * dailyRate * 30; // Assuming 30 days in a month
  };

  const calculateTotalReturn = (): number => {
    const dailyRate = currentApy / 365 / 100;
    return amount * dailyRate * days;
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    } else {
      setAmount(0);
    }
  };

  // Get tier name based on amount
  const getTierName = (amount: number): string => {
    if (amount < 15) return "Below Minimum";
    if (amount <= 19) return "Basic Tier";
    if (amount <= 29) return "Silver Tier";
    if (amount <= 39) return "Gold Tier";
    if (amount <= 49) return "Platinum Tier";
    if (amount <= 59) return "Diamond Tier";
    if (amount <= 69) return "Elite Tier";
    if (amount <= 79) return "Premium Tier";
    if (amount <= 89) return "Executive Tier";
    return "VIP Tier";
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Staking Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="amount" className="text-sm text-gray-500">
                Enter the staking amount
              </label>
              <span className="text-sm font-medium">USDT</span>
            </div>
            <div className="flex gap-2">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full"
                min="0"
                step="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="days" className="text-sm text-gray-500">
                Select number of days to stake
              </label>
              <span className="text-sm font-medium">{days} Days</span>
            </div>
            <Slider 
              id="days"
              value={[days]} 
              min={7} 
              max={365} 
              step={1} 
              onValueChange={(values) => setDays(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>7 Days</span>
              <span>30 Days</span>
              <span>90 Days</span>
              <span>365 Days</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-staking-lightGray p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">APY Rate</p>
              <p className="text-lg font-bold text-green-600">
                {currentApy.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Daily Income</p>
              <p className="text-lg font-bold">
                ${calculateDailyReturn().toFixed(4)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Income</p>
              <p className="text-lg font-bold">
                ${calculateMonthlyReturn().toFixed(2)}
              </p>
            </div>
          </div>

          <div className="bg-staking-lightBlue p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Return (for {days} days)</p>
            <p className="text-xl font-bold text-staking-blue">
              ${calculateTotalReturn().toFixed(2)}
            </p>
          </div>

          <Button 
            className="w-full bg-staking-blue text-white hover:bg-staking-blue/90"
            onClick={() => onStake(amount, days)}
            disabled={amount < 15 || currentApy === 0}
          >
            Add to Staking
          </Button>
          
          <div className="text-xs text-gray-500 mt-2">
            <p>Current tier: <span className="font-medium">{getTierName(amount)}</span></p>
            <p className="mt-1">Note: Minimum staking amount is 15 USDT. Higher investment amounts qualify for better APY rates.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StakingCalculator;
