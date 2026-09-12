import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import {
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { user, login, signup, authError, clearAuthError } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setValidationError(null);
      setSuccessMessage(null);
      setIsSubmitting(false);
      clearAuthError();
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (user && isOpen) {
      setIsSubmitting(false);
      onClose();
    }
  }, [user, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSwitchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setValidationError(null);
    setSuccessMessage(null);
    setIsSubmitting(false);
    clearAuthError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);
    clearAuthError();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setValidationError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setValidationError('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && password !== confirmPassword) {
      setValidationError('Passwords do not match. Please check and try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(trimmedEmail, password);
      } else {
        await signup(trimmedEmail, password);
      }
      setIsSubmitting(false);
      onClose();
    } catch {
      // Error is caught and formatted in AuthContext
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isConfigError =
    authError?.includes('Firebase Console') ||
    authError?.includes('operation-not-allowed');

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          clearAuthError();
          onClose();
        }
      }}
    >
      <div
        id="auth-modal-content"
        className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {mode === 'login' ? 'Sign In to Your Account' : 'Create Free Account'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'login'
                ? 'Sign in to access and sync your learning progress'
                : 'Sign up to automatically save course progress and quizzes'}
            </p>
          </div>
          <button
            id="auth-modal-close-btn"
            type="button"
            onClick={() => {
              clearAuthError();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1">
          <button
            id="auth-tab-login"
            type="button"
            onClick={() => handleSwitchMode('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Log In
          </button>
          <button
            id="auth-tab-signup"
            type="button"
            onClick={() => handleSwitchMode('signup')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Success message banner */}
          {successMessage && (
            <div
              id="auth-success-banner"
              className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Validation or Auth error message */}
          {(validationError || authError) && !successMessage && (
            <div
              id="auth-error-banner"
              className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in ${
                isConfigError
                  ? 'bg-amber-50 border border-amber-200 text-amber-900'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}
            >
              <AlertCircle
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  isConfigError ? 'text-amber-600' : 'text-rose-600'
                }`}
              />
              <div className="flex-1">
                <p className="font-semibold">{validationError || authError}</p>
                {isConfigError && (
                  <p className="mt-1.5 text-[11px] text-amber-800 leading-relaxed">
                    <strong>Firebase Configuration Steps:</strong>
                    <br />
                    1. Open your project in{' '}
                    <a
                      href="https://console.firebase.google.com/project/quicksite-568bd/authentication/providers"
                      target="_blank"
                      rel="noreferrer"
                      className="underline inline-flex items-center gap-0.5 font-bold"
                    >
                      Firebase Console
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <br />
                    2. Click on <em>Sign-in method</em>.
                    <br />
                    3. Click <em>Email/Password</em> and toggle <strong>Enable</strong>.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Email input */}
          <div>
            <label
              htmlFor="auth-email-input"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="auth-email-input"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="auth-password-input"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="auth-password-input"
                type={showPassword ? 'text' : 'password'}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Sign up only) */}
          {mode === 'signup' && (
            <div>
              <label
                htmlFor="auth-confirm-password-input"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="auth-confirm-password-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            id="auth-submit-button"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>

          {/* Toggle mode text */}
          <div className="pt-2 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  id="auth-switch-to-signup-btn"
                  type="button"
                  onClick={() => handleSwitchMode('signup')}
                  className="font-bold text-sky-600 hover:underline cursor-pointer"
                >
                  Sign up for free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  id="auth-switch-to-login-btn"
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  className="font-bold text-sky-600 hover:underline cursor-pointer"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
