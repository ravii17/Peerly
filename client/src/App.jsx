import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob -top-24 -left-24 h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/40" />
        <div className="blob top-24 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-sky-500/40 [animation-delay:-4s]" />
        <div className="blob bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-violet-500/35 [animation-delay:-8s]" />
      </div>

      <div className="relative min-h-screen bg-gradient-to-br from-sky-600/35 via-purple-700/30 to-fuchsia-600/30">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/register/:role" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
