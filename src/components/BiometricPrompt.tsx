
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BiometricPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
  title?: string;
  description?: string;
}

const BiometricPrompt = ({
  isOpen,
  onClose,
  onSuccess,
  onFailure,
  title = "Biometric Authentication",
  description = "Verify your identity using Face ID or Touch ID",
}: BiometricPromptProps) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Simulate biometric authentication
  useEffect(() => {
    if (isAuthenticating) {
      const timer = setTimeout(() => {
        // In a real app, this would be actual biometric auth
        const success = Math.random() > 0.3; // 70% chance of success for demo
        setIsAuthenticating(false);
        
        if (success) {
          onSuccess();
        } else {
          onFailure();
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticating, onSuccess, onFailure]);

  const handleAuthenticate = () => {
    setIsAuthenticating(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4 space-y-6">
          <div className="text-center text-muted-foreground text-sm">
            {description}
          </div>
          
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
              isAuthenticating 
                ? "border-brand-600 animate-pulse" 
                : "border-muted-foreground"
            }`}
          >
            <Fingerprint 
              size={48} 
              className={isAuthenticating ? "text-brand-600" : "text-muted-foreground"} 
            />
          </div>
          
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isAuthenticating}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleAuthenticate} disabled={isAuthenticating}>
              <Fingerprint className="mr-2 h-4 w-4" />
              {isAuthenticating ? "Authenticating..." : "Authenticate"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BiometricPrompt;
