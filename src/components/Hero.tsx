import React, { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Play, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartLearning: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartLearning, onExploreCourses }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'react' | 'python'>('html');

  const previews = {
    html: {
      label: 'HTML',
      tagline: 'Document Hierarchy & Semantics',
      code: `<article class="card">
  <h2>The Cloud Philosophy</h2>
  <p>Semantic markup makes your web accessible to everyone.</p>
  <button type="submit">Enroll Free</button>
</article>`,
      explanation: 'HTML provides meaningful hierarchy and structure that search engines, screen readers, and browsers understand instantly.',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    css: {
      label: 'CSS',
      tagline: 'Modern Responsive Layouts',
      code: `.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px -2px rgba(0,0,0,0.06);
}`,
      explanation: 'CSS defines the visual system: layout rhythm, responsive flow, typography scales, and tactile micro-states.',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    js: {
      label: 'JavaScript',
      tagline: 'State & Event Driven Logic',
      code: `const counter = document.querySelector('#btn');
let count = 0;

counter.addEventListener('click', () => {
  count += 1;
  console.log(\`Action registered: \${count}\`);
});`,
      explanation: 'JavaScript powers dynamic user events, asynchronous network requests, and active application state.',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    react: {
      label: 'React',
      tagline: 'Declarative Component Architecture',
      code: `export function CourseCard({ title, level }) {
  const [active, setActive] = useState(false);
  return (
    <div onClick={() => setActive(!active)}>
      <h3>{title}</h3>
      <span>{level}</span>
    </div>
  );
}`,
      explanation: 'React breaks complex interfaces into predictable, reusable components governed by simple reactive state.',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    python: {
      label: 'Python',
      tagline: 'Clean Logic & Practical Scripting',
      code: `def calculate_mastery(completed, total):
    ratio = completed / total
    return f"Progress: {ratio:.1%} complete"

status = calculate_mastery(5, 5)
print(status)  # Progress: 100.0% complete`,
      explanation: 'Python emphasizes exceptional readability, allowing you to solve logical problems and automate workflows cleanly.',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  };

  const current = previews[activeTab];

  return (
    <section id="hero-section" className="relative pt-6 pb-12 sm:pt-16 sm:pb-24 overflow-hidden">
      {/* Background ambient accents - subtle and clean, not dark/heavy */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-1/2 translate-x-1/2 w-[700px] h-[350px] bg-sky-100/60 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-slate-100/70 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy and Core CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-700 shadow-2xs mb-4 sm:mb-6">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span>Foundation Track • HTML, CSS, JS, React & Python</span>
            </div>

            <h1
              id="hero-main-headline"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.12]"
            >
              Learn to code.{' '}
              <span className="block text-sky-600 font-extrabold mt-1">
                Understand what you're building.
              </span>
            </h1>

            <p
              id="hero-supporting-text"
              className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              Master programming from first principles. No copy-pasting without context. We break down web technologies into intuitive mental models so you write code with genuine clarity and confidence.
            </p>

            {/* Action Buttons */}
            <div
              id="hero-action-buttons"
              className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <button
                id="hero-start-learning-button"
                type="button"
                onClick={onStartLearning}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm shadow-slate-900/10 transition-all hover:translate-y-[-1px] active:translate-y-[0px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 cursor-pointer"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                id="hero-explore-courses-button"
                type="button"
                onClick={onExploreCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                <span>Explore Courses</span>
              </button>
            </div>

            {/* Trust & Methodology highlights */}
            <div className="mt-8 pt-6 sm:mt-10 sm:pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center sm:text-left p-2 sm:p-0 rounded-lg bg-slate-50 sm:bg-transparent border border-slate-100 sm:border-0">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">5</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Core Tracks</div>
              </div>
              <div className="text-center sm:text-left p-2 sm:p-0 rounded-lg bg-slate-50 sm:bg-transparent border border-slate-100 sm:border-0">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Concept-First</div>
              </div>
              <div className="text-center sm:text-left p-2 sm:p-0 rounded-lg bg-slate-50 sm:bg-transparent border border-slate-100 sm:border-0">
                <div className="text-xl sm:text-2xl font-bold text-slate-900">Free</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Open Access</div>
              </div>
            </div>
          </div>

          {/* Right Column: Intuitive Mental Model Card */}
          <div className="lg:col-span-5">
            <div
              id="hero-interactive-preview-card"
              className="bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-200/50 overflow-hidden transition-all"
            >
              {/* Card Header with tabs */}
              <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-1.5 text-xs font-mono text-slate-400 font-medium">mental-model.dev</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Interactive Preview
                </span>
              </div>

              {/* Technology Tabs */}
              <div className="flex border-b border-slate-100 bg-slate-50/30 px-2 sm:px-3 pt-2 gap-1 overflow-x-auto no-scrollbar">
                {(['html', 'css', 'js', 'react', 'python'] as const).map((tab) => (
                  <button
                    key={tab}
                    id={`hero-tab-${tab}`}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? 'bg-white text-slate-900 border-t-2 border-sky-500 border-x border-slate-200 shadow-2xs -mb-[1px]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Code Snippet */}
              <div className="p-3.5 sm:p-5 bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto">
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800 text-[10px] sm:text-[11px] text-slate-400">
                  <span className="truncate mr-2">{current.tagline}</span>
                  <span className="text-slate-400 font-mono shrink-0">syntax: {activeTab}</span>
                </div>
                <pre className="text-slate-100 font-normal text-[11px] sm:text-xs">
                  <code>{current.code}</code>
                </pre>
              </div>

              {/* Mental Model Explanation Footer */}
              <div className="p-4 sm:p-5 bg-white space-y-3">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 p-1 rounded-md bg-sky-50 text-sky-600 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      The Mental Model
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {current.explanation}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500">
                    Part of CLOUD Foundation
                  </span>
                  <button
                    id={`hero-preview-explore-${activeTab}`}
                    type="button"
                    onClick={onExploreCourses}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline cursor-pointer"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
