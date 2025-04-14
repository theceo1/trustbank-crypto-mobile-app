
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  id: string;
  type: "deposit" | "withdrawal";
  amount: string;
  currency: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  fee: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  amount,
  currency,
  status,
  createdAt,
  fee,
}) => {
  const isDeposit = type === "deposit";
  const date = new Date(createdAt);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "p-2 rounded-full",
            isDeposit
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          )}
        >
          {isDeposit ? (
            <ArrowDownLeft className="h-5 w-5" />
          ) : (
            <ArrowUpRight className="h-5 w-5" />
          )}
        </div>
        <div>
          <div className="font-medium">
            {isDeposit ? "Received" : "Sent"} {currency}
          </div>
          <div className="text-xs text-muted-foreground">{timeAgo}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">
          {isDeposit ? "+" : "-"}
          {parseFloat(amount).toFixed(8)} {currency}
        </div>
        <div
          className={cn(
            "text-xs",
            status === "completed"
              ? "text-brand-600"
              : status === "pending"
              ? "text-amber-600"
              : "text-red-600"
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
