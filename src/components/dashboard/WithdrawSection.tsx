
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface WithdrawSectionProps {
  walletBalance: number;
}

const WithdrawSection: React.FC<WithdrawSectionProps> = ({ walletBalance }) => {
  const [amount, setAmount] = useState<string>("");
  const [blockchain, setBlockchain] = useState<string>("BEP20");
  const [address, setAddress] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > walletBalance) {
      toast.error("Insufficient balance");
      return;
    }

    if (!address) {
      toast.error("Please enter a withdrawal address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Withdrawal request submitted successfully");
      setIsSubmitting(false);
      setAmount("");
      setAddress("");
    }, 1500);
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Withdraw</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 bg-red-50 p-3 rounded text-sm text-red-700">
          <p className="font-medium">Withdrawal Rules</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Withdrawals are processed once per day</li>
            <li>Minimum withdrawal: 10 USDT</li>
            <li>Maximum withdrawal: 1,000 USDT per day</li>
            <li>Withdrawal fee: 1 USDT for all networks</li>
          </ul>
        </div>

        <form onSubmit={handleWithdraw} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="amount" className="text-sm font-medium">
                Withdrawal Amount (USDT)
              </label>
              <span className="text-xs text-gray-500">
                Available: ${walletBalance.toFixed(2)} USDT
              </span>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              min="10"
              step="0.01"
              max={walletBalance.toString()}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="blockchain" className="text-sm font-medium">
              Select Blockchain Network
            </label>
            <Select value={blockchain} onValueChange={setBlockchain}>
              <SelectTrigger id="blockchain">
                <SelectValue placeholder="Select blockchain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEP20">BEP20 (Binance Smart Chain)</SelectItem>
                <SelectItem value="TRC20">TRC20 (TRON)</SelectItem>
                <SelectItem value="Ethereum">Ethereum (ERC20)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Withdrawal Address
            </label>
            <Input
              id="address"
              type="text"
              placeholder={`Enter your ${blockchain} wallet address`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <p className="text-xs text-amber-600">
              Please double-check your wallet address before confirming.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-staking-blue text-white hover:bg-staking-blue/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Withdraw Funds"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WithdrawSection;
