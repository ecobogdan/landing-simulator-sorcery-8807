import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ElevatedCard } from "@/components/ui/elevated-card";


const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();

  const handleSelectPlan = async (planId: string, planName: string) => {
    try {
      // Mock API call to create Stripe Checkout Session
      toast({
        title: "Redirecting to checkout...",
        description: `Setting up payment for ${planName} plan`,
      });
      
      // In a real implementation, this would call your backend:
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ planId, billing: isYearly ? 'yearly' : 'monthly' })
      // });
      // const { url } = await response.json();
      // window.location.href = url;
      
      // Mock redirect simulation
      setTimeout(() => {
        toast({
          title: "Mock checkout redirect",
          description: "In production, this would redirect to Stripe Checkout",
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout process",
        variant: "destructive",
      });
    }
  };

  const plans = [
    {
      id: "starter",
      name: "Starter", 
      description: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "1 social account",
        "10 posts per month",
        "Basic analytics",
        "Email support",
        "Mobile responsive"
      ],
      limitations: [
        "Limited to 10 posts/month",
        "1 team member only"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing creators and small teams",
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: true,
      features: [
        "5 social accounts",
        "Unlimited posts",
        "Advanced analytics",
        "Team collaboration (up to 5 members)",
        "Priority email support",
        "Custom posting times",
        "Bulk upload",
        "Content calendar"
      ]
    },
    {
      id: "business", 
      name: "Business",
      description: "For agencies and larger teams",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Unlimited social accounts",
        "Unlimited posts",
        "Advanced analytics & reports",
        "Unlimited team members",
        "24/7 priority support",
        "White-label reports",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise", 
      description: "Custom solution for large organizations",
      monthlyPrice: null,
      yearlyPrice: null,
      features: [
        "Everything in Business",
        "Custom integrations",
        "Advanced security features",
        "On-premise deployment options",
        "Custom SLA",
        "Dedicated support team",
        "Training and onboarding",
        "Custom billing terms"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">SocialGlide</Link>
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth/signup">
              <Button>Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`transition-colors ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch 
              checked={isYearly} 
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`transition-colors ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            <Badge className="bg-success text-success-foreground ml-2">Save 20%</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`card-elevated interactive-scale border-0 relative ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="py-4">
                  {plan.monthlyPrice === null ? (
                    <div className="text-3xl font-bold text-primary">Custom</div>
                  ) : plan.monthlyPrice === 0 ? (
                    <div className="text-3xl font-bold text-primary">Free</div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {isYearly ? '/year' : '/month'}
                      </span>
                    </div>
                  )}
                  {isYearly && plan.monthlyPrice > 0 && (
                    <div className="text-sm text-muted-foreground">
                      ${Math.round((plan.yearlyPrice || 0) / 12)}/month billed yearly
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-4 h-4 text-xs mt-0.5 flex-shrink-0">⚠</span>
                      <span className="text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {plan.monthlyPrice === null ? (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => toast({
                      title: "Contact Sales",
                      description: "Please contact our sales team for enterprise pricing",
                    })}
                  >
                    Contact Sales
                  </Button>
                ) : (
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-hero' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id, plan.name)}
                  >
                    {plan.monthlyPrice === 0 ? 'Get Started Free' : 'Select Plan'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-muted/30 px-4 relative">
        {/* Bottom wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-12 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-background"
            ></path>
          </svg>
        </div>
        
        <div className="container mx-auto max-w-3xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-display font-bold mb-4">Frequently asked questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about our platform</p>
          </AnimatedSection>
          
          <AnimatedSection>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  question: "How many social accounts can I connect?",
                  answer: "This depends on your plan. The free plan allows 1 account, Pro allows 5 accounts, and Business allows unlimited accounts."
                },
                {
                  question: "Do you support all major social platforms?",
                  answer: "Yes! We support Instagram, Twitter, LinkedIn, YouTube, TikTok, Facebook, and more platforms are added regularly."
                },
                {
                  question: "Can I try before I buy?",
                  answer: "Absolutely! Start with our free plan and upgrade when you're ready. No credit card required to get started."
                },
                {
                  question: "Is there a mobile app?",
                  answer: "Our web app is fully responsive and works great on mobile. Native mobile apps are coming soon!"
                },
                {
                  question: "Can I cancel anytime?",
                  answer: "Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg overflow-hidden">
                  <ElevatedCard className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors text-left">
                      <span className="text-lg font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </ElevatedCard>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

        {/* CTA Section */}
        <div className="text-center mt-20 slide-up">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of creators who've streamlined their social media workflow.
          </p>
          <Link to="/auth/signup">
            <Button size="lg" className="btn-hero text-lg px-8 py-6">
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;