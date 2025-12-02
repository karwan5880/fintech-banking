import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAccount = mutation({
  args: {
    userId: v.string(),
    accountType: v.union(v.literal("checking"), v.literal("savings")),
    accountNumber: v.string(),
    balance: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    const accountId = await ctx.db.insert("accounts", {
      userId: args.userId,
      accountType: args.accountType,
      accountNumber: args.accountNumber,
      balance: args.balance,
      currency: args.currency,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return accountId;
  },
});

export const getUserAccounts = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("accounts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getAccountById = query({
  args: { accountId: v.id("accounts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.accountId);
  },
});

export const updateAccountBalance = mutation({
  args: {
    accountId: v.id("accounts"),
    newBalance: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.accountId, {
      balance: args.newBalance,
      updatedAt: Date.now(),
    });
    return await ctx.db.get(args.accountId);
  },
});

export const getTotalBalance = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const accounts = await ctx.db
      .query("accounts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    return accounts.reduce((total, account) => total + account.balance, 0);
  },
});
