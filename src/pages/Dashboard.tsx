import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Award, Users, TrendingUp, Eye, Download, Share2, Calendar, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([
    {
      id: '1',
      title: 'Course Completion Certificate',
      description: 'General course completion certificate',
      issued: 45,
      verified: 128,
      created: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      title: 'Workshop Attendance',
      description: 'Workshop participation certificate',
      issued: 23,
      verified: 67,
      created: '2024-01-10',
      status: 'active'
    }
  ]);

  const [recentActivity] = useState([
    { type: 'issued', count: 12, description: 'Certificates issued today' },
    { type: 'verified', count: 34, description: 'Verifications this week' },
    { type: 'downloaded', count: 18, description: 'PDFs downloaded today' },
    { type: 'shared', count: 7, description: 'Social shares this week' }
  ]);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const stats = [
    {
      title: 'Total Certificates',
      value: templates.reduce((sum, t) => sum + t.issued, 0),
      icon: <Award className="h-8 w-8" />,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Total Recipients',
      value: '156',
      icon: <Users className="h-8 w-8" />,
      color: 'text-teal-600',
      bg: 'bg-teal-50'
    },
    {
      title: 'Verifications',
      value: templates.reduce((sum, t) => sum + t.verified, 0),
      icon: <Eye className="h-8 w-8" />,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              <Link
                to="/create-template"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Template
              </Link>
              <Link
                to="/manage-recipients"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                <Users className="h-5 w-5 mr-2" />
                Manage Recipients
              </Link>
            </div>
          </div>
        </div>

        {/* Plan Status */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">{user.plan} Plan</h3>
              <p className="text-gray-600 mt-1">
                {user.credits} credits remaining
                {user.plan === 'free' && ' (5 certificates max)'}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/pricing"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {user.plan === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificate Templates */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Certificate Templates</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <Filter className="h-5 w-5" />
                    </button>
                    <Link
                      to="/create-template"
                      className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {templates.length > 0 ? (
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{template.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Award className="h-4 w-4 mr-1" />
                                {template.issued} issued
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {template.verified} verified
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(template.created).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
                    <p className="text-gray-600 mb-4">Create your first certificate template to get started</p>
                    <Link
                      to="/create-template"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Create Template
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{activity.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <Link
                    to="/verify"
                    className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                  >
                    <div className="flex items-center">
                      <Eye className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Verify Certificate</p>
                        <p className="text-sm text-gray-500">Check certificate status</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/analytics"
                    className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                  >
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">View Analytics</p>
                        <p className="text-sm text-gray-500">Track performance</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/api-docs"
                    className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                  >
                    <div className="flex items-center">
                      <Download className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">API Documentation</p>
                        <p className="text-sm text-gray-500">Integration guide</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;