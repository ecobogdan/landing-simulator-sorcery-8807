import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Calendar, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BillingSuccess = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock verification of payment success
    const verifyPayment = async () => {
      try {
        // In production, verify the session_id from URL params
        // const params = new URLSearchParams(window.location.search);
        // const sessionId = params.get('session_id');
        
        setTimeout(() => {
          setLoading(false);
          toast({
            title: "Payment successful!",
            description: "Your subscription has been activated.",
          });
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error verifying payment",
          description: "Please contact support if you continue to see this message.",
          variant: "destructive",
        });
      }
    };

    verifyPayment();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <CardTitle>Verifying your payment...</CardTitle>
            <CardDescription>Please wait while we confirm your subscription</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="fade-in">
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Welcome to SocialGlide Pro! Your subscription has been activated and you now have access to all premium features.
            </p>
          </div>

          {/* Subscription Details */}
          <Card className="card-elevated border-0 mb-8 slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <CreditCard className="w-5 h-5" />
                Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <p className="text-muted-foreground">Plan</p>
                  <p className="font-medium">Pro Monthly</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">$29.00</p>
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground">Billing Cycle</p>
                  <p className="font-medium">Monthly</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Next Billing</p>
                  <p className="font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="card-elevated border-0 mb-8 slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>What's included in your Pro plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  "5 social media accounts",
                  "Unlimited posts",
                  "Advanced analytics",
                  "Team collaboration (5 members)",
                  "Priority email support",
                  "Custom posting times",
                  "Bulk upload & CSV import",
                  "Content calendar view"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link to="/dashboard">
              <Button className="w-full btn-hero" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/accounts">
              <Button variant="outline" className="w-full" size="lg">
                Connect Social Accounts
              </Button>
            </Link>
          </div>

          {/* Additional Resources */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Need help getting started? Check out our guides or contact support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="ghost" size="sm">
                Getting Started Guide
              </Button>
              <Button variant="ghost" size="sm">
                Video Tutorials
              </Button>
              <Button variant="ghost" size="sm">
                Contact Support
              </Button>
            </div>
          </div>

          {/* Receipt */}
          <div className="mt-12 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            <p>A receipt has been sent to your email address.</p>
            <p className="mt-1">Transaction ID: txn_mock_success_123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSuccess;