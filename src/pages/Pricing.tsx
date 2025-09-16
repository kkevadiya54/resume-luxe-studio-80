import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '3 resume downloads per month',
        'Basic templates',
        'PDF export',
        'Basic editing tools',
        'Email support'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Most popular for job seekers',
      features: [
        'Unlimited resume downloads',
        'All premium templates',
        'Advanced editing tools',
        'Custom colors & fonts',
        'Cover letter builder',
        'Priority support',
        'ATS optimization checker'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'premium' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: 'per month',
      description: 'For teams and recruiters',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Brand customization',
        'Bulk operations',
        'Analytics dashboard',
        'Custom integrations',
        'Dedicated account manager'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'default' as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-foreground">Pricing Plans</h1>
            <div></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-gradient-primary text-white px-4 py-2 mb-6">
            <Crown className="w-4 h-4 mr-2" />
            Flexible Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Choose Your Perfect
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Plan
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Start free and upgrade when you need more power. All plans include our core features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`relative overflow-hidden bg-gradient-card backdrop-blur-sm border transition-all duration-300 hover:shadow-luxury ${
                  plan.popular 
                    ? 'border-primary scale-105 shadow-luxury' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-primary text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.buttonVariant}
                    className="w-full"
                    onClick={() => navigate('/builder')}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing and features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and Apple Pay for your convenience."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! All Pro plans come with a 7-day free trial. No credit card required to start."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-gradient-card backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;