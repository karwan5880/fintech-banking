"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface SendMoneyProps {
  accounts: any[];
  onSend?: (data: any) => void;
}

export function SendMoney({ accounts, onSend }: SendMoneyProps) {
  const [formData, setFormData] = useState({
    fromAccountId: "",
    toAccountId: "",
    amount: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (onSend) {
        await onSend(formData);
      }
      // Reset form
      setFormData({
        fromAccountId: "",
        toAccountId: "",
        amount: "",
        description: "",
      });
    } catch (error) {
      console.error("Error sending money:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Send Money
        </CardTitle>
        <CardDescription>Transfer funds between your accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">From Account</label>
            <select
              value={formData.fromAccountId}
              onChange={(e) =>
                setFormData({ ...formData, fromAccountId: e.target.value })
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
              required
            >
              <option value="">Select account to send from</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountType} - ${account.balance.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">To Account</label>
            <select
              value={formData.toAccountId}
              onChange={(e) =>
                setFormData({ ...formData, toAccountId: e.target.value })
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
              required
            >
              <option value="">Select account to send to</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountType} - {account.accountNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
              placeholder="Transfer description (optional)"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Sending..." : "Send Money"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
