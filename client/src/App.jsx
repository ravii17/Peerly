import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import MentorLayout from './layouts/MentorLayout';
import MentorDashboard from './pages/mentor/MentorDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import { ScrollToTop } from './components/ScrollReveal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'student';
  });

  const handleLogin = (role = 'student') => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('student');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#9D00FF]/30">
      <ScrollToTop />
      
      <Routes>
        {/* Mentor Layout - Independent from Main Navbar/Footer */}
        <Route path="/mentor" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRole="mentor" />
        }>
          <Route element={<MentorLayout onLogout={handleLogout} />}>
            <Route path="dashboard" element={<MentorDashboard />} />
            {/* Mock routes for mentor sidebar items */}
            <Route path="sessions" element={<div className="p-10"><h2 className="text-3xl font-black">My Sessions</h2></div>} />
            <Route path="students" element={<div className="p-10"><h2 className="text-3xl font-black">Students</h2></div>} />
            <Route path="community" element={<div className="p-10"><h2 className="text-3xl font-black">Community</h2></div>} />
            <Route path="analytics" element={<div className="p-10"><h2 className="text-3xl font-black">Analytics</h2></div>} />
            <Route path="messages" element={<div className="p-10"><h2 className="text-3xl font-black">Messages</h2></div>} />
            <Route path="settings" element={<div className="p-10"><h2 className="text-3xl font-black">Settings</h2></div>} />
          </Route>
        </Route>

        {/* Public & Student Layout (Uses Main Navbar & Footer) */}
        <Route element={
          <>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Outlet />
            <Footer />
          </>
        }>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/sessions" element={<MySessionsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/mentor-profile/:id" element={<MentorProfilePage />} />
          
          <Route 
            path="/login/:role?" 
            element={isLoggedIn ? <Navigate to={`/${userRole}/dashboard`} replace /> : <LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/register/:role?" 
            element={isLoggedIn ? <Navigate to={`/${userRole}/dashboard`} replace /> : <RegisterPage onLogin={handleLogin} />} 
          />
          
          {/* Student Protected Routes */}
          <Route path="/student" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRole="student" />
          }>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>

          {/* Legacy Fallbacks */}
          <Route path="/dashboard" element={<Navigate to={`/${userRole}/dashboard`} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}
