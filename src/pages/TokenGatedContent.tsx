import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Lock, Unlock, Download, ExternalLink, CheckCircle, XCircle, Eye, Calendar } from 'lucide-react';

const TokenGatedContent = () => {
  const { id } = useParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [userEmail, setUserEmail] = useState('');

  // Mock content data
  const content = {
    id: id || 'content-123',
    title: 'Advanced React Best Practices Guide',
    description: 'Exclusive content for React Development Certificate holders',
    certificateRequired: 'Advanced React Development Certification',
    issuer: 'TechEd Academy',
    contentType: 'PDF Guide + Video Series',
    estimatedTime: '2 hours',
    resources: [
      {
        title: 'React Performance Optimization Guide',
        type: 'PDF',
        size: '2.3 MB',
        url: '#'
      },
      {
        title: 'Advanced Hooks Patterns Video',
        type: 'Video',
        duration: '45 min',
        url: '#'
      },
      {
        title: 'Code Examples Repository',
        type: 'GitHub',
        url: '#'
      },
      {
        title: 'Interactive Exercises',
        type: 'Web App',
        url: '#'
      }
    ]
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock verification result
    const hasAccess = userEmail.includes('valid') || userEmail === 'john@example.com';
    
    setVerificationResult({
      hasAccess,
      certificate: hasAccess ? {
        id: 'cert-123',
        title: 'Advanced React Development Certification',
        recipientName: 'John Doe',
        recipientEmail: userEmail,
        issuerName: 'TechEd Academy',
        issuedDate: '2024-01-15',
        verificationId: 'VF-2024-001-ABC123'
      } : null,
      message: hasAccess 
        ? 'Certificate verified! You have access to this content.'
        : 'No valid certificate found for this email address.'
    });

    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-orange-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Token-Gated Content</h1>
          </div>
          <p className="text-gray-600">Exclusive content for verified certificate holders</p>
        </div>

        {/* Content Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
            <p className="text-gray-600 mb-4">{content.description}</p>
            
            <div className="inline-flex items-center px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
              <Shield className="h-5 w-5 text-orange-600 mr-2" />
              <span className="text-orange-800 font-medium">
                Requires: {content.certificateRequired}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">{content.contentType}</div>
              <div className="text-sm text-gray-600">Content Type</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-600 mb-1">{content.estimatedTime}</div>
              <div className="text-sm text-gray-600">Estimated Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">{content.issuer}</div>
              <div className="text-sm text-gray-600">Content Provider</div>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        {!verificationResult && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Verify Your Certificate Access
            </h3>
            <form onSubmit={handleVerification} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (used for certificate)
                </label>
                <input
                  type="email"
                  id="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Verify Access
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Try "john@example.com" or any email containing "valid" for demo access</p>
            </div>
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && (
          <div className={`rounded-xl border-2 p-6 mb-8 ${
            verificationResult.hasAccess 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="text-center mb-6">
              {verificationResult.hasAccess ? (
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${
                verificationResult.hasAccess ? 'text-green-800' : 'text-red-800'
              }`}>
                {verificationResult.hasAccess ? 'Access Granted!' : 'Access Denied'}
              </h3>
              
              <p className={`text-lg ${
                verificationResult.hasAccess ? 'text-green-700' : 'text-red-700'
              }`}>
                {verificationResult.message}
              </p>
            </div>

            {verificationResult.hasAccess && verificationResult.certificate && (
              <div className="bg-white rounded-lg p-6 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-4">Verified Certificate Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Certificate:</span>
                    <span className="font-medium ml-2">{verificationResult.certificate.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Recipient:</span>
                    <span className="font-medium ml-2">{verificationResult.certificate.recipientName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Issued by:</span>
                    <span className="font-medium ml-2">{verificationResult.certificate.issuerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Issue Date:</span>
                    <span className="font-medium ml-2">
                      {new Date(verificationResult.certificate.issuedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!verificationResult.hasAccess && (
              <div className="text-center">
                <p className="text-red-700 mb-4">
                  You need a valid "{content.certificateRequired}" certificate to access this content.
                </p>
                <Link
                  to="/verify"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Verify Different Certificate
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Content Access */}
        {verificationResult?.hasAccess && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Exclusive Content</h3>
              <div className="flex items-center text-green-600">
                <Unlock className="h-5 w-5 mr-2" />
                <span className="font-medium">Unlocked</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.resources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                          {resource.type}
                        </span>
                        {resource.size && <span>{resource.size}</span>}
                        {resource.duration && <span>{resource.duration}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <a
                    href={resource.url}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    {resource.type === 'PDF' ? (
                      <Download className="h-4 w-4 mr-2" />
                    ) : (
                      <ExternalLink className="h-4 w-4 mr-2" />
                    )}
                    {resource.type === 'PDF' ? 'Download' : 'Access'}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <h4 className="font-medium text-blue-900">Access Information</h4>
                  <p className="text-blue-700 text-sm">
                    Your access to this content is tied to your verified certificate. 
                    Access will remain available as long as your certificate is valid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Try Again */}
        {verificationResult && !verificationResult.hasAccess && (
          <div className="text-center">
            <button
              onClick={() => {
                setVerificationResult(null);
                setUserEmail('');
              }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Different Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenGatedContent;