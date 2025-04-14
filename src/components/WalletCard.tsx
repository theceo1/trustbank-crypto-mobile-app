
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WalletCardProps {
  name: string;
  symbol: string;
  balance: string;
  fiatValue: number;
  iconUrl?: string;
  className?: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  name,
  symbol,
  balance,
  fiatValue,
  iconUrl,
  className,
}) => {
  return (
    <Card className={cn("wallet-card animate-fade-in", className)}>
      <div className="wallet-card-bg" />
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {iconUrl && (
              <img
                src={iconUrl}
                alt={`${name} icon`}
                className="w-8 h-8 rounded-full bg-white p-1"
              />
            )}
            <div>
              <h3 className="text-lg font-medium">{name}</h3>
              <p className="text-sm opacity-80">{symbol}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80">Balance</p>
              <h2 className="text-2xl font-bold">{balance} {symbol}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-80">Value</p>
              <p className="text-lg font-medium">${fiatValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WalletCard;
