import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#070A12] text-white selection:bg-indigo-500/30">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob -top-24 -left-24 h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/20" />
        <div className="blob top-24 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-indigo-500/20 [animation-delay:-4s]" />
        <div className="blob bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-purple-500/20 [animation-delay:-8s]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <HomePage />
                  </motion.div>
                }
              />
              <Route
                path="/about"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <AboutPage />
                  </motion.div>
                }
              />
              <Route
                path="/features"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <FeaturesPage />
                  </motion.div>
                }
              />
              <Route path="/login/:role" element={<LoginPage />} />
              <Route path="/register/:role" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </div>
  );
}
