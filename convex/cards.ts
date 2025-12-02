import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCard = mutation({
  args: {
    userId: v.string(),
    cardHolder: v.string(),
    balance: v.number(),
  },
  handler: async (ctx, args) => {
    // Generate a mock card number
    const cardNumber = "4" + Math.random().toString().slice(2, 14);
    const expiryDate = "12/26";
    const cvv = Math.random().toString().slice(2, 5);

    const cardId = await ctx.db.insert("cards", {
      userId: args.userId,
      cardNumber,
      cardHolder: args.cardHolder,
      expiryDate,
      cvv,
      status: "active",
      balance: args.balance,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return cardId;
  },
});

export const getUserCards = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cards")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getCardById = query({
  args: { cardId: v.id("cards") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.cardId);
  },
});

export const updateCardStatus = mutation({
  args: {
    cardId: v.id("cards"),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("blocked")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.cardId, {
      status: args.status,
      updatedAt: Date.now(),
    });
    return await ctx.db.get(args.cardId);
  },
});

export const updateCardBalance = mutation({
  args: {
    cardId: v.id("cards"),
    newBalance: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.cardId, {
      balance: args.newBalance,
      updatedAt: Date.now(),
    });
    return await ctx.db.get(args.cardId);
  },
});

export const deleteCard = mutation({
  args: { cardId: v.id("cards") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cardId);
    return { success: true };
  },
});
