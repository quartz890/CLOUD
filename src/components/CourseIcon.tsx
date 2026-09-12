import React from 'react';
import { Code2, FileCode, Layers, Terminal, Sparkles } from 'lucide-react';

interface CourseIconProps {
  iconName: 'html' | 'css' | 'javascript' | 'react' | 'python';
  className?: string;
}

export const CourseIcon: React.FC<CourseIconProps> = ({ iconName, className = 'w-6 h-6' }) => {
  switch (iconName) {
    case 'html':
      return (
        <div className="flex items-center justify-center font-mono font-bold text-orange-600 text-sm tracking-tighter">
          <FileCode className={className} />
        </div>
      );
    case 'css':
      return (
        <div className="flex items-center justify-center font-mono font-bold text-sky-600 text-sm tracking-tighter">
          <Layers className={className} />
        </div>
      );
    case 'javascript':
      return (
        <div className="flex items-center justify-center font-mono font-bold text-amber-600 text-sm tracking-tighter">
          <span className="font-extrabold text-xs bg-amber-500 text-white px-1.5 py-0.5 rounded-sm">JS</span>
        </div>
      );
    case 'react':
      return (
        <div className="flex items-center justify-center text-cyan-600">
          <Code2 className={className} />
        </div>
      );
    case 'python':
      return (
        <div className="flex items-center justify-center text-emerald-600">
          <Terminal className={className} />
        </div>
      );
    default:
      return <Sparkles className={className} />;
  }
};
