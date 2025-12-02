"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, CreditCard, Send, Bell, LogOut } from "lucide-react";
import { AccountsList } from "@/components/features/AccountsList";
import { SendMoney } from "@/components/features/SendMoney";
import { CardsList } from "@/components/features/CardsList";
import { TransactionsList } from "@/components/features/TransactionsList";
import { NotificationsList } from "@/components/features/NotificationsList";

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

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
    // Calculate total balance
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}</h1>
              <p className="text-slate-400 mt-1">Here's your financial overview</p>
            </div>
            <Button
              onClick={() => {
                router.push("/");
              }}
              variant="outline"
              className="text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-400">${totalBalance.toFixed(2)}</p>
              <p className="text-slate-400 text-sm mt-2">Across all accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Active Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{mockCards.length}</p>
              <p className="text-slate-400 text-sm mt-2">Virtual cards</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-400">
                {mockNotifications.filter((n) => !n.read).length}
              </p>
              <p className="text-slate-400 text-sm mt-2">Unread notifications</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="send">Send Money</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <TransactionsList transactions={mockTransactions} limit={5} />
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6 mt-6">
            <AccountsList accounts={mockAccounts} />
          </TabsContent>

          {/* Send Money Tab */}
          <TabsContent value="send" className="space-y-6 mt-6">
            <SendMoney accounts={mockAccounts} />
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-6 mt-6">
            <CardsList cards={mockCards} />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <NotificationsList notifications={mockNotifications} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
