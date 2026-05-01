export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-white/5 py-12 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <span className="text-xs font-bold text-white">C</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">
            ConnectHub
          </span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>

        <div className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} ConnectHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
