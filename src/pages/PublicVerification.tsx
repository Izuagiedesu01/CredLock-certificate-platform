import React, { useState } from 'react';
import { Shield, Search, CheckCircle, XCircle, AlertTriangle, Eye, Calendar, User, Building2 } from 'lucide-react';

const PublicVerification = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState('certificate');

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock verification result
    const mockResult = {
      isValid: searchQuery.toLowerCase().includes('valid') || !searchQuery.toLowerCase().includes('invalid'),
      certificate: {
        id: searchQuery || 'VF-2024-001-ABC123',
        title: 'Advanced React Development Certification',
        recipientName: 'John Doe',
        recipientEmail: 'john@example.com',
        issuerName: 'TechEd Academy',
        issuerLogo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teched',
        issuedDate: '2024-01-15',
        expiryDate: '2025-01-15',
        verificationCount: 15,
        blockchainHash: '0x1234567890abcdef1234567890abcdef12345678',
        network: 'XION Chain',
        status: searchQuery.toLowerCase().includes('invalid') ? 'invalid' : 
                searchQuery.toLowerCase().includes('expired') ? 'expired' : 'valid'
      }
    };
    
    setVerificationResult(mockResult);
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'expired':
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
      case 'invalid':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Shield className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'expired':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'invalid':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'valid':
        return 'This certificate is valid and verified on the blockchain.';
      case 'expired':
        return 'This certificate has expired but was previously valid.';
      case 'invalid':
        return 'This certificate could not be verified or has been revoked.';
      default:
        return 'Unknown certificate status.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Certificate Verification</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of any CredLock certificate instantly using blockchain technology
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <form onSubmit={handleVerification} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Verification Method
              </label>
              <div className="flex space-x-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="certificate"
                    checked={searchType === 'certificate'}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Certificate ID</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="hash"
                    checked={searchType === 'hash'}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Blockchain Hash</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="email"
                    checked={searchType === 'email'}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Recipient Email</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                {searchType === 'certificate' && 'Enter Certificate ID'}
                {searchType === 'hash' && 'Enter Blockchain Hash'}
                {searchType === 'email' && 'Enter Recipient Email'}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    searchType === 'certificate' ? 'e.g., VF-2024-001-ABC123' :
                    searchType === 'hash' ? 'e.g., 0x1234567890abcdef...' :
                    'e.g., john@example.com'
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Verify Certificate
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Try searching for "valid", "invalid", or "expired" to see different verification results</p>
          </div>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className={`rounded-xl border-2 p-8 ${getStatusColor(verificationResult.certificate.status)}`}>
            <div className="text-center mb-8">
              {getStatusIcon(verificationResult.certificate.status)}
              <h2 className="text-2xl font-bold mt-4 mb-2">
                Certificate {verificationResult.certificate.status === 'valid' ? 'Verified' : 
                           verificationResult.certificate.status === 'expired' ? 'Expired' : 'Invalid'}
              </h2>
              <p className="text-lg">{getStatusMessage(verificationResult.certificate.status)}</p>
            </div>

            {verificationResult.isValid && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Certificate Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Recipient</p>
                          <p className="font-medium">{verificationResult.certificate.recipientName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Issued by</p>
                          <p className="font-medium">{verificationResult.certificate.issuerName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Issue Date</p>
                          <p className="font-medium">
                            {new Date(verificationResult.certificate.issuedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Eye className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Verifications</p>
                          <p className="font-medium">{verificationResult.certificate.verificationCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Blockchain Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Certificate ID</p>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                          {verificationResult.certificate.id}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Transaction Hash</p>
                        <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                          {verificationResult.certificate.blockchainHash}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Network</p>
                        <p className="font-medium">{verificationResult.certificate.network}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600">Expiry Date</p>
                        <p className="font-medium">
                          {new Date(verificationResult.certificate.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {verificationResult.certificate.title}
                  </h4>
                  <div className="flex items-center justify-center space-x-4 mt-4">
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      View Full Certificate
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">How Verification Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Enter Details</h4>
              <p className="text-sm text-gray-600">
                Enter the certificate ID, blockchain hash, or recipient email to start verification
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Blockchain Check</h4>
              <p className="text-sm text-gray-600">
                We verify the certificate against the immutable blockchain record on XION Chain
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Instant Results</h4>
              <p className="text-sm text-gray-600">
                Get immediate verification results with complete certificate details and blockchain proof
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicVerification;