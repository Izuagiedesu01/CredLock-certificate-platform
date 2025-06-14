import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Code, Key, Shield, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ApiDocs = () => {
  const { user } = useAuth();
  const [activeEndpoint, setActiveEndpoint] = useState('certificates');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      id: 'certificates',
      title: 'Certificates',
      methods: [
        {
          method: 'POST',
          path: '/api/v1/certificates',
          title: 'Create Certificate',
          description: 'Issue a new certificate to a recipient',
        },
        {
          method: 'GET',
          path: '/api/v1/certificates',
          title: 'List Certificates',
          description: 'Retrieve all certificates for your organization',
        },
        {
          method: 'GET',
          path: '/api/v1/certificates/{id}',
          title: 'Get Certificate',
          description: 'Retrieve details of a specific certificate',
        }
      ]
    },
    {
      id: 'verification',
      title: 'Verification',
      methods: [
        {
          method: 'GET',
          path: '/api/v1/verify/{id}',
          title: 'Verify Certificate',
          description: 'Verify the authenticity of a certificate',
        }
      ]
    },
    {
      id: 'templates',
      title: 'Templates',
      methods: [
        {
          method: 'POST',
          path: '/api/v1/templates',
          title: 'Create Template',
          description: 'Create a new certificate template',
        },
        {
          method: 'GET',
          path: '/api/v1/templates',
          title: 'List Templates',
          description: 'Retrieve all templates for your organization',
        }
      ]
    },
    {
      id: 'recipients',
      title: 'Recipients',
      methods: [
        {
          method: 'POST',
          path: '/api/v1/recipients',
          title: 'Add Recipient',
          description: 'Add a new recipient to your organization',
        },
        {
          method: 'GET',
          path: '/api/v1/recipients',
          title: 'List Recipients',
          description: 'Retrieve all recipients for your organization',
        }
      ]
    }
  ];

  const codeExamples = {
    javascript: {
      createCertificate: `const response = await fetch('https://api.credlock.com/v1/certificates', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    templateId: 'template_123',
    recipient: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    metadata: {
      courseName: 'Advanced React Development',
      completionDate: '2024-01-15'
    }
  })
});

const certificate = await response.json();
console.log('Certificate created:', certificate.id);`,
      
      verifyCertificate: `const response = await fetch('https://api.credlock.com/v1/verify/cert_123', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const verification = await response.json();
console.log('Certificate is valid:', verification.isValid);`
    },
    
    python: {
      createCertificate: `import requests

url = "https://api.credlock.com/v1/certificates"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "templateId": "template_123",
    "recipient": {
        "name": "John Doe",
        "email": "john@example.com"
    },
    "metadata": {
        "courseName": "Advanced React Development",
        "completionDate": "2024-01-15"
    }
}

response = requests.post(url, headers=headers, json=data)
certificate = response.json()
print(f"Certificate created: {certificate['id']}")`,
      
      verifyCertificate: `import requests

url = "https://api.credlock.com/v1/verify/cert_123"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.get(url, headers=headers)
verification = response.json()
print(f"Certificate is valid: {verification['isValid']}")`
    },
    
    curl: {
      createCertificate: `curl -X POST https://api.credlock.com/v1/certificates \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "templateId": "template_123",
    "recipient": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "metadata": {
      "courseName": "Advanced React Development",
      "completionDate": "2024-01-15"
    }
  }'`,
      
      verifyCertificate: `curl -X GET https://api.credlock.com/v1/verify/cert_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'curl'>('javascript');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
              <p className="mt-2 text-gray-600">Integrate CredLock into your applications</p>
            </div>
          </div>
        </div>

        {/* API Access Warning */}
        {user.plan === 'free' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">API Access Required</h3>
                <p className="text-yellow-700 mt-1">
                  API access is available for Pro and Enterprise plans. 
                  <Link to="/pricing" className="font-medium underline ml-1">Upgrade your plan</Link> to start using our API.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Reference</h3>
              
              {/* Quick Start */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Getting Started</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#authentication" className="text-blue-600 hover:text-blue-800">Authentication</a></li>
                  <li><a href="#rate-limits" className="text-blue-600 hover:text-blue-800">Rate Limits</a></li>
                  <li><a href="#errors" className="text-blue-600 hover:text-blue-800">Error Handling</a></li>
                </ul>
              </div>

              {/* Endpoints */}
              <nav className="space-y-2">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setActiveEndpoint(endpoint.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeEndpoint === endpoint.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {endpoint.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Authentication */}
            <div id="authentication" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Key className="h-6 w-6 mr-2 text-blue-600" />
                Authentication
              </h2>
              <p className="text-gray-600 mb-4">
                All API requests require authentication using your API key. Include your API key in the Authorization header:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <button
                  onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth-header')}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                >
                  {copiedCode === 'auth-header' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
                <code className="text-green-400 text-sm">Authorization: Bearer YOUR_API_KEY</code>
              </div>
              {user.plan !== 'free' && (
                <div className="mt-4">
                  <Link
                    to="/profile"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Key className="h-4 w-4 mr-1" />
                    Manage API Keys
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>

            {/* Base URL */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Base URL</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <code className="text-gray-800">https://api.credlock.com/v1</code>
              </div>
            </div>

            {/* Endpoints */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {endpoints.find(e => e.id === activeEndpoint)?.title} API
              </h2>

              {endpoints.find(e => e.id === activeEndpoint)?.methods.map((method, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${
                      method.method === 'GET' ? 'bg-green-100 text-green-800' :
                      method.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      method.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {method.method}
                    </span>
                    <code className="text-gray-800 bg-gray-100 px-2 py-1 rounded">{method.path}</code>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>

                  {/* Code Examples */}
                  {(method.title === 'Create Certificate' || method.title === 'Verify Certificate') && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Example Request</h4>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          {(['javascript', 'python', 'curl'] as const).map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setSelectedLanguage(lang)}
                              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                selectedLanguage === lang
                                  ? 'bg-white text-blue-600 shadow-sm'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'cURL'}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 rounded-lg p-4 relative">
                        <button
                          onClick={() => copyToClipboard(
                            method.title === 'Create Certificate' 
                              ? codeExamples[selectedLanguage].createCertificate
                              : codeExamples[selectedLanguage].verifyCertificate,
                            `${method.title}-${selectedLanguage}`
                          )}
                          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                        >
                          {copiedCode === `${method.title}-${selectedLanguage}` ? 
                            <CheckCircle className="h-4 w-4" /> : 
                            <Copy className="h-4 w-4" />
                          }
                        </button>
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>
                            {method.title === 'Create Certificate' 
                              ? codeExamples[selectedLanguage].createCertificate
                              : codeExamples[selectedLanguage].verifyCertificate
                            }
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Rate Limits */}
            <div id="rate-limits" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Free Plan</h4>
                  <p className="text-2xl font-bold text-gray-600">N/A</p>
                  <p className="text-sm text-gray-500">No API access</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Pro Plan</h4>
                  <p className="text-2xl font-bold text-blue-600">1,000</p>
                  <p className="text-sm text-gray-500">requests per hour</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Enterprise</h4>
                  <p className="text-2xl font-bold text-purple-600">10,000</p>
                  <p className="text-sm text-gray-500">requests per hour</p>
                </div>
              </div>
            </div>

            {/* Error Handling */}
            <div id="errors" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Handling</h3>
              <p className="text-gray-600 mb-4">
                The API uses conventional HTTP response codes to indicate success or failure:
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-3">200</span>
                  <span className="text-gray-700">Success</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium mr-3">400</span>
                  <span className="text-gray-700">Bad Request - Invalid parameters</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium mr-3">401</span>
                  <span className="text-gray-700">Unauthorized - Invalid API key</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium mr-3">429</span>
                  <span className="text-gray-700">Too Many Requests - Rate limit exceeded</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium mr-3">500</span>
                  <span className="text-gray-700">Internal Server Error</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;