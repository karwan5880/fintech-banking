// User Account Types
export interface BankAccount {
  id: string;
  userId: string;
  accountType: "checking" | "savings";
  accountNumber: string;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction Types
export interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  currency: string;
  description: string;
  status: "pending" | "completed" | "failed";
  type: "transfer" | "deposit" | "withdrawal";
  createdAt: Date;
  updatedAt: Date;
}

// Card Types
export interface VirtualCard {
  id: string;
  userId: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  status: "active" | "inactive" | "blocked";
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: "transaction" | "alert" | "reminder";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Dashboard Summary
export interface DashboardSummary {
  totalBalance: number;
  recentTransactions: Transaction[];
  accountCount: number;
  cardCount: number;
  unreadNotifications: number;
}
