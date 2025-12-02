"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Lock, Trash2 } from "lucide-react";
import { VirtualCard } from "@/types/banking";

interface CardsListProps {
  cards: VirtualCard[];
  onCreateCard?: () => void;
  onToggleCard?: (cardId: string) => void;
  onDeleteCard?: (cardId: string) => void;
}

export function CardsList({
  cards,
  onCreateCard,
  onToggleCard,
  onDeleteCard
}: CardsListProps) {
  const maskCardNumber = (cardNumber: string) => {
    const last4 = cardNumber.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Cards</h2>
        <Button
          onClick={onCreateCard}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Card
        </Button>
      </div>

      {cards.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="text-center py-8">
            <CreditCard className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No cards yet. Create your first card!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`relative h-48 rounded-lg p-6 transition ${
                card.status === "active"
                  ? "bg-gradient-to-br from-blue-600 to-blue-800"
                  : "bg-gradient-to-br from-slate-600 to-slate-800"
              }`}
            >
              <div className="flex justify-between items-start mb-auto">
                <CreditCard className="w-8 h-8 text-white" />
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    card.status === "active"
                      ? "bg-green-400 text-black"
                      : card.status === "blocked"
                      ? "bg-red-400 text-black"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {card.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-white text-sm opacity-75">Card Number</p>
                  <p className="text-white text-lg font-mono tracking-widest">
                    {maskCardNumber(card.cardNumber)}
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white text-xs opacity-75">Card Holder</p>
                    <p className="text-white font-semibold">{card.cardHolder}</p>
                  </div>
                  <div>
                    <p className="text-white text-xs opacity-75">Expires</p>
                    <p className="text-white font-mono">{card.expiryDate}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onToggleCard?.(card.id)}
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Lock className="w-4 h-4 mr-1" />
                    {card.status === "active" ? "Block" : "Unblock"}
                  </Button>
                  <Button
                    onClick={() => onDeleteCard?.(card.id)}
                    size="sm"
                    variant="outline"
                    className="flex-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
