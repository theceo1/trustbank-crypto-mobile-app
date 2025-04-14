
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ChevronRight, Shield, FileCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const KycIntro = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Identity Verification",
      description: "Verify your identity using a government-issued ID",
      icon: FileCheck,
    },
    {
      title: "Biometric Verification",
      description: "Complete a quick face scan to confirm your identity",
      icon: Shield,
    },
    {
      title: "Wallet Setup",
      description: "Set up your crypto wallet to start transacting",
      icon: CreditCard,
    },
  ];

  const handleStartKyc = () => {
    navigate("/kyc-verification");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="text-center mb-10 pt-6">
        <Logo size="lg" className="mx-auto mb-8" />
        <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Just a few quick steps to verify your identity and start using trustBank
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-md mx-auto space-y-6 mb-12">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex items-start p-4 rounded-lg border border-border bg-card animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="p-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 mr-4">
              <step.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
            <CheckCircle className="h-5 w-5 text-muted-foreground opacity-50" />
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="text-center text-sm text-muted-foreground mb-8">
        <p>
          Your information is encrypted and secure.
          <br />
          This process usually takes less than 5 minutes.
        </p>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <Button 
          className="w-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center"
          onClick={handleStartKyc}
        >
          Start Verification
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default KycIntro;
