import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    fullName: v.string(),
    profileImage: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  accounts: defineTable({
    userId: v.string(),
    accountType: v.union(v.literal("checking"), v.literal("savings")),
    accountNumber: v.string(),
    balance: v.number(),
    currency: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_accountNumber", ["accountNumber"]),

  transactions: defineTable({
    fromAccountId: v.string(),
    toAccountId: v.string(),
    amount: v.number(),
    currency: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
    type: v.union(
      v.literal("transfer"),
      v.literal("deposit"),
      v.literal("withdrawal")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_fromAccountId", ["fromAccountId"])
    .index("by_toAccountId", ["toAccountId"])
    .index("by_createdAt", ["createdAt"]),

  cards: defineTable({
    userId: v.string(),
    cardNumber: v.string(),
    cardHolder: v.string(),
    expiryDate: v.string(),
    cvv: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("blocked")
    ),
    balance: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"]),

  notifications: defineTable({
    userId: v.string(),
    type: v.union(
      v.literal("transaction"),
      v.literal("alert"),
      v.literal("reminder")
    ),
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_read", ["userId", "read"]),
});
