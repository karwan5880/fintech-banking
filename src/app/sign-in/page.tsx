import { SignIn } from "@clerk/nextjs";
import { Wallet } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Wallet className="w-12 h-12 text-blue-500" />
          <span className="text-4xl font-bold">FinBank</span>
        </div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
        <SignIn />
      </div>
    </main>
  );
}
