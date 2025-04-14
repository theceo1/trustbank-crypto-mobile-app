
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";

const VerificationPending = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center space-y-6">
        <Logo size="lg" className="mx-auto mb-6" />
        
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Clock className="h-12 w-12 text-amber-600 dark:text-amber-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold">Verification in Progress</h1>
        
        <p className="text-muted-foreground">
          We've received your verification documents and are currently reviewing them. This usually takes 24-48 hours.
        </p>
        
        <div className="space-y-4 pt-4">
          <div className="p-4 rounded-lg bg-card border border-border flex items-start">
            <CheckCircle className="text-brand-600 mr-4 h-5 w-5 mt-0.5" />
            <div className="text-left">
              <h3 className="font-medium">Documents Submitted</h3>
              <p className="text-sm text-muted-foreground">Your documents have been successfully uploaded</p>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-card border border-border flex items-start">
            <Clock className="text-amber-600 mr-4 h-5 w-5 mt-0.5" />
            <div className="text-left">
              <h3 className="font-medium">Under Review</h3>
              <p className="text-sm text-muted-foreground">Our team is reviewing your information</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 mt-6">
          <div className="flex items-start">
            <AlertTriangle className="text-amber-600 mr-3 h-5 w-5 mt-0.5" />
            <div className="text-left">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                You'll receive an email notification once your verification is complete.
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
