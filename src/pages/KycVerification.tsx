
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Logo from "@/components/Logo";

// KYC Verification Steps
type Step = "document" | "personal" | "selfie" | "review";

const KycVerification = () => {
  const [currentStep, setCurrentStep] = useState<Step>("document");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep === "document") {
      if (!documentType || !documentNumber || !frontImage || !backImage) {
        toast({
          title: "Missing Information",
          description: "Please complete all document fields.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("personal");
    } else if (currentStep === "personal") {
      if (!firstName || !lastName || !dateOfBirth) {
        toast({
          title: "Missing Information",
          description: "Please complete all personal information fields.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("selfie");
    } else if (currentStep === "selfie") {
      if (!selfieImage) {
        toast({
          title: "Missing Information",
          description: "Please take or upload a selfie.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("review");
    }
  };

  const handleBack = () => {
    if (currentStep === "personal") {
      setCurrentStep("document");
    } else if (currentStep === "selfie") {
      setCurrentStep("personal");
    } else if (currentStep === "review") {
      setCurrentStep("selfie");
    }
  };

  const handleUploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "front" | "back" | "selfie"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "front") setFrontImage(reader.result as string);
      else if (type === "back") setBackImage(reader.result as string);
      else setSelfieImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // In a real app, this would send the data to your backend which would call the Dojah API
    // For this demo, we'll simulate a successful verification after a delay
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Verification Submitted",
        description: "Your identity verification request has been submitted for review.",
      });
      navigate("/verification-pending");
    }, 2000);
  };

  const renderStepIndicator = () => {
    const steps = ["document", "personal", "selfie", "review"];
    const currentIndex = steps.indexOf(currentStep);

    return (
      <div className="flex justify-center space-x-2 mb-8">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`h-2 w-12 rounded-full ${
              index <= currentIndex
                ? "bg-brand-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          ></div>
        ))}
      </div>
    );
  };

  const renderDocumentStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="documentType">Document Type</Label>
        <Select value={documentType} onValueChange={setDocumentType}>
          <SelectTrigger>
            <SelectValue placeholder="Select ID type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="passport">Passport</SelectItem>
            <SelectItem value="national_id">National ID Card</SelectItem>
            <SelectItem value="drivers_license">Driver's License</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="documentNumber">Document Number</Label>
        <Input
          id="documentNumber"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          placeholder="Enter document number"
        />
      </div>

      <div className="space-y-4">
        <Label>Upload Document Images</Label>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <div
              className={`w-full aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden ${
                frontImage ? "" : "border-2 border-dashed border-border"
              }`}
            >
              {frontImage ? (
                <img
                  src={frontImage}
                  alt="ID Front"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm font-medium mb-2">Front side</p>
            <div className="w-full">
              <input
                type="file"
                id="front-image"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUploadImage(e, "front")}
              />
              <label htmlFor="front-image">
                <Button variant="outline" size="sm" className="w-full" as="span">
                  {frontImage ? "Replace" : "Upload"}
                </Button>
              </label>
            </div>
          </Card>

          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <div
              className={`w-full aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden ${
                backImage ? "" : "border-2 border-dashed border-border"
              }`}
            >
              {backImage ? (
                <img
                  src={backImage}
                  alt="ID Back"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm font-medium mb-2">Back side</p>
            <div className="w-full">
              <input
                type="file"
                id="back-image"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUploadImage(e, "back")}
              />
              <label htmlFor="back-image">
                <Button variant="outline" size="sm" className="w-full" as="span">
                  {backImage ? "Replace" : "Upload"}
                </Button>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderPersonalStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
    </div>
  );

  const renderSelfieStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-muted-foreground">
          Please take a clear selfie or upload a recent photo of yourself.
          Make sure your face is clearly visible.
        </p>
      </div>

      <Card className="p-6 flex flex-col items-center justify-center text-center">
        <div
          className={`w-full max-w-xs aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden ${
            selfieImage ? "" : "border-2 border-dashed border-border"
          }`}
        >
          {selfieImage ? (
            <img
              src={selfieImage}
              alt="Selfie"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="h-16 w-16 text-muted-foreground" />
          )}
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
          <div className="flex-1">
            <input
              type="file"
              id="selfie-image"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleUploadImage(e, "selfie")}
            />
            <label htmlFor="selfie-image">
              <Button variant="outline" className="w-full" as="span">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </label>
          </div>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        <p>
          Your photo will only be used for identity verification and will be
          handled according to our privacy policy.
        </p>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <p className="text-muted-foreground">
          Please review your information before submission.
        </p>
      </div>

      <Card className="p-4 space-y-4">
        <div>
          <h3 className="text-sm text-muted-foreground">Document Type</h3>
          <p className="font-medium">
            {documentType === "passport"
              ? "Passport"
              : documentType === "national_id"
              ? "National ID Card"
              : "Driver's License"}
          </p>
        </div>

        <div>
          <h3 className="text-sm text-muted-foreground">Document Number</h3>
          <p className="font-medium">{documentNumber}</p>
        </div>

        <div>
          <h3 className="text-sm text-muted-foreground">Full Name</h3>
          <p className="font-medium">
            {firstName} {lastName}
          </p>
        </div>

        <div>
          <h3 className="text-sm text-muted-foreground">Date of Birth</h3>
          <p className="font-medium">{dateOfBirth}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">
              Document Front
            </h3>
            <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
              {frontImage && (
                <img
                  src={frontImage}
                  alt="ID Front"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">
              Document Back
            </h3>
            <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
              {backImage && (
                <img
                  src={backImage}
                  alt="ID Back"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-muted-foreground mb-1">Selfie</h3>
          <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden mx-auto">
            {selfieImage && (
              <img
                src={selfieImage}
                alt="Selfie"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        <p>
          By submitting, you confirm that the information provided is accurate
          and complete.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "document":
        return renderDocumentStep();
      case "personal":
        return renderPersonalStep();
      case "selfie":
        return renderSelfieStep();
      case "review":
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Logo size="md" className="mx-auto mb-6" />
          <h1 className="text-xl font-bold">Identity Verification</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {currentStep === "document"
              ? "Upload your identification document"
              : currentStep === "personal"
              ? "Enter your personal information"
              : currentStep === "selfie"
              ? "Take a selfie for verification"
              : "Review and submit your information"}
          </p>
        </div>

        {renderStepIndicator()}

        {/* Current Step Form */}
        <div className="my-6">{renderCurrentStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep !== "document" ? (
            <Button variant="ghost" onClick={handleBack} disabled={loading}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => navigate("/login")} disabled={loading}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}

          {currentStep !== "review" ? (
            <Button
              className="bg-brand-600 hover:bg-brand-700"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="bg-brand-600 hover:bg-brand-700"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Verification"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KycVerification;
