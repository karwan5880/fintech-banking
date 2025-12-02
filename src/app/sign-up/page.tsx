import { SignUp } from "@clerk/nextjs";
import { Wallet } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Wallet className="w-12 h-12 text-blue-500" />
          <span className="text-4xl font-bold">FinBank</span>
        </div>
        <h1 className="text-2xl font-bold">Create Your Account</h1>
        <p className="text-slate-400 mt-2">Join thousands of users on FinBank</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
        <SignUp />
      </div>
    </main>
  );
}
