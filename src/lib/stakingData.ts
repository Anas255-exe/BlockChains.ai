
// Sample data for the staking dashboard

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'interest';
  amount: number;
  timestamp: string;
  blockchain?: 'BEP20' | 'TRC20' | 'Ethereum';
  status: 'completed' | 'pending' | 'failed';
}

export interface StakingTier {
  minAmount: number;
  apy: number;
  period: number; // days
  name: string;
}

export interface StakingData {
  walletAddress: string;
  walletBalance: number;
  totalInvested: number;
  totalEarnings: number;
  activeContracts: number;
  stakingTiers: StakingTier[];
  transactions: Transaction[];
}

// Sample data
export const stakingData: StakingData = {
  walletAddress: '0x7F5aB23C3d79164F367857DF58a5B5d4aa54d9',
  walletBalance: 1000.25,
  totalInvested: 500.00,
  totalEarnings: 125.75,
  activeContracts: 3,
  stakingTiers: [
    {
      minAmount: 10,
      apy: 5.5,
      period: 30,
      name: 'Basic Tier'
    },
    {
      minAmount: 100,
      apy: 7.5,
      period: 60,
      name: 'Silver Tier'
    },
    {
      minAmount: 500,
      apy: 10.5,
      period: 90,
      name: 'Gold Tier'
    },
    {
      minAmount: 1000,
      apy: 15.0,
      period: 180,
      name: 'Platinum Tier'
    },
    {
      minAmount: 5000,
      apy: 20.0,
      period: 365,
      name: 'Diamond Tier'
    }
  ],
  transactions: [
    {
      id: 'tx1',
      type: 'deposit',
      amount: 100.00,
      timestamp: '2025-05-15T10:30:00Z',
      blockchain: 'BEP20',
      status: 'completed'
    },
    {
      id: 'tx2',
      type: 'interest',
      amount: 2.50,
      timestamp: '2025-05-16T00:00:00Z',
      status: 'completed'
    },
    {
      id: 'tx3',
      type: 'deposit',
      amount: 250.00,
      timestamp: '2025-05-16T14:45:00Z',
      blockchain: 'TRC20',
      status: 'completed'
    },
    {
      id: 'tx4',
      type: 'interest',
      amount: 5.25,
      timestamp: '2025-05-17T00:00:00Z',
      status: 'completed'
    },
    {
      id: 'tx5',
      type: 'withdrawal',
      amount: 30.00,
      timestamp: '2025-05-17T11:20:00Z',
      blockchain: 'BEP20',
      status: 'completed'
    }
  ]
};
