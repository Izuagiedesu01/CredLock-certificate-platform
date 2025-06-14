import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, Globe, TrendingUp, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Tamper-Proof Certificates",
      description: "Every certificate is secured on the blockchain, making them impossible to forge or manipulate."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Gasless Transactions",
      description: "No gas fees or crypto wallets required. Powered by XION's blockchain abstraction."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Meta Accounts Integration",
      description: "Simple email-based authentication using Meta Accounts. No complex wallet setup."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Public Verification",
      description: "Anyone can verify certificates instantly using our public verification portal."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Track certificate views, verifications, and engagement with detailed analytics."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Token-Gated Content",
      description: "Attach exclusive content that only certificate holders can access."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Education Director",
      company: "TechEd Academy",
      content: "CredLock has revolutionized how we issue course certificates. The verification process is seamless.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "HR Manager",
      company: "InnovateCorp",
      content: "Finally, a certificate system we can trust. The blockchain verification gives us complete confidence.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Event Organizer",
      company: "ConferencePro",
      content: "Our attendees love the social sharing features and professional PDF downloads.",
      rating: 5
    }
  ];

  const useCases = [
    {
      title: "Educational Institutions",
      description: "Issue verifiable diplomas, course certificates, and academic credentials",
      image: "https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Corporate Training",
      description: "Certify employee skills and professional development achievements",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Event Management",
      description: "Provide attendance certificates and completion badges for events",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Tamper-proof credentials.
              <span className="text-blue-600 block">Zero wallets. Zero gas.</span>
              <span className="text-teal-600">100% verifiable.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Issue verifiable, on-chain certificates using gasless NFTs with no crypto wallets required. 
              Powered by XION's blockchain abstraction technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signin"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg inline-flex items-center justify-center"
              >
                Start Issuing Certificates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/verify"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                Verify Certificate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to issue verifiable certificates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional tools for creating, managing, and verifying digital certificates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect for every industry
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From education to corporate training, CredLock serves diverse certification needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by leading organizations
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about CredLock
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations already using CredLock for secure certificate management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signin"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              to="/pricing"
              className="bg-transparent text-white px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;