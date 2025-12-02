"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, Send, Bell, LogOut, Eye, EyeOff } from "lucide-react";
import { TransactionsList } from "@/components/features/TransactionsList";
import { MobileNav } from "@/components/layout/MobileNav";

// Mock data for demo
const mockAccounts = [
  {
    id: "acc-1",
    userId: "user-1",
    accountType: "checking" as const,
    accountNumber: "CHK-1234567890",
    balance: 5000,
    currency: "USD",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "acc-2",
    userId: "user-1",
    accountType: "savings" as const,
    accountNumber: "SAV-1234567891",
    balance: 10000,
    currency: "USD",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockCards = [
  {
    id: "card-1",
    userId: "user-1",
    cardNumber: "4532123456789012",
    cardHolder: "John Doe",
    expiryDate: "12/26",
    cvv: "123",
    status: "active" as const,
    balance: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockTransactions = [
  {
    id: "txn-1",
    fromAccountId: "acc-1",
    toAccountId: "acc-2",
    amount: 500,
    currency: "USD",
    description: "Transfer to savings",
    status: "completed" as const,
    type: "transfer" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "txn-2",
    fromAccountId: "acc-1",
    toAccountId: "acc-2",
    amount: 200,
    currency: "USD",
    description: "Coffee shop",
    status: "completed" as const,
    type: "withdrawal" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockNotifications = [
  {
    id: "notif-1",
    userId: "user-1",
    type: "transaction" as const,
    title: "Money Transferred",
    message: "You transferred $500 to your savings account",
    read: false,
    createdAt: new Date(),
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "alert" as const,
    title: "High spending alert",
    message: "You've spent $1,200 this week",
    read: false,
    createdAt: new Date(),
  },
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [totalBalance, setTotalBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
    const total = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    setTotalBalance(total);
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-24">
      {/* Mobile Header */}
      <div className="bg-slate-900/50 backdrop-blur p-4 sticky top-0 z-40">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div>
            <h1 className="text-xl font-bold">Hi, {user?.firstName}</h1>
            <p className="text-xs text-slate-400">Welcome back</p>
          </div>
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            size="sm"
            className="text-red-400"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Main Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm opacity-75">Total Balance</p>
              <div className="flex items-center gap-2 mt-1">
                {showBalance ? (
                  <h2 className="text-3xl font-bold">${totalBalance.toFixed(2)}</h2>
                ) : (
                  <h2 className="text-3xl font-bold">••••••</h2>
                )}
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="opacity-75 hover:opacity-100"
                >
                  {showBalance ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Wallet className="w-8 h-8 opacity-75" />
          </div>
          <p className="text-xs opacity-75">Across all accounts</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-xs text-slate-400 mb-1">Cards</p>
            <p className="text-2xl font-bold text-blue-400">{mockCards.length}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <p className="text-xs text-slate-400 mb-1">Alerts</p>
            <p className="text-2xl font-bold text-yellow-400">
              {mockNotifications.filter((n) => !n.read).length}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => router.push("/dashboard/send")}
            className="h-20 bg-green-600 hover:bg-green-700 flex flex-col items-center gap-2"
          >
            <Send className="w-6 h-6" />
            <span className="text-xs">Send Money</span>
          </Button>
          <Button
            onClick={() => router.push("/dashboard/cards")}
            className="h-20 bg-purple-600 hover:bg-purple-700 flex flex-col items-center gap-2"
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-xs">My Cards</span>
          </Button>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Recent Activity</h3>
          <TransactionsList transactions={mockTransactions} limit={5} />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </main>
  );
}
