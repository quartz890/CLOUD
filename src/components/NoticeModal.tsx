import React from 'react';
import { X, Sparkles, Check, Info } from 'lucide-react';

interface NoticeModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="notice-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="notice-modal-card"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6 sm:p-7 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto mb-4">
          <Info className="w-6 h-6 stroke-[2.2]" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">{message}</p>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 mb-6 text-left">
          <span className="font-semibold text-slate-700 block mb-1">CLOUD Foundation Roadmap:</span>
          We are currently focusing on perfecting the frontend layout, typography, and course tracks before introducing interactive workspaces.
        </div>

        <button
          id="notice-modal-ok-button"
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
