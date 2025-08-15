import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Clock, 
  Shield, 
  Zap,
  Check,
  ArrowRight,
  Star,
  ChevronDown,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageSquare,
  FileText,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ElevatedCard } from "@/components/ui/elevated-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ParallaxContainer } from "@/components/ui/parallax-container";
import { RevealList } from "@/components/ui/reveal-list";

const Landing = () => {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const handleScrollReveal = useCallback(() => {
    const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('revealed');
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
      handleScrollReveal();
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScrollReveal(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScrollReveal]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavScrolled ? 'bg-background/80 backdrop-blur-lg border-b shadow-soft py-2' : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            SocialGlide
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                className="relative text-muted-foreground hover:text-foreground transition-colors group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost" className="premium-hover">Sign In</Button>
            </Link>
            <Link to="/auth/signup">
              <Button className="btn-hero premium-hover">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <ParallaxContainer className="absolute inset-0 -z-10" offset={30}>
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute top-40 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl float-animation"></div>
        </ParallaxContainer>
        
        {/* Hero glow effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full hero-glow"></div>
        </div>

        <div className="container mx-auto text-center max-w-5xl relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
              <Badge className="mb-6 px-4 py-2 text-sm premium-hover">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 10,000+ content creators
              </Badge>
              <h1 className="text-hero font-bold mb-6 bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Schedule Posts.<br />
                Save Time.<br />
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Grow Faster.
                </span>
              </h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The all-in-one platform to plan, create, and schedule your social media content across all platforms. 
              Join thousands of creators who've streamlined their workflow.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/auth/signup">
                <Button size="lg" className="btn-hero text-lg px-8 py-6 premium-hover">
                  Start 15-Day Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 premium-hover" onClick={() => scrollToSection('features')}>
                See How It Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Demo Card */}
          <motion.div
            className="max-w-sm mx-auto"
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ElevatedCard className="demo-card-float p-4 bg-gradient-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">Scheduled for Tomorrow</p>
                  <p className="text-xs text-muted-foreground">9:00 AM • 3 platforms</p>
                </div>
              </div>
              <div className="text-left space-y-2">
                <p className="text-sm">"Just launched our new feature! 🚀 #ProductUpdate"</p>
                <div className="flex gap-1">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <Twitter className="w-4 h-4 text-blue-500" />
                  <Linkedin className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </ElevatedCard>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/30 relative">
        {/* Decorative wave separator */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-12"
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
        
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <p className="text-muted-foreground mb-8">Trusted by leading brands and creators</p>
            <div className="flex items-center justify-center mb-8">
              <AnimatedCounter 
                value={10000} 
                suffix="+" 
                className="text-3xl font-bold text-primary mr-2" 
              />
              <span className="text-muted-foreground">active users</span>
            </div>
            <RevealList className="flex flex-wrap justify-center items-center gap-8">
              {[
                { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
                { name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
                { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
                { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
                { name: 'TikTok', icon: MessageSquare, color: 'text-gray-800' },
                { name: 'Facebook', icon: MessageSquare, color: 'text-blue-500' },
              ].map((platform) => (
                <ElevatedCard
                  key={platform.name}
                  className="p-4 flex flex-col items-center gap-2 group"
                >
                  <platform.icon className={`w-8 h-8 ${platform.color} transition-transform group-hover:scale-110`} />
                  <span className="text-sm font-medium">{platform.name}</span>
                </ElevatedCard>
              ))}
            </RevealList>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-display font-bold mb-4">Everything you need to dominate social media</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your content workflow and maximize your reach.
            </p>
          </AnimatedSection>
          <RevealList className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Plan and schedule posts across all platforms with optimal timing suggestions.",
                color: "text-blue-500"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together with approval workflows, comments, and role-based permissions.",
                color: "text-green-500"
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                description: "Track performance with detailed analytics and engagement metrics.",
                color: "text-purple-500"
              },
              {
                icon: Clock,
                title: "Bulk Operations",
                description: "Upload and schedule hundreds of posts at once with CSV import.",
                color: "text-orange-500"
              },
              {
                icon: Shield,
                title: "Brand Safety",
                description: "Built-in content moderation and brand guidelines enforcement.",
                color: "text-red-500"
              },
              {
                icon: Zap,
                title: "AI Assistant",
                description: "Generate captions, hashtags, and optimize content with AI.",
                color: "text-yellow-500"
              }
            ].map((feature, index) => (
              <ElevatedCard
                key={index}
                className="h-full p-6 group"
              >
                <div className="mb-4">
                  <feature.icon className={`w-12 h-12 ${feature.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </ElevatedCard>
            ))}
          </RevealList>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30 px-4 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 gradient-shift"></div>
        
        <div className="container mx-auto relative">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-display font-bold mb-4">Simple workflow, powerful results</h2>
            <p className="text-xl text-muted-foreground">Get started in minutes, not hours</p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {/* Connecting lines */}
            <motion.svg
              className="absolute top-8 left-1/4 right-1/4 h-0.5 hidden md:block"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <path
                d="M0,0 L100,0"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </motion.svg>

            {[
              {
                step: "01",
                title: "Connect & Authenticate",
                description: "Securely link all your social media accounts with enterprise-grade OAuth authentication. Our smart verification system ensures seamless integration with Instagram, Twitter, LinkedIn, YouTube, TikTok, and Facebook—all in under 60 seconds.",
                icon: Users,
                features: ["One-click OAuth setup", "Enterprise security", "Multi-platform sync", "Real-time verification"]
              },
              {
                step: "02", 
                title: "Create & Optimize",
                description: "Leverage our AI-powered content studio with intelligent caption generation, hashtag optimization, and visual enhancement tools. Create stunning posts with our advanced editor featuring brand asset management and collaboration workflows.",
                icon: FileText,
                features: ["AI caption generation", "Smart hashtag suggestions", "Visual editor", "Brand asset library"]
              },
              {
                step: "03",
                title: "Schedule & Analyze",
                description: "Deploy content with precision using our intelligent scheduling engine that analyzes audience behavior patterns. Track performance with real-time analytics, engagement insights, and automated reporting for data-driven growth.",
                icon: Calendar,
                features: ["Smart timing optimization", "Cross-platform scheduling", "Advanced analytics", "Performance insights"]
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ElevatedCard className="text-center p-8 relative group hover:shadow-premium transition-all duration-300 h-full">
                  <motion.div
                    className="w-20 h-20 bg-gradient-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-soft"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.step}
                  </motion.div>
                  <step.icon className="w-10 h-10 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                  
                  {/* Premium feature badges */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * featureIndex }}
                        viewport={{ once: true }}
                      >
                        <Badge variant="secondary" className="text-xs px-3 py-1 premium-hover">
                          <Check className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </ElevatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-display font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Choose the plan that's right for you. Start free, upgrade when you're ready.
            </p>
            
            {/* Monthly/Yearly Toggle */}
            <motion.div 
              className="flex items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
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

            <RevealList className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  name: "Starter",
                  price: 0,
                  yearlyPrice: 0,
                  description: "Perfect for getting started",
                  features: ["1 social account", "10 posts/month", "Basic analytics"],
                  popular: false
                },
                {
                  name: "Pro",
                  price: 29,
                  yearlyPrice: 23,
                  description: "For growing creators",
                  features: ["5 social accounts", "Unlimited posts", "Advanced analytics", "Team collaboration"],
                  popular: true
                },
                {
                  name: "Business",
                  price: 99,
                  yearlyPrice: 79,
                  description: "For agencies and teams",
                  features: ["Unlimited accounts", "White-label reports", "Priority support", "Custom integrations"],
                  popular: false
                }
              ].map((plan, index) => (
                <ElevatedCard
                  key={index}
                  className={`relative p-6 ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <div className="text-4xl font-bold">
                      <AnimatedCounter 
                        value={isYearly ? plan.yearlyPrice : plan.price} 
                        prefix="$" 
                        className="text-4xl font-bold"
                      />
                      <span className="text-lg text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                    </div>
                    {isYearly && plan.price > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${(plan.price * 12 - plan.yearlyPrice * 12).toFixed(0)} per year
                      </p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth/signup">
                    <Button 
                      className="w-full premium-hover" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </ElevatedCard>
              ))}
            </RevealList>
            
          </AnimatedSection>
        </div>
      </section>

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

      {/* Final CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-primary text-primary-foreground relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ParallaxContainer className="absolute inset-0" offset={20}>
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </ParallaxContainer>
        
        <div className="container mx-auto px-4 text-center relative">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to transform your social media strategy?
          </motion.h2>
          <motion.p 
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join thousands of creators and businesses who've already streamlined their workflow with SocialGlide.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/auth/signup">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 premium-hover bg-white text-primary hover:bg-white/90"
              >
                Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t">
        <div className="container mx-auto px-4">
          <RevealList className="grid md:grid-cols-4 gap-8">
            {[
              <div key="brand">
                <motion.div 
                  className="text-2xl font-bold text-primary mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  SocialGlide
                </motion.div>
                <p className="text-muted-foreground mb-4">
                  The all-in-one platform for social media scheduling and management.
                </p>
              </div>,
              <div key="product">
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {['Features', 'Pricing', 'Integrations', 'API'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-foreground transition-colors premium-hover">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>,
              <div key="company">
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-foreground transition-colors premium-hover">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>,
              <div key="legal">
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {['Privacy', 'Terms', 'Security'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-foreground transition-colors premium-hover">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ]}
          </RevealList>
          <motion.div 
            className="border-t mt-12 pt-8 text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 SocialGlide. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;