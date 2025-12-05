export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="Covid MedGemma Logo"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-200 dark:ring-blue-300"
              />
              {/* <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-white bg-green-600 dark:border-slate-800" /> */}
            </div>
            <div>
              <h1 className="text-lg font-semibold">Covid MedGemma</h1>
              <p className="text-xs text-gray-700 dark:text-gray-500">
                Medical AI Assistant
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a
              href="#"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-slate-900 transition-colors"
            >
              My Profile
            </a>
            <a
              href="#"
              className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
            >
              MedGemma
            </a>
            <a
              href="#"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-slate-900 transition-colors"
            >
              HIV Risk Estimate
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
