import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-theme-surface/80 backdrop-blur-md shadow-sm border-b border-theme transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-[var(--brand-primary)] tracking-tight flex-shrink-0">
          <Link to="/">Freshcart</Link>
        </div>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
           <form onSubmit={handleSearch} className="relative w-full">
             <input 
               type="text" 
               placeholder="Search for products..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-4 pr-10 py-2 rounded-lg border border-theme bg-theme-surface-2 text-theme-primary focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition-colors"
             />
             <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-theme-secondary hover:text-[var(--brand-primary)]">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
             </button>
           </form>
        </div>

        {/* Right: Navigation & Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <nav className="hidden lg:flex space-x-6 text-theme-secondary font-medium">
            <Link to="/" className="hover:text-[var(--brand-primary)] transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-[var(--brand-primary)] transition-colors">Shop</Link>
            <Link to="/deals" className="hover:text-[var(--brand-primary)] transition-colors">Deals</Link>
            <Link to="/about" className="hover:text-[var(--brand-primary)] transition-colors">About</Link>
          </nav>

          <div className="flex items-center space-x-3 border-l border-theme pl-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-theme-secondary hover:bg-theme-surface-2 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                 </svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                 </svg>
              )}
            </button>
            
            <Link to="/cart" className="group relative p-2 text-theme-secondary hover:text-[var(--brand-primary)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 bg-[var(--brand-primary)] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white dark:border-slate-900">2</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
