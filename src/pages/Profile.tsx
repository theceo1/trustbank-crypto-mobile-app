
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  User,
  Shield,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      title: "Account Settings",
      icon: User,
      path: "/account-settings",
      description: "Manage your personal information",
    },
    {
      title: "Security",
      icon: Shield,
      path: "/security-settings",
      description: "Change password, 2FA, and security settings",
    },
    {
      title: "Payment Methods",
      icon: CreditCard,
      path: "/payment-methods",
      description: "Manage connected bank accounts and cards",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/notification-settings",
      description: "Configure push and email notifications",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      path: "/help",
      description: "FAQs, contact support, and help center",
    },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="ios-header">
        <h1 className="text-lg font-semibold">Profile</h1>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        {/* User Profile */}
        <div className="flex items-center p-4 mb-6 bg-card rounded-xl border border-border">
          <div className="h-16 w-16 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex items-center justify-center mr-4">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {user?.email?.split('@')[0] || 'User'}
            </h2>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div 
          className="flex justify-between items-center p-4 bg-card rounded-xl border border-border mb-6 cursor-pointer"
          onClick={toggleTheme}
        >
          <div className="flex items-center">
            {resolvedTheme === "light" ? (
              <Sun className="h-5 w-5 mr-3" />
            ) : (
              <Moon className="h-5 w-5 mr-3" />
            )}
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">
                Current: {resolvedTheme === "light" ? "Light mode" : "Dark mode"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-8">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="flex justify-between items-center p-4 bg-card rounded-xl border border-border cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-center">
                <item.icon className="h-5 w-5 mr-3" />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center text-red-500 dark:text-red-400 hover:text-red-600 border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>

        <div className="text-center mt-8">
          <p className="text-muted-foreground text-xs">
            trustBank App v1.0.0
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;
