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
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {displayedTransactions.length === 0 ? (
          <p className="text-slate-400 text-center py-4 text-sm">No transactions yet</p>
        ) : (
          <div className="space-y-2">
            {displayedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-2.5 bg-slate-700/50 rounded-lg"
              >
                <div className="flex items-center gap-2.5 flex-1">
                  {getTransactionIcon(transaction)}
                  <div className="min-w-0">
                    <p className="font-medium text-sm capitalize">
                      {transaction.type}
                    </p>
                    <p className="text-slate-400 text-xs truncate">
                      {transaction.description}
                    </p>
                  </div>
                </div>

                <div className="text-right ml-2">
                  <p
                    className={`font-bold text-sm ${
                      transaction.type === "deposit"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}
                    ${transaction.amount.toFixed(2)}
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
