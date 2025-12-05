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
      {/* Top Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-5xl mx-auto px-2 md:px-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-bold">FinBank</span>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
            <a href="/sign-up">Sign Up</a>
          </Button>
        </div>
      </nav>

      {/* Responsive Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          {/* Hero */}
          <section className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Modern Digital Banking
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
              Experience the future of banking with our secure, fast, and user-friendly fintech platform
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" asChild>
                <a href="/sign-up">Get Started</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-slate-100"
                asChild
              >
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </section>

          {/* Highlight Card (desktop/tablet accent) */}
          <section className="hidden md:block md:w-80 lg:w-96">
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 space-y-4 shadow-xl">
              <p className="text-xs font-semibold tracking-wide text-blue-300 uppercase">
                Real-time insights
              </p>
              <p className="text-3xl font-bold">$15,240.32</p>
              <p className="text-xs text-slate-400">Total balance across all your FinBank accounts</p>
              <div className="h-px bg-slate-700 my-2" />
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Spending this month</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +8.2%
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Features */}
        <section id="features" className="mt-10 md:mt-16 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold">Why Choose FinBank?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <section className="mt-10 text-center md:text-left space-y-4 pb-8">
          <p className="text-sm text-slate-400">Already have an account?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="/sign-in">Sign In</a>
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/50 text-center py-4 text-xs text-slate-500">
        <p>&copy; 2024 FinBank. All rights reserved.</p>
      </footer>
    </main>
  );
}
