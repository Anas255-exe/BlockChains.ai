
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecharge: (amount: number, blockchain: string, password: string) => void;
}

const RechargeModal: React.FC<RechargeModalProps> = ({ isOpen, onClose, onRecharge }) => {
  const [amount, setAmount] = useState<string>("");
  const [blockchain, setBlockchain] = useState<string>("BEP20");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onRecharge(parseFloat(amount), blockchain, password);
      setIsSubmitting(false);
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setAmount("");
    setBlockchain("BEP20");
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recharge Wallet</DialogTitle>
          <DialogDescription>
            Add funds to your wallet by selecting the blockchain network and entering the amount.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount (USDT)
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="blockchain" className="text-sm font-medium">
              Select Blockchain
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
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm mt-4">
            <p className="font-medium text-blue-800">Network Information</p>
            <div className="mt-2 text-blue-700 space-y-1">
              <p>• USDT only, minimum deposit: 10 USDT</p>
              <p>• Please ensure you've selected the correct network</p>
              <p>• Deposits typically take 10-30 minutes to process</p>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-staking-blue text-white hover:bg-staking-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Recharge"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RechargeModal;
