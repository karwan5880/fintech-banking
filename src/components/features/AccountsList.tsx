"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus } from "lucide-react";
import { BankAccount } from "@/types/banking";
import Link from "next/link";

interface AccountsListProps {
  accounts: BankAccount[];
  onCreateAccount?: () => void;
}

export function AccountsList({ accounts, onCreateAccount }: AccountsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Accounts</h2>
        <Button
          onClick={onCreateAccount}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="text-center py-8">
            <Wallet className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No accounts yet. Create your first account!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <Link key={account.id} href={`/dashboard/accounts/${account.id}`}>
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 cursor-pointer transition">
                <CardHeader>
                  <CardTitle className="text-lg capitalize">
                    {account.accountType} Account
                  </CardTitle>
                  <CardDescription>{account.accountNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-green-400">
                      ${account.balance.toFixed(2)}
                    </p>
                    <p className="text-sm text-slate-400">
                      Updated {new Date(account.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
