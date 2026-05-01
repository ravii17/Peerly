import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login/:role" element={<LoginPage />} />
            <Route path="/register/:role" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
}
