import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Zap, Shield, Users, BarChart3, Palette, Globe, HeadphonesIcon, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Pricing = () => {
  const { user, updatePlan } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null);

  const handleUpgrade = async (plan: 'free' | 'pro' | 'enterprise') => {
    setIsUpgrading(plan);
    
    // Simulate upgrade process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (user) {
      updatePlan(plan);
    }
    
    setIsUpgrading(null);
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying out CredLock',
      monthlyPrice: 0,
      yearlyPrice: 0,
      credits: 5,
      features: [
        'Up to 5 certificates per month',
        'Basic certificate templates',
        'Email delivery',
        'Public verification',
        'Standard support',
        'Basic analytics'
      ],
      limitations: [
        'No custom branding',
        'No API access',
        'No token-gated content',
        'No white-labeling'
      ],
      icon: <Shield className="h-6 w-6" />,
      color: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For growing organizations and educators',
      monthlyPrice: 19,
      yearlyPrice: 15,
      credits: 100,
      features: [
        'Up to 100 certificates per month',
        'Custom certificate templates',
        'Custom branding & logos',
        'Advanced analytics dashboard',
        'Token-gated content access',
        'Priority email support',
        'Bulk certificate issuance',
        'Social media integration',
        'PDF customization',
        'Expiration management'
      ],
      limitations: [
        'No white-labeling',
        'No dedicated support',
        'No custom domains'
      ],
      icon: <Zap className="h-6 w-6" />,
      color: 'border-blue-500',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large institutions and organizations',
      monthlyPrice: 99,
      yearlyPrice: 79,
      credits: 'Unlimited',
      features: [
        'Unlimited certificates',
        'Full white-labeling',
        'Custom domains',
        'Advanced API access',
        'Single Sign-On (SSO)',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security features',
        'Multi-user management',
        'Custom contract deployment',
        'Priority blockchain processing',
        '24/7 phone support'
      ],
      limitations: [],
      icon: <Crown className="h-6 w-6" />,
      color: 'border-purple-500',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      popular: false
    }
  ];

  const addOns = [
    {
      name: 'Additional Certificate Credits',
      description: 'Extra certificates beyond your plan limit',
      pricing: '$0.20 per certificate',
      icon: <Shield className="h-5 w-5" />
    },
    {
      name: 'Custom Template Design',
      description: 'Professional template design service',
      pricing: '$49 per template',
      icon: <Palette className="h-5 w-5" />
    },
    {
      name: 'Premium Support',
      description: 'Priority support with faster response times',
      pricing: '$19/month',
      icon: <HeadphonesIcon className="h-5 w-5" />
    },
    {
      name: 'Advanced Analytics',
      description: 'Detailed insights and custom reporting',
      pricing: '$29/month',
      icon: <BarChart3 className="h-5 w-5" />
    }
  ];

  const faqs = [
    {
      question: 'What happens when I exceed my certificate limit?',
      answer: 'You can purchase additional certificate credits at $0.20 per certificate, or upgrade to a higher plan for better value.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees for any of our plans. You only pay the monthly or yearly subscription fee.'
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with our free plan and scale as you grow. All plans include blockchain verification and secure certificate management.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg border-2 ${plan.color} relative overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-blue-600">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 ml-2">{plan.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'month'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-lg font-semibold text-gray-900">
                      {typeof plan.credits === 'number' ? `${plan.credits} certificates/month` : plan.credits}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center opacity-60">
                      <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  {user?.plan === plan.id ? (
                    <div className="text-green-600 font-medium py-3">
                      Current Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(plan.id as 'free' | 'pro' | 'enterprise')}
                      disabled={isUpgrading === plan.id}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${plan.buttonColor} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isUpgrading === plan.id ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Upgrading...
                        </div>
                      ) : (
                        plan.id === 'free' ? 'Get Started' : 
                        plan.id === 'enterprise' ? 'Contact Sales' : 'Upgrade Now'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add-ons & Extensions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 mr-3">{addon.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{addon.description}</p>
                <p className="text-lg font-bold text-blue-600">{addon.pricing}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of organizations already using CredLock
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Free Trial
            </Link>
            <Link
              to="/help"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;