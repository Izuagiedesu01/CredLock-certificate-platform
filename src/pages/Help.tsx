import React, { useState } from 'react';
import { Search, Book, MessageCircle, Mail, Phone, HelpCircle, ChevronDown, ChevronRight, Shield, Zap, Users, BarChart3 } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'certificates', label: 'Certificates', icon: Shield },
    { id: 'recipients', label: 'Recipients', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'billing', label: 'Billing', icon: MessageCircle },
    { id: 'api', label: 'API', icon: Book }
  ];

  const articles = {
    'getting-started': [
      {
        title: 'How to create your first certificate template',
        content: 'Learn how to design and create professional certificate templates using our drag-and-drop editor.',
        readTime: '5 min read'
      },
      {
        title: 'Setting up your account',
        content: 'Complete guide to setting up your CredLock account and configuring your organization settings.',
        readTime: '3 min read'
      },
      {
        title: 'Understanding Meta Accounts integration',
        content: 'Learn how Meta Accounts authentication works and how it simplifies the certificate process.',
        readTime: '4 min read'
      }
    ],
    'certificates': [
      {
        title: 'Certificate customization options',
        content: 'Explore all the ways you can customize your certificates including colors, fonts, and branding.',
        readTime: '6 min read'
      },
      {
        title: 'Adding token-gated content',
        content: 'Learn how to attach exclusive content that only certificate holders can access.',
        readTime: '4 min read'
      },
      {
        title: 'Certificate expiration and renewal',
        content: 'Understanding how certificate expiration works and how to set up renewal processes.',
        readTime: '5 min read'
      }
    ],
    'recipients': [
      {
        title: 'Bulk uploading recipients',
        content: 'Learn how to upload multiple recipients at once using CSV files.',
        readTime: '3 min read'
      },
      {
        title: 'Managing recipient communications',
        content: 'Best practices for communicating with certificate recipients.',
        readTime: '4 min read'
      },
      {
        title: 'Tracking recipient engagement',
        content: 'Monitor how recipients interact with their certificates.',
        readTime: '3 min read'
      }
    ],
    'analytics': [
      {
        title: 'Understanding your analytics dashboard',
        content: 'Get insights into certificate performance and recipient engagement.',
        readTime: '5 min read'
      },
      {
        title: 'Generating reports',
        content: 'Learn how to create and export detailed reports about your certificates.',
        readTime: '4 min read'
      }
    ],
    'billing': [
      {
        title: 'Understanding credit usage',
        content: 'Learn how certificate credits work and how to manage your usage.',
        readTime: '3 min read'
      },
      {
        title: 'Upgrading your plan',
        content: 'Guide to upgrading from free to paid plans and understanding features.',
        readTime: '4 min read'
      }
    ],
    'api': [
      {
        title: 'Getting started with the CredLock API',
        content: 'Introduction to our REST API and how to get started with integration.',
        readTime: '8 min read'
      },
      {
        title: 'Authentication and API keys',
        content: 'Learn how to authenticate with our API and manage your API keys.',
        readTime: '5 min read'
      }
    ]
  };

  const faqs = [
    {
      id: '1',
      question: 'How does blockchain verification work?',
      answer: 'CredLock uses XION blockchain technology to store certificate records immutably. Each certificate gets a unique hash that can be verified publicly, ensuring authenticity and preventing tampering.',
      category: 'certificates'
    },
    {
      id: '2',
      question: 'What happens if I exceed my certificate limit?',
      answer: 'If you exceed your monthly certificate limit, you can purchase additional credits at $0.20 per certificate or upgrade to a higher plan for better value and more features.',
      category: 'billing'
    },
    {
      id: '3',
      question: 'Can recipients download their certificates as PDF?',
      answer: 'Yes, all certificate recipients can download their certificates as high-quality PDF files. The PDFs include QR codes for easy verification.',
      category: 'certificates'
    },
    {
      id: '4',
      question: 'How do I track certificate engagement?',
      answer: 'Our analytics dashboard shows detailed metrics including certificate views, downloads, verifications, and social shares. You can also track individual recipient engagement.',
      category: 'analytics'
    },
    {
      id: '5',
      question: 'Is there an API for integration?',
      answer: 'Yes, Pro and Enterprise plans include full API access. You can integrate certificate issuance, verification, and management directly into your existing systems.',
      category: 'api'
    },
    {
      id: '6',
      question: 'What is token-gated content?',
      answer: 'Token-gated content allows you to attach exclusive resources (like guides, videos, or files) to certificates. Only verified certificate holders can access this content.',
      category: 'certificates'
    }
  ];

  const filteredArticles = articles[activeCategory as keyof typeof articles] || [];
  const filteredFAQs = faqs.filter(faq => 
    searchTerm === '' || 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, browse our documentation, or get in touch with support
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <Book className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600 mb-4">Comprehensive guides and tutorials</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">Browse Docs →</button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <MessageCircle className="h-8 w-8 text-teal-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Get instant help from our support team</p>
            <button className="text-teal-600 hover:text-teal-800 font-medium">Start Chat →</button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <Mail className="h-8 w-8 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 mb-4">Send us a message and we'll respond within 24 hours</p>
            <button className="text-orange-600 hover:text-orange-800 font-medium">Contact Us →</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className="h-5 w-5 mr-3" />
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Articles */}
            {!searchTerm && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {categories.find(c => c.id === activeCategory)?.label} Articles
                </h2>
                <div className="space-y-4">
                  {filteredArticles.map((article, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{article.content}</p>
                          <span className="text-xs text-blue-600">{article.readTime}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {searchTerm ? 'Search Results' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && searchTerm && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try searching with different keywords or browse our categories</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 mt-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our support team is here to help you succeed with CredLock
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              <Mail className="h-5 w-5 mr-2" />
              Email Support
            </button>
            <button className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium">
              <Phone className="h-5 w-5 mr-2" />
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;