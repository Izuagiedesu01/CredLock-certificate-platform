import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Download, Share2, Eye, Calendar, CheckCircle, ExternalLink, Lock, Unlock } from 'lucide-react';

const CertificateView = () => {
  const { id } = useParams();
  const [isSharing, setIsSharing] = useState(false);
  const [showTokenGatedContent, setShowTokenGatedContent] = useState(false);

  // Mock certificate data
  const certificate = {
    id: id || 'cert-123',
    title: 'Advanced React Development Certification',
    description: 'Comprehensive certification covering advanced React concepts, state management, and performance optimization',
    recipientName: 'John Doe',
    recipientEmail: 'john@example.com',
    issuerName: 'TechEd Academy',
    issuerLogo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teched',
    issuedDate: '2024-01-15',
    expiryDate: '2025-01-15',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    accentColor: '#3B82F6',
    verificationId: 'VF-2024-001-ABC123',
    blockchainHash: '0x1234567890abcdef...',
    isValid: true,
    verificationCount: 12,
    downloadCount: 1,
    hasTokenGatedContent: true,
    tokenGatedContent: {
      title: 'Exclusive React Best Practices Guide',
      description: 'Access to our premium React development guidelines and code examples',
      contentUrl: 'https://example.com/exclusive-content'
    }
  };

  const handleDownload = () => {
    // Simulate PDF download
    console.log('Downloading certificate...');
  };

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}/certificate/${certificate.id}`;
    const shareText = `I've earned my ${certificate.title} certificate from ${certificate.issuerName}! 🎓`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      default:
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
    }
    setIsSharing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Verified Certificate</h1>
          </div>
          <p className="text-gray-600">This certificate has been verified on the blockchain</p>
        </div>

        {/* Certificate */}
        <div className="bg-white rounded-xl shadow-lg border-4 border-gray-200 p-8 mb-8">
          <div 
            className="text-center"
            style={{ 
              backgroundColor: certificate.backgroundColor,
              color: certificate.textColor,
              minHeight: '500px',
              padding: '3rem',
              borderRadius: '0.5rem'
            }}
          >
            {/* Issuer Logo */}
            <div className="mb-8">
              <img
                src={certificate.issuerLogo}
                alt={certificate.issuerName}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-sm opacity-75">{certificate.issuerName}</p>
            </div>
            
            {/* Certificate Title */}
            <h1 
              className="text-4xl font-bold mb-8"
              style={{ color: certificate.accentColor }}
            >
              Certificate of Achievement
            </h1>
            
            {/* Recipient */}
            <div className="mb-8">
              <p className="text-lg mb-2">This is to certify that</p>
              <div className="border-b-2 border-current w-80 mx-auto mb-4 py-4">
                <span className="text-2xl font-bold">{certificate.recipientName}</span>
              </div>
              <p className="opacity-75">has successfully completed</p>
            </div>
            
            {/* Course Title */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{certificate.title}</h2>
              <p className="text-sm opacity-75 max-w-2xl mx-auto">
                {certificate.description}
              </p>
            </div>
            
            {/* Footer */}
            <div className="flex justify-between items-end mt-12">
              <div className="text-left">
                <div className="border-b border-current w-40 mb-2"></div>
                <p className="text-sm">Authorized Signature</p>
                <p className="text-xs opacity-75">{certificate.issuerName}</p>
              </div>
              
              <div className="text-right">
                <div className="border-b border-current w-32 mb-2"></div>
                <p className="text-sm">{new Date(certificate.issuedDate).toLocaleDateString()}</p>
                <p className="text-xs opacity-75">Date of Issue</p>
              </div>
            </div>
            
            {/* Verification Info */}
            <div className="mt-8 text-xs opacity-50 border-t border-current pt-4">
              <p>Certificate ID: {certificate.verificationId}</p>
              <p>Blockchain Hash: {certificate.blockchainHash}</p>
              <p>Verify at: credlock.com/verify</p>
            </div>
          </div>
        </div>

        {/* Certificate Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Verified & Valid</span>
              </div>
              <div className="text-sm text-gray-500">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {certificate.verificationCount} verifications
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setIsSharing(!isSharing)}
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
                
                {isSharing && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Share on LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Share on Facebook
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient:</span>
                <span className="font-medium">{certificate.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Issued by:</span>
                <span className="font-medium">{certificate.issuerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Issue Date:</span>
                <span className="font-medium">{new Date(certificate.issuedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry Date:</span>
                <span className="font-medium">{new Date(certificate.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certificate ID:</span>
                <span className="font-medium text-sm">{certificate.verificationId}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-600 font-medium">Verified on Blockchain</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Transaction Hash:</p>
                <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1 break-all">
                  {certificate.blockchainHash}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Network:</span>
                <span className="font-medium">XION Chain</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Verifications:</span>
                <span className="font-medium">{certificate.verificationCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Token-Gated Content */}
        {certificate.hasTokenGatedContent && (
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Lock className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Exclusive Certificate Holder Content</h3>
              </div>
              <button
                onClick={() => setShowTokenGatedContent(!showTokenGatedContent)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Unlock className="h-5 w-5 mr-2" />
                {showTokenGatedContent ? 'Hide Content' : 'Access Content'}
              </button>
            </div>
            
            {showTokenGatedContent && (
              <div className="bg-white rounded-lg p-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {certificate.tokenGatedContent.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  {certificate.tokenGatedContent.description}
                </p>
                <a
                  href={certificate.tokenGatedContent.contentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Access Exclusive Content
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateView;