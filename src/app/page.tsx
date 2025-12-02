import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Lock, Zap } from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wallet className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">FinBank</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <a href="/sign-in">Sign In</a>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <a href="/sign-up">Get Started</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Modern Digital Banking
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Experience the future of banking with our secure, fast, and user-friendly fintech platform
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6" asChild>
          <a href="/sign-up">Start Free Trial</a>
        </Button>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose FinBank?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Lock className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Bank-Level Security</h3>
            <p className="text-slate-400">256-bit encryption keeps your data safe and secure</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Zap className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Instant Transfers</h3>
            <p className="text-slate-400">Send money in seconds, not days</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <TrendingUp className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
            <p className="text-slate-400">Track your spending and investments instantly</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <Wallet className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Multiple Accounts</h3>
            <p className="text-slate-400">Manage checking, savings, and more in one place</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2024 FinBank. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
