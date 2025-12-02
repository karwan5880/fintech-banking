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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Mobile Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-bold">FinBank</span>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
            <a href="/sign-up">Sign Up</a>
          </Button>
        </div>
      </nav>

      {/* Mobile Content */}
      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Modern Digital Banking
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Experience the future of banking with our secure, fast, and user-friendly fintech platform
          </p>
          <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
            <a href="/sign-up">Get Started</a>
          </Button>
        </section>

        {/* Features */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold">Why Choose FinBank?</h2>
          <div className="space-y-3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex gap-3">
                <Lock className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-bold text-sm">Bank-Level Security</h3>
                  <p className="text-slate-400 text-xs mt-1">256-bit encryption keeps your data safe</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex gap-3">
                <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-bold text-sm">Instant Transfers</h3>
                  <p className="text-slate-400 text-xs mt-1">Send money in seconds, not days</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex gap-3">
                <TrendingUp className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-bold text-sm">Real-Time Analytics</h3>
                  <p className="text-slate-400 text-xs mt-1">Track spending instantly</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex gap-3">
                <Wallet className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-bold text-sm">Multiple Accounts</h3>
                  <p className="text-slate-400 text-xs mt-1">Manage all accounts in one place</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 pb-8">
          <p className="text-sm text-slate-400">Already have an account?</p>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <a href="/sign-in">Sign In</a>
          </Button>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/50 text-center py-4 text-xs text-slate-500">
        <p>&copy; 2024 FinBank. All rights reserved.</p>
      </footer>
    </main>
  );
}
