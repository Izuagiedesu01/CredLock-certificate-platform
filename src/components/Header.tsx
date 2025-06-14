import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600 border-blue-600' : 'text-gray-700 hover:text-blue-600 border-transparent hover:border-blue-300';
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CredLock</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/dashboard" className={`px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive('/dashboard')}`}>
                  Dashboard
                </Link>
                <Link to="/analytics" className={`px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive('/analytics')}`}>
                  Analytics
                </Link>
                <Link to="/verify" className={`px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive('/verify')}`}>
                  Verify
                </Link>
                <Link to="/api-docs" className={`px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive('/api-docs')}`}>
                  API
                </Link>
              </>
            ) : (
              <>
                <Link to="/verify" className={`px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive('/verify')}`}>
                  Verify Certificate
                </Link>
                <Link to="/pricing" className={`px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive('/pricing')}`}>
                  Pricing
                </Link>
                <Link to="/help" className={`px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive('/help')}`}>
                  Help
                </Link>
              </>
            )}
          </nav>

          {/* User Menu / Sign In */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{user.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-blue-600 capitalize font-medium">{user.plan} Plan</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                    Dashboard
                  </Link>
                  <Link to="/analytics" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                    Analytics
                  </Link>
                  <Link to="/verify" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                    Verify
                  </Link>
                  <Link to="/api-docs" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                    API
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/verify" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                    Verify Certificate
                  </Link>
                  <Link to="/pricing" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                    Pricing
                  </Link>
                  <Link to="/help" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                    Help
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;