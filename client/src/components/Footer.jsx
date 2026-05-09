export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-black py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0071E3] to-[#BF40BF]">
            <span className="text-sm font-bold text-white">P</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Peerly
          </span>
        </div>
        
        <div className="flex items-center gap-8 text-[13px] font-medium text-[#86868B]">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Twitter</a>
          <a href="#" className="hover:text-white transition-colors duration-300">GitHub</a>
        </div>

        <div className="text-[13px] font-medium text-[#86868B]">
          &copy; {new Date().getFullYear()} Peerly Inc.
        </div>
      </div>
    </footer>
  );
}
