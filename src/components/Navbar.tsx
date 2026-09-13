import React, { useState } from 'react';
import { Cloud, Menu, X, ArrowRight, User as UserIcon, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface NavbarProps {
  onStartLearning: () => void;
  onOpenLearn: () => void;
  onOpenProfile: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigateHome: () => void;
  onNotice: (title: string, message: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartLearning,
  onOpenLearn,
  onOpenProfile,
  onOpenAuth,
  onNavigateHome,
  onNotice,
  activeNav,
  setActiveNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, displayName, logout } = useAuth();

  const handleNavClick = (section: string) => {
    setActiveNav(section);
    setMobileMenuOpen(false);

    if (section === 'home') {
      onNavigateHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'learn') {
      onOpenLearn();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'progress') {
      onOpenProfile();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'profile') {
      onOpenProfile();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header
      id="cloud-navbar-header"
      className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Brand Logo */}
          <button
            id="cloud-logo-button"
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2 sm:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1 transition-transform cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs sm:shadow-sm shadow-sky-500/20 group-hover:bg-sky-600 transition-colors">
              <Cloud className="w-4 h-4 sm:w-5 sm:h-5 fill-white/20 text-white stroke-[2.2]" />
            </div>
            <div className="text-left flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-sans group-hover:text-sky-600 transition-colors">
                CLOUD
              </span>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-sky-50 text-sky-700 border border-sky-100/80 rounded-md">
                Learn
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-navigation-links" className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-link-home"
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeNav === 'home'
                  ? 'text-sky-600 bg-sky-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-learn"
              type="button"
              onClick={() => handleNavClick('learn')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeNav === 'learn'
                  ? 'text-sky-600 bg-sky-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Learn
            </button>
            <button
              id="nav-link-dashboard"
              type="button"
              onClick={() => handleNavClick('profile')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeNav === 'profile'
                  ? 'text-sky-600 bg-sky-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Dashboard
            </button>
          </nav>

          {/* Desktop Right Side: Auth / CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {/* User profile / display name badge */}
                <button
                  id="nav-user-profile-badge"
                  type="button"
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                  title={`${displayName} (${user.email || ''})`}
                >
                  <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[130px] truncate">{displayName}</span>
                </button>

                {/* Quick Logout Button */}
                <button
                  id="nav-logout-button"
                  type="button"
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-button"
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
                <button
                  id="nav-signup-button"
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            <button
              id="navbar-start-learning-button"
              type="button"
              onClick={onStartLearning}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Quick Controls */}
          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <button
                type="button"
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold cursor-pointer active:scale-95 transition-transform"
                title="Open profile"
              >
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-bold">
                  {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="max-w-[80px] truncate text-[11px] font-medium">{displayName || 'Profile'}</span>
              </button>
            ) : (
              <button
                id="navbar-login-mobile-direct"
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              >
                Log In
              </button>
            )}

            <button
              id="mobile-menu-toggle-button"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu-panel" className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            id="mobile-nav-link-home"
            type="button"
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeNav === 'home' ? 'text-sky-600 bg-sky-50 font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Home
          </button>
          <button
            id="mobile-nav-link-learn"
            type="button"
            onClick={() => handleNavClick('learn')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeNav === 'learn' ? 'text-sky-600 bg-sky-50 font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Learn
          </button>
          <button
            id="mobile-nav-link-dashboard"
            type="button"
            onClick={() => handleNavClick('profile')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              activeNav === 'profile' ? 'text-sky-600 bg-sky-50 font-semibold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Dashboard
          </button>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                  <span className="truncate font-medium">{user.email}</span>
                  <span className="text-[10px] text-emerald-600 font-bold ml-2">Synced</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2 text-xs font-bold text-center rounded-xl bg-slate-100 text-slate-800"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2 text-xs font-bold text-center rounded-xl bg-sky-50 border border-sky-200 text-sky-700"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              id="mobile-nav-start-learning-button"
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartLearning();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

