import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Eye, Download, Share2, Calendar, Filter, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

const Analytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('certificates');

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const certificateData = [
    { date: '2024-01-01', certificates: 12, verifications: 34, downloads: 18 },
    { date: '2024-01-02', certificates: 19, verifications: 45, downloads: 23 },
    { date: '2024-01-03', certificates: 8, verifications: 28, downloads: 15 },
    { date: '2024-01-04', certificates: 25, verifications: 67, downloads: 32 },
    { date: '2024-01-05', certificates: 31, verifications: 78, downloads: 41 },
    { date: '2024-01-06', certificates: 22, verifications: 56, downloads: 28 },
    { date: '2024-01-07', certificates: 28, verifications: 89, downloads: 35 }
  ];

  const templatePerformance = [
    { name: 'Course Completion', issued: 145, verified: 298, engagement: 85 },
    { name: 'Workshop Attendance', issued: 87, verified: 156, engagement: 72 },
    { name: 'Professional Certification', issued: 62, verified: 134, engagement: 91 },
    { name: 'Event Participation', issued: 34, verified: 78, engagement: 68 }
  ];

  const verificationSources = [
    { name: 'Direct Link', value: 45, color: '#3B82F6' },
    { name: 'Social Media', value: 28, color: '#14B8A6' },
    { name: 'Email', value: 18, color: '#F97316' },
    { name: 'QR Code', value: 9, color: '#8B5CF6' }
  ];

  const topCertificates = [
    { id: '1', title: 'Advanced React Development', issued: 45, verified: 128, downloadRate: '89%' },
    { id: '2', title: 'Digital Marketing Masterclass', issued: 32, verified: 97, downloadRate: '76%' },
    { id: '3', title: 'Data Science Fundamentals', issued: 28, verified: 85, downloadRate: '92%' },
    { id: '4', title: 'UX Design Workshop', issued: 19, verified: 56, downloadRate: '71%' }
  ];

  const metrics = [
    { label: 'Total Certificates', value: '324', change: '+12.5%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Recipients', value: '1,247', change: '+8.3%', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Verifications', value: '2,856', change: '+24.1%', icon: Eye, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Downloads', value: '1,938', change: '+16.7%', icon: Download, color: 'text-green-600', bg: 'bg-green-50' }
  ];

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
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="mt-2 text-gray-600">Track your certificate performance and engagement</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Download className="h-5 w-5 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.change}</p>
                </div>
                <div className={`${metric.bg} p-3 rounded-lg`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Certificate Issuance Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Certificate Trends</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="certificates">Certificates Issued</option>
                <option value="verifications">Verifications</option>
                <option value="downloads">Downloads</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={certificateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Verification Sources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Verification Sources</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={verificationSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {verificationSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Template Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Template Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={templatePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="issued" fill="#3B82F6" />
                  <Bar dataKey="verified" fill="#14B8A6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Certificates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Certificates</h3>
            <div className="space-y-4">
              {topCertificates.map((cert, index) => (
                <div key={cert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{cert.title}</h4>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{cert.issued} issued</span>
                      <span>{cert.verified} verified</span>
                      <span className="text-green-600 font-medium">{cert.downloadRate} download rate</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">87%</div>
              <div className="text-sm text-gray-600">Average Verification Rate</div>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600 mb-2">12 min</div>
              <div className="text-sm text-gray-600">Avg. Time to Download</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">34%</div>
              <div className="text-sm text-gray-600">Social Share Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;