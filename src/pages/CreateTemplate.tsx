import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Eye, Save, Palette, Type, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CreateTemplate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    issuerName: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    accentColor: '#3B82F6',
    logo: null as File | null,
    expirationEnabled: false,
    expirationDays: 365,
    tokenGatedContent: false,
    contentUrl: '',
    contentDescription: ''
  });
  
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate template creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const CertificatePreview = () => (
    <div 
      className="w-full max-w-2xl mx-auto p-8 border-4 border-gray-300 rounded-lg"
      style={{ 
        backgroundColor: formData.backgroundColor,
        color: formData.textColor,
        minHeight: '400px'
      }}
    >
      <div className="text-center">
        {formData.logo && (
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-4" style={{ color: formData.accentColor }}>
          Certificate of {formData.title || 'Achievement'}
        </h1>
        
        <div className="mb-6">
          <p className="text-lg mb-2">This is to certify that</p>
          <div className="border-b-2 border-current w-64 mx-auto mb-2 py-2">
            <span className="text-xl font-semibold">[Recipient Name]</span>
          </div>
          <p className="text-sm opacity-75">has successfully completed</p>
        </div>
        
        <div className="mb-6">
          <p className="text-lg font-medium mb-2">{formData.description || 'Course Description'}</p>
        </div>
        
        <div className="flex justify-between items-end mt-8">
          <div className="text-left">
            <div className="border-b border-current w-32 mb-1"></div>
            <p className="text-sm">{formData.issuerName || 'Issuer Name'}</p>
            <p className="text-xs opacity-75">Authorized Signature</p>
          </div>
          
          <div className="text-right">
            <div className="border-b border-current w-24 mb-1"></div>
            <p className="text-sm">[Date]</p>
            <p className="text-xs opacity-75">Date of Issue</p>
          </div>
        </div>
        
        <div className="mt-6 text-xs opacity-50">
          <p>Certificate ID: [Auto-generated]</p>
          <p>Verify at: credlock.com/verify</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create Certificate Template</h1>
                <p className="mt-2 text-gray-600">Design your custom certificate template</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                <Eye className="h-5 w-5 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>
        </div>

        {isPreview ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate Preview</h2>
              <p className="text-gray-600">How your certificate will appear to recipients</p>
            </div>
            <CertificatePreview />
            <div className="mt-8 text-center">
              <button
                onClick={() => setIsPreview(false)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue Editing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Type className="h-5 w-5 mr-2 text-blue-600" />
                  Basic Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Course Completion, Achievement, Workshop Attendance"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of what this certificate represents"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="issuerName" className="block text-sm font-medium text-gray-700 mb-2">
                      Issuer Name *
                    </label>
                    <input
                      type="text"
                      id="issuerName"
                      name="issuerName"
                      required
                      value={formData.issuerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your organization or personal name"
                    />
                  </div>
                </div>
              </div>
              
              {/* Design Customization */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-blue-600" />
                  Design & Styling
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-2">
                        Background
                      </label>
                      <input
                        type="color"
                        id="backgroundColor"
                        name="backgroundColor"
                        value={formData.backgroundColor}
                        onChange={handleInputChange}
                        className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-2">
                        Text Color
                      </label>
                      <input
                        type="color"
                        id="textColor"
                        name="textColor"
                        value={formData.textColor}
                        onChange={handleInputChange}
                        className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Color
                      </label>
                      <input
                        type="color"
                        id="accentColor"
                        name="accentColor"
                        value={formData.accentColor}
                        onChange={handleInputChange}
                        className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="sr-only"
                      />
                      <label
                        htmlFor="logo"
                        className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                      >
                        Click to upload logo (PNG, JPG, SVG)
                      </label>
                      {formData.logo && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {formData.logo.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advanced Options */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Advanced Options</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expiration Settings */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Expiration Settings</h3>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="expirationEnabled"
                      name="expirationEnabled"
                      checked={formData.expirationEnabled}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="expirationEnabled" className="ml-2 text-sm text-gray-700">
                      Enable certificate expiration
                    </label>
                  </div>
                  
                  {formData.expirationEnabled && (
                    <div>
                      <label htmlFor="expirationDays" className="block text-sm font-medium text-gray-700 mb-2">
                        Expires after (days)
                      </label>
                      <input
                        type="number"
                        id="expirationDays"
                        name="expirationDays"
                        min="1"
                        value={formData.expirationDays}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
                
                {/* Token-Gated Content */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Token-Gated Content</h3>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tokenGatedContent"
                      name="tokenGatedContent"
                      checked={formData.tokenGatedContent}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="tokenGatedContent" className="ml-2 text-sm text-gray-700">
                      Attach exclusive content
                    </label>
                  </div>
                  
                  {formData.tokenGatedContent && (
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="contentUrl" className="block text-sm font-medium text-gray-700 mb-2">
                          Content URL
                        </label>
                        <input
                          type="url"
                          id="contentUrl"
                          name="contentUrl"
                          value={formData.contentUrl}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://..."
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="contentDescription" className="block text-sm font-medium text-gray-700 mb-2">
                          Content Description
                        </label>
                        <input
                          type="text"
                          id="contentDescription"
                          name="contentDescription"
                          value={formData.contentDescription}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe the exclusive content"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Submit Actions */}
            <div className="flex justify-end space-x-4">
              <Link
                to="/dashboard"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5 mr-2" />
                {isLoading ? 'Creating...' : 'Create Template'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;