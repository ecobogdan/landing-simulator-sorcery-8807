import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BillingCancel = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Cancel Animation */}
          <div className="fade-in">
            <div className="w-24 h-24 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <XCircle className="w-12 h-12 text-warning" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your payment was cancelled and no charges were made to your account.
            </p>
          </div>

          {/* What Happened */}
          <Card className="card-elevated border-0 mb-8 slide-up">
            <CardHeader>
              <CardTitle>What happened?</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p className="text-muted-foreground">
                You cancelled the payment process before it was completed. This could happen for several reasons:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  You decided to review the plan details before subscribing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  You wanted to use a different payment method
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  You encountered a technical issue during checkout
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  You changed your mind about upgrading
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Continue with Free Plan */}
          <Card className="card-elevated border-0 mb-8 slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>You can still use SocialGlide</CardTitle>
              <CardDescription>Your free Starter plan is still active with these features:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  "1 social media account",
                  "10 posts per month",
                  "Basic analytics",
                  "Email support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link to="/pricing">
              <Button className="w-full" variant="default">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>

          {/* Help Section */}
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Need help choosing a plan?</h3>
            <p className="text-muted-foreground">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="ghost" size="sm">
                Compare Plans
              </Button>
              <Button variant="ghost" size="sm">
                Schedule a Demo
              </Button>
              <Button variant="ghost" size="sm">
                View FAQ
              </Button>
            </div>
          </div>

          {/* Alternative Options */}
          <Card className="mt-12 border-0 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Continue with Free Plan</CardTitle>
              <CardDescription>
                You can always upgrade later when you're ready. Your data and settings will be preserved.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard">
                <Button className="w-full btn-hero">
                  Continue with Free Plan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingCancel;