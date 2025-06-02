
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface Contract {
  id: string;
  amount: number;
  apy: number;
  startDate: string;
  endDate: string;
  dailyReturn: number;
  totalReturn: number;
}

interface ActiveContractsProps {
  contracts: Contract[];
}

// Sample active contracts data
const sampleContracts: Contract[] = [
  {
    id: "contract1",
    amount: 500,
    apy: 7.5,
    startDate: "2025-05-10T00:00:00Z",
    endDate: "2025-08-08T00:00:00Z",
    dailyReturn: 0.10,
    totalReturn: 9.25
  },
  {
    id: "contract2",
    amount: 200,
    apy: 5.5,
    startDate: "2025-05-12T00:00:00Z",
    endDate: "2025-06-11T00:00:00Z",
    dailyReturn: 0.04,
    totalReturn: 1.20
  },
  {
    id: "contract3",
    amount: 1000,
    apy: 10.5,
    startDate: "2025-05-15T00:00:00Z",
    endDate: "2025-08-13T00:00:00Z",
    dailyReturn: 0.29,
    totalReturn: 26.02
  }
];

const ActiveContracts: React.FC = () => {
  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Active Staking Contracts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>APY</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Daily Return</TableHead>
                <TableHead>Total Return</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleContracts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No active contracts
                  </TableCell>
                </TableRow>
              ) : (
                sampleContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>${contract.amount.toFixed(2)}</TableCell>
                    <TableCell>{contract.apy.toFixed(2)}%</TableCell>
                    <TableCell>{formatDate(contract.startDate)}</TableCell>
                    <TableCell>{formatDate(contract.endDate)}</TableCell>
                    <TableCell className="text-green-600">
                      ${contract.dailyReturn.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-green-600">
                      ${contract.totalReturn.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveContracts;
