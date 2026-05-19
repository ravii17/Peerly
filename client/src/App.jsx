import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import ExplorePage from './pages/ExplorePage';
import MySessionsPage from './pages/MySessionsPage';
import CommunityPage from './pages/CommunityPage';
import MentorProfilePage from './pages/MentorProfilePage';
import { ScrollToTop } from './components/ScrollReveal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#9D00FF]/30">
      <ScrollToTop />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/sessions" element={<MySessionsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/mentor/:id" element={<MentorProfilePage />} />
        
        <Route 
          path="/login/:role?" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/register/:role?" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <RegisterPage onLogin={handleLogin} />} 
        />
        
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login/student" replace />} 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

