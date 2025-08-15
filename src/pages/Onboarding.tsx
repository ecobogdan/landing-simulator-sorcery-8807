import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  ArrowRight, 
  Upload, 
  Clock,
  Users,
  Instagram,
  Twitter,
  Linkedin,
  Youtube
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const socialPlatforms = [
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-500" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-blue-500" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "text-red-500" },
  ];

  const handleConnectAccount = (platformId: string) => {
    if (connectedAccounts.includes(platformId)) {
      setConnectedAccounts(prev => prev.filter(id => id !== platformId));
    } else {
      setConnectedAccounts(prev => [...prev, platformId]);
      toast({
        title: "Account connected!",
        description: `Successfully connected your ${platformId} account`,
      });
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding
      toast({
        title: "Welcome to SocialGlide!",
        description: "Your account is set up and ready to go.",
      });
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    if (currentStep === totalSteps) {
      navigate("/dashboard");
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return workspaceName.trim().length > 0;
      case 2:
        return connectedAccounts.length > 0;
      case 3:
        return true; // Timezone is optional
      case 4:
        return true; // Team invitation is optional
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome to SocialGlide!</h1>
          <p className="text-muted-foreground">Let's get your account set up in a few simple steps</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="card-elevated border-0">
          {/* Step 1: Workspace Setup */}
          {currentStep === 1 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create Your Workspace</CardTitle>
                <CardDescription>
                  Give your workspace a name to get started. You can change this later.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="workspace">Workspace Name</Label>
                  <Input
                    id="workspace"
                    placeholder="e.g., Acme Marketing, John's Brand"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Add a logo (optional)</p>
                    <p className="text-sm text-muted-foreground">Upload your brand logo to personalize your workspace</p>
                  </div>
                  <Button variant="outline" size="sm">Upload</Button>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 2: Connect Accounts */}
          {currentStep === 2 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Connect Your Social Accounts</CardTitle>
                <CardDescription>
                  Connect at least one social media account to start scheduling posts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {socialPlatforms.map((platform) => {
                    const isConnected = connectedAccounts.includes(platform.id);
                    const Icon = platform.icon;
                    
                    return (
                      <Button
                        key={platform.id}
                        variant={isConnected ? "default" : "outline"}
                        className={`h-20 flex flex-col gap-2 ${isConnected ? 'bg-success hover:bg-success/90' : ''}`}
                        onClick={() => handleConnectAccount(platform.id)}
                      >
                        <Icon className={`w-6 h-6 ${isConnected ? 'text-white' : platform.color}`} />
                        <span className="text-sm">{platform.name}</span>
                        {isConnected && <CheckCircle className="w-4 h-4 text-white" />}
                      </Button>
                    );
                  })}
                </div>
                {connectedAccounts.length > 0 && (
                  <div className="text-center">
                    <Badge className="bg-success text-success-foreground">
                      {connectedAccounts.length} account{connectedAccounts.length > 1 ? 's' : ''} connected
                    </Badge>
                  </div>
                )}
              </CardContent>
            </>
          )}

          {/* Step 3: Timezone & Posting Times */}
          {currentStep === 3 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Set Your Preferences</CardTitle>
                <CardDescription>
                  Configure your timezone and default posting times for optimal engagement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    className="w-full p-2 border border-input rounded-md bg-background"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <Label>Default Posting Times</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { time: "9:00 AM", label: "Morning" },
                      { time: "1:00 PM", label: "Afternoon" },
                      { time: "6:00 PM", label: "Evening" }
                    ].map((slot) => (
                      <div key={slot.time} className="flex items-center gap-2 p-3 border rounded-lg">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{slot.time}</p>
                          <p className="text-xs text-muted-foreground">{slot.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 4: Team Invitation */}
          {currentStep === 4 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Invite Your Team</CardTitle>
                <CardDescription>
                  Add team members to collaborate on your social media content. You can skip this for now.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Invite team members by email</Label>
                  <div className="space-y-3">
                    <Input placeholder="colleague@company.com" />
                    <Input placeholder="manager@company.com" />
                    <Button variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Add More Members
                    </Button>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Team Roles Available:</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• <strong>Admin:</strong> Full access to all features</p>
                    <p>• <strong>Editor:</strong> Can create and schedule posts</p>
                    <p>• <strong>Viewer:</strong> Can view analytics and reports</p>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {/* Navigation */}
          <div className="p-6 pt-0">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={handleSkip}
                className="text-muted-foreground"
              >
                {currentStep === totalSteps ? "Finish Later" : "Skip for now"}
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-hero"
              >
                {currentStep === totalSteps ? "Complete Setup" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;