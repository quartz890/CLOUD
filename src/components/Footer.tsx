import React from 'react';
import { Cloud, Heart } from 'lucide-react';

interface FooterProps {
  onSelectNav: (section: string) => void;
  onSelectCourseBySlug: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNav, onSelectCourseBySlug }) => {
  return (
    <footer id="cloud-footer" className="bg-white border-t border-slate-200/80 py-10 sm:py-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 sm:pb-12 border-b border-slate-100">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center">
                <Cloud className="w-4 h-4 fill-white/20 text-white stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                CLOUD
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              A modern coding-learning platform focused on conceptual clarity, deep understanding, and intuitive web architecture.
            </p>
            <div className="text-[11px] sm:text-xs text-slate-400 font-mono">
              Designed with clean typography & light surfaces.
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-2.5 sm:space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('home')}
                  className="hover:text-sky-600 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('learn')}
                  className="hover:text-sky-600 transition-colors cursor-pointer"
                >
                  Learn & Courses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('progress')}
                  className="hover:text-sky-600 transition-colors cursor-pointer"
                >
                  Progress Tracker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectNav('profile')}
                  className="hover:text-sky-600 transition-colors cursor-pointer"
                >
                  Learner Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Course Tracks */}
          <div className="md:col-span-4 space-y-2.5 sm:space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              The 5 Core Tracks
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {['html', 'css', 'javascript', 'react', 'python'].map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => onSelectCourseBySlug(tech)}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 border border-transparent transition-all uppercase cursor-pointer"
                >
                  {tech}
                </button>
              ))}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 pt-1 sm:pt-2">
              Foundation tracks created to build solid real-world coding capability step by step.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} CLOUD Learning Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for learners worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
