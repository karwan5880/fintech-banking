import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTransaction = mutation({
  args: {
    fromAccountId: v.id("accounts"),
    toAccountId: v.id("accounts"),
    amount: v.number(),
    currency: v.string(),
    description: v.string(),
    type: v.union(
      v.literal("transfer"),
      v.literal("deposit"),
      v.literal("withdrawal")
    ),
  },
  handler: async (ctx, args) => {
    // Create transaction with pending status
    const transactionId = await ctx.db.insert("transactions", {
      fromAccountId: args.fromAccountId,
      toAccountId: args.toAccountId,
      amount: args.amount,
      currency: args.currency,
      description: args.description,
      status: "pending",
      type: args.type,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Update sender account balance
    const fromAccount = await ctx.db.get(args.fromAccountId);
    if (fromAccount && fromAccount.balance >= args.amount) {
      await ctx.db.patch(args.fromAccountId, {
        balance: fromAccount.balance - args.amount,
        updatedAt: Date.now(),
      });

      // Update receiver account balance
      const toAccount = await ctx.db.get(args.toAccountId);
      if (toAccount) {
        await ctx.db.patch(args.toAccountId, {
          balance: toAccount.balance + args.amount,
          updatedAt: Date.now(),
        });

        // Mark transaction as completed
        await ctx.db.patch(transactionId, {
          status: "completed",
          updatedAt: Date.now(),
        });
      }
    }

    return transactionId;
  },
});

export const getAccountTransactions = query({
  args: { accountId: v.id("accounts") },
  handler: async (ctx, args) => {
    const fromTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_fromAccountId", (q) => q.eq("fromAccountId", args.accountId))
      .collect();

    const toTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_toAccountId", (q) => q.eq("toAccountId", args.accountId))
      .collect();

    return [...fromTransactions, ...toTransactions].sort(
      (a, b) => b.createdAt - a.createdAt
    );
  },
});

export const getRecentTransactions = query({
  args: { accountId: v.id("accounts"), limit: v.number() },
  handler: async (ctx, args) => {
    const allTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_createdAt", (q) => q.gt("createdAt", 0))
      .order("desc")
      .collect();

    return allTransactions
      .filter(
        (t) => t.fromAccountId === args.accountId || t.toAccountId === args.accountId
      )
      .slice(0, args.limit);
  },
});

export const getTransactionById = query({
  args: { transactionId: v.id("transactions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.transactionId);
  },
});

export const updateTransactionStatus = mutation({
  args: {
    transactionId: v.id("transactions"),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.transactionId, {
      status: args.status,
      updatedAt: Date.now(),
    });
    return await ctx.db.get(args.transactionId);
  },
});
