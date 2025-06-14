import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateTemplate from './pages/CreateTemplate';
import ManageRecipients from './pages/ManageRecipients';
import Analytics from './pages/Analytics';
import CertificateView from './pages/CertificateView';
import PublicVerification from './pages/PublicVerification';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import Help from './pages/Help';
import SignIn from './pages/SignIn';
import ApiDocs from './pages/ApiDocs';
import TokenGatedContent from './pages/TokenGatedContent';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-template" element={<CreateTemplate />} />
              <Route path="/manage-recipients" element={<ManageRecipients />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/certificate/:id" element={<CertificateView />} />
              <Route path="/verify" element={<PublicVerification />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/content/:id" element={<TokenGatedContent />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;