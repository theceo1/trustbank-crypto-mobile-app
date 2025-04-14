
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera, Upload, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const KycVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("id-verification");
  const [idType, setIdType] = useState("passport");
  const [loading, setLoading] = useState(false);

  // Mock verification states
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);
  const [addressUploaded, setAddressUploaded] = useState(false);
  
  // Handle document type selection
  const handleIdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdType(e.target.value);
  };

  // Mock file upload handler
  const handleFileUpload = (type: string) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      
      switch(type) {
        case "selfie":
          setSelfieUploaded(true);
          break;
        case "front":
          setFrontUploaded(true);
          break;
        case "back":
          setBackUploaded(true);
          break;
        case "address":
          setAddressUploaded(true);
          break;
      }
      
      toast({
        title: "File uploaded",
        description: "Your document has been uploaded successfully.",
      });
    }, 2000);
  };

  // Submit verification
  const handleSubmitVerification = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      navigate("/verification-pending");
    }, 2000);
  };

  // Check if all required documents are uploaded
  const isVerificationComplete = () => {
    if (activeTab === "id-verification") {
      return selfieUploaded && frontUploaded && (idType === "national_id" ? backUploaded : true);
    } else {
      return addressUploaded;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="ios-header">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Identity Verification</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="screen-container animate-fade-in">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Complete KYC Verification</h2>
          <p className="text-muted-foreground">
            Please upload clear photos of your identification documents and proof of address.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="id-verification">Identity</TabsTrigger>
            <TabsTrigger value="address-verification">Address</TabsTrigger>
          </TabsList>

          {/* ID Verification Tab */}
          <TabsContent value="id-verification" className="space-y-6 animate-fade-in">
            {/* Document Type Selection */}
            <Card className="p-4">
              <Label htmlFor="id-type" className="mb-2 block">Select ID Type</Label>
              <select
                id="id-type"
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                value={idType}
                onChange={handleIdTypeChange}
              >
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="national_id">National ID Card</option>
              </select>
            </Card>

            {/* Selfie Upload */}
            <Card className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Selfie Verification</h3>
                  <p className="text-sm text-muted-foreground">Take a clear photo of yourself</p>
                </div>
                {selfieUploaded && <Check className="text-green-500 h-5 w-5" />}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleFileUpload("selfie")}
                  disabled={loading || selfieUploaded}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleFileUpload("selfie")}
                  disabled={loading || selfieUploaded}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </Card>

            {/* Front of ID Upload */}
            <Card className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{idType === "passport" ? "Passport" : "ID Card"} (Front)</h3>
                  <p className="text-sm text-muted-foreground">Upload a clear photo of the front of your {idType.replace("_", " ")}</p>
                </div>
                {frontUploaded && <Check className="text-green-500 h-5 w-5" />}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleFileUpload("front")}
                  disabled={loading || frontUploaded}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleFileUpload("front")}
                  disabled={loading || frontUploaded}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </Card>

            {/* Back of ID Upload (only for IDs, not passport) */}
            {idType !== "passport" && (
              <Card className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">ID Card (Back)</h3>
                    <p className="text-sm text-muted-foreground">Upload a clear photo of the back of your {idType.replace("_", " ")}</p>
                  </div>
                  {backUploaded && <Check className="text-green-500 h-5 w-5" />}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleFileUpload("back")}
                    disabled={loading || backUploaded}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleFileUpload("back")}
                    disabled={loading || backUploaded}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Address Verification Tab */}
          <TabsContent value="address-verification" className="space-y-6 animate-fade-in">
            <Card className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Proof of Address</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a utility bill, bank statement, or official letter (not older than 3 months)
                  </p>
                </div>
                {addressUploaded && <Check className="text-green-500 h-5 w-5" />}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleFileUpload("address")}
                  disabled={loading || addressUploaded}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleFileUpload("address")}
                  disabled={loading || addressUploaded}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  The document must clearly show your full name, current address, and issue date 
                  (within the last 3 months).
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit Button */}
        <div className="mt-8">
          <Button 
            className="w-full bg-brand-600 hover:bg-brand-700"
            disabled={!isVerificationComplete() || loading}
            onClick={handleSubmitVerification}
          >
            {loading ? "Processing..." : "Submit Verification"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default KycVerification;
