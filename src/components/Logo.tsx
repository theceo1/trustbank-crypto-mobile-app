
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn("font-bold", sizeClasses[size])}>
        <span className="text-brand-600">trust</span>
        <span>Bank</span>
      </span>
    </div>
  );
};

export default Logo;
