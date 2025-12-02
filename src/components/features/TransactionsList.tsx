"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";
import { Transaction } from "@/types/banking";

interface TransactionsListProps {
  transactions: Transaction[];
  title?: string;
  limit?: number;
}

export function TransactionsList({
  transactions,
  title = "Transaction History",
  limit
}: TransactionsListProps) {
  const displayedTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  const getTransactionIcon = (transaction: Transaction) => {
    if (transaction.type === "transfer" || transaction.type === "withdrawal") {
      return <ArrowUpRight className="w-5 h-5 text-red-400" />;
    }
    return <ArrowDownLeft className="w-5 h-5 text-green-400" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>Your recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {displayedTransactions.length === 0 ? (
          <p className="text-slate-400 text-center py-4">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {displayedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
              >
                <div className="flex items-center gap-3">
                  {getTransactionIcon(transaction)}
                  <div>
                    <p className="font-semibold capitalize">
                      {transaction.type}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {transaction.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "deposit"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className={`text-xs ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
