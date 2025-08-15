import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, ArrowRight, Crown, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ElevatedCard } from "@/components/ui/elevated-card";
import { motion } from "framer-motion";

const Upgrade = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();

  // Mock current user plan
  const currentPlan = {
    id: "starter",
    name: "Starter",
    features: ["1 social account", "10 posts per month", "Basic analytics"]
  };

  const handleSelectPlan = async (planId: string, planName: string) => {
    try {
      toast({
        title: "Processing upgrade...",
        description: `Upgrading to ${planName} plan`,
      });
      
      // Mock API call - in production this would create a Stripe Checkout Session
      setTimeout(() => {
        toast({
          title: "Mock upgrade initiated",
          description: "In production, this would redirect to Stripe Checkout",
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process upgrade",
        variant: "destructive",
      });
    }
  };

  const plans = [
    {
      id: "pro",
      name: "Pro",
      description: "Perfect for creators & small teams",
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: true,
      trial: "15-day free trial",
      features: [
        "Up to 5 social accounts per platform",
        "Unlimited posts & scheduling",
        "Advanced analytics & insights",
        "Team collaboration (up to 5 members)",
        "Priority email support",
        "AI-powered content suggestions",
        "Bulk upload & CSV import",
        "Content calendar with optimization"
      ]
    },
    {
      id: "business", 
      name: "Business",
      description: "For growing teams & agencies",
      monthlyPrice: 99,
      yearlyPrice: 990,
      trial: "15-day free trial",
      features: [
        "Unlimited social accounts",
        "Unlimited posts & automation",
        "Advanced analytics & white-label reports",
        "Unlimited team members",
        "24/7 priority support",
        "Custom branding & workflows",
        "API access & integrations",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Premium Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50 rounded-2xl"></div>
        <div className="relative p-8 rounded-2xl border bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Upgrade Your Plan
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                You're currently on the <strong>{currentPlan.name}</strong> plan. 
                Unlock premium features and accelerate your growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Plan Status */}
      <ElevatedCard className="max-w-md mx-auto border-0 shadow-elegant bg-gradient-subtle">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Current Plan</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">Active</Badge>
          </div>
          <CardDescription>
            <strong>{currentPlan.name}</strong> - Free forever
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {currentPlan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </ElevatedCard>
      
      {/* Billing Toggle */}
      <motion.div 
        className="flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className={`transition-colors ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>Monthly</span>
        <motion.button
          className="relative w-14 h-8 bg-muted rounded-full p-1"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsYearly(!isYearly)}
        >
          <motion.div
            className="w-6 h-6 bg-primary rounded-full"
            layout
            animate={{ x: isYearly ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
          />
        </motion.button>
        <span className={`transition-colors ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>Yearly</span>
        <Badge variant="secondary" className="ml-2">Save 20%</Badge>
      </motion.div>

      {/* Premium Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ElevatedCard 
              className={`relative p-6 border-0 shadow-elegant transition-all duration-300 ${
                plan.current 
                  ? 'opacity-60 ring-1 ring-muted bg-gradient-subtle' 
                  : plan.popular 
                    ? 'ring-2 ring-primary scale-105 shadow-glow bg-gradient-primary/5' 
                    : 'hover:scale-102 bg-gradient-subtle hover:shadow-glow'
              }`}
            >
              {plan.current && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground">
                  Current Plan
                </Badge>
              )}
              {plan.popular && !plan.current && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary shadow-glow">
                  <Zap className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                  {plan.name}
                  {plan.upgrade && <ArrowRight className="w-5 h-5 text-primary" />}
                </h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="text-4xl font-bold">
                  <AnimatedCounter 
                    value={plan.monthlyPrice === 0 ? 0 : (isYearly ? plan.yearlyPrice : plan.monthlyPrice)} 
                    prefix="$" 
                    className="text-4xl font-bold text-primary"
                  />
                  {plan.monthlyPrice === 0 ? (
                    <span className="text-lg text-muted-foreground ml-1">forever</span>
                  ) : (
                    <span className="text-lg text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                  )}
                </div>
                {isYearly && plan.monthlyPrice > 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)} per year
                  </p>
                )}
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      plan.current ? 'text-muted-foreground' : 'text-success'
                    }`} />
                    <span className={`text-sm ${
                      plan.current ? 'text-muted-foreground' : ''
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.current ? (
                <Button className="w-full" variant="outline" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className={`w-full premium-hover ${plan.popular ? 'btn-hero shadow-glow' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSelectPlan(plan.id, plan.name)}
                >
                  Upgrade to {plan.name}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </ElevatedCard>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">Why upgrade?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Zap,
              title: "Unlock Full Potential",
              description: "Access advanced features and remove limitations to grow your social media presence."
            },
            {
              icon: Crown,
              title: "Priority Support",
              description: "Get faster response times and dedicated support from our team."
            },
            {
              icon: ArrowRight,
              title: "Scale With Confidence",
              description: "No limits on posts, accounts, or team members. Focus on growth, not restrictions."
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <ElevatedCard className="border-0 text-center shadow-elegant bg-gradient-subtle hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </ElevatedCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Money Back Guarantee */}
      <motion.div 
        className="text-center mt-16 p-8 bg-gradient-subtle rounded-2xl border shadow-elegant"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-4">30-Day Money Back Guarantee</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Try any paid plan risk-free. If you're not completely satisfied within 30 days, 
          we'll refund your payment, no questions asked.
        </p>
      </motion.div>
    </div>
  );
};

export default Upgrade;