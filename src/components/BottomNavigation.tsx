
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, Send, User, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      name: "Home",
      icon: Home,
    },
    {
      path: "/wallet",
      name: "Wallet",
      icon: CreditCard,
    },
    {
      path: "/transactions",
      name: "Trade",
      icon: BarChart2,
    },
    {
      path: "/transfer",
      name: "Transfer",
      icon: Send,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: User,
    },
  ];

  return (
    <nav className="bottom-tab bg-background dark:bg-background border-t border-border">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 px-2",
              {
                "text-brand-600": isActive,
                "text-muted-foreground": !isActive,
              }
            )}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
