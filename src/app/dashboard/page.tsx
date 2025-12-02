import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, Send, Bell } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.firstName}</h1>
              <p className="text-slate-400 mt-1">Here's your financial overview</p>
            </div>
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
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
              <p className="text-4xl font-bold text-green-400">$12,450.50</p>
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
              <p className="text-4xl font-bold">2</p>
              <p className="text-slate-400 text-sm mt-2">Virtual cards</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Send className="w-5 h-5" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-400">$3,240.00</p>
              <p className="text-slate-400 text-sm mt-2">Total spent</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-24 bg-blue-600 hover:bg-blue-700">
              <div className="flex flex-col items-center">
                <Send className="w-6 h-6 mb-2" />
                Send Money
              </div>
            </Button>
            <Button className="h-24 bg-green-600 hover:bg-green-700">
              <div className="flex flex-col items-center">
                <Wallet className="w-6 h-6 mb-2" />
                Deposit
              </div>
            </Button>
            <Button className="h-24 bg-purple-600 hover:bg-purple-700">
              <div className="flex flex-col items-center">
                <CreditCard className="w-6 h-6 mb-2" />
                Request Card
              </div>
            </Button>
            <Button className="h-24 bg-orange-600 hover:bg-orange-700">
              <div className="flex flex-col items-center">
                <Bell className="w-6 h-6 mb-2" />
                View More
              </div>
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Your recent activity</CardTitle>
              <CardDescription>Last 5 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-700 last:border-0">
                    <div>
                      <p className="font-semibold">Transaction {i}</p>
                      <p className="text-slate-400 text-sm">2 days ago</p>
                    </div>
                    <p className="font-bold text-red-400">-${(i * 100).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
