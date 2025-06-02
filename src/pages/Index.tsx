
import React, { useState, useEffect } from "react";
import { stakingData } from "@/lib/stakingData";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

// Import our components
import WalletCard from "@/components/dashboard/WalletCard";
import StakingCalculator from "@/components/dashboard/StakingCalculator";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import RechargeModal from "@/components/dashboard/RechargeModal";
import WithdrawSection from "@/components/dashboard/WithdrawSection";
import ActiveContracts from "@/components/dashboard/ActiveContracts";
import WalletConnect from "@/components/dashboard/WalletConnect";

interface StakingHistory {
  date: string;
  amount: number;
  days: number;
  interest: number;
}

const Index = () => {
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [data, setData] = useState(stakingData);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState("");
  const [connectedWalletBalance, setConnectedWalletBalance] = useState("");
  const [connectedChainId, setConnectedChainId] = useState("");
  const [stakingHistory, setStakingHistory] = useState<StakingHistory[]>([]);

  // Load staking history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("stakingHistory");
    if (savedHistory) {
      setStakingHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save staking history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("stakingHistory", JSON.stringify(stakingHistory));
  }, [stakingHistory]);

  // Handle wallet connection
  const handleWalletConnect = (address: string, balance: string, chainId: string) => {
    setConnectedWalletAddress(address);
    setConnectedWalletBalance(balance);
    setConnectedChainId(chainId);
    setIsWalletConnected(true);
    
    // Update the wallet address in the data
    setData(prev => ({
      ...prev,
      walletAddress: address
    }));
  };

  // Handle recharge wallet
  const handleRecharge = (amount: number, blockchain: string, password: string) => {
    // In a real app, you would call an API here
    console.log(`Recharging ${amount} USDT via ${blockchain} network`);
    
    // Update local state for demo purposes
    setData(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: 'deposit',
          amount: amount,
          timestamp: new Date().toISOString(),
          blockchain: blockchain as any,
          status: 'completed'
        },
        ...prev.transactions
      ]
    }));
    
    setIsRechargeModalOpen(false);
    toast.success(`Successfully recharged ${amount} USDT`);
  };

  // Handle staking
  const handleStake = (amount: number, days: number) => {
    if (amount > data.walletBalance) {
      toast.error("Insufficient balance. Please recharge your wallet.");
      return;
    }
    
    if (amount < 15) {
      toast.error("Minimum staking amount is 15 USDT.");
      return;
    }

    // Calculate interest rate based on amount
    let interestRate = 0;
    if (amount >= 15 && amount <= 19) interestRate = 15;
    else if (amount >= 20 && amount <= 29) interestRate = 16;
    else if (amount >= 30 && amount <= 39) interestRate = 17;
    else if (amount >= 40 && amount <= 49) interestRate = 18;
    else if (amount >= 50 && amount <= 59) interestRate = 19;
    else if (amount >= 60 && amount <= 69) interestRate = 20;
    else if (amount >= 70 && amount <= 79) interestRate = 21;
    else if (amount >= 80 && amount <= 89) interestRate = 22;
    else if (amount >= 90 && amount <= 100) interestRate = 23;

    // Calculate estimated return
    const dailyRate = interestRate / 365 / 100;
    const estimatedReturn = amount * dailyRate * days;

    // In a real app, you would call an API here
    console.log(`Staking ${amount} USDT for ${days} days with ${interestRate}% APY`);
    
    // Add to staking history
    const newStakingEntry = {
      date: new Date().toISOString(),
      amount: amount,
      days: days,
      interest: interestRate
    };
    
    setStakingHistory(prev => [newStakingEntry, ...prev]);
    
    // Update local state for demo purposes
    setData(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - amount,
      totalInvested: prev.totalInvested + amount,
      activeContracts: prev.activeContracts + 1,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: 'deposit',
          amount: amount,
          timestamp: new Date().toISOString(),
          blockchain: undefined,
          status: 'completed'
        },
        ...prev.transactions
      ]
    }));
    
    toast.success(`Successfully staked ${amount} USDT for ${days} days. Estimated return: $${estimatedReturn.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Staking Dashboard</h1>
          <WalletConnect onWalletConnect={handleWalletConnect} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {isWalletConnected && (
            <div className="mb-6 bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-medium">Wallet Connected</p>
              <p className="text-sm text-green-700">Address: {connectedWalletAddress}</p>
              <p className="text-sm text-green-700">
                Balance: {parseFloat(connectedWalletBalance).toFixed(4)} {connectedChainId === "56" || connectedChainId === "97" ? "BNB" : "ETH"}
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            {/* Wallet Overview Section */}
            <WalletCard 
              data={data}
              onRecharge={() => setIsRechargeModalOpen(true)} 
            />
            
            {/* Staking Calculator Section */}
            <StakingCalculator 
              stakingTiers={data.stakingTiers}
              onStake={handleStake}
            />
            
            {/* Active Contracts Section */}
            <ActiveContracts />
            
            {/* Transaction History Section */}
            <TransactionHistory transactions={data.transactions} />
            
            {/* Staking History Section */}
            {stakingHistory.length > 0 && (
              <Card className="bg-white shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Staking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount (USDT)</TableHead>
                          <TableHead>Duration (Days)</TableHead>
                          <TableHead>Interest Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stakingHistory.map((entry, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                            <TableCell>${entry.amount.toFixed(2)}</TableCell>
                            <TableCell>{entry.days}</TableCell>
                            <TableCell>{entry.interest}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Withdraw Section */}
            <WithdrawSection walletBalance={data.walletBalance} />
          </div>
        </div>
      </main>
      
      {/* Recharge Modal */}
      <RechargeModal 
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onRecharge={handleRecharge}
      />
    </div>
  );
};

export default Index;
