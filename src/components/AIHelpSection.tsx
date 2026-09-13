import React, { useState, useEffect } from 'react';
import { Bot, Send, Loader2, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../lib/AuthContext';
import { Course, Lesson, CourseModule } from '../types';

interface AIHelpSectionProps {
  course: Course;
  moduleTitle: string;
  lesson: Lesson;
  lessonContent: string;
}

export const AIHelpSection: React.FC<AIHelpSectionProps> = ({
  course,
  moduleTitle,
  lesson,
  lessonContent
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingHelps, setRemainingHelps] = useState<number | null>(null);

  // Fetch limit when opened or authenticated
  useEffect(() => {
    let isMounted = true;
    async function fetchLimit() {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/ai-limit', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setRemainingHelps(data.remaining);
          }
        }
      } catch (err) {
        console.error("Failed to fetch AI limit", err);
      }
    }
    
    if (isOpen && user) {
      fetchLimit();
    }
    return () => { isMounted = false; };
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isProcessing) return;

    if (!user) {
      setError("You must be logged in to use AI Help.");
      return;
    }

    if (remainingHelps !== null && remainingHelps <= 0) {
      setError("You've used today's AI help. Your 6 AI helps reset tomorrow.");
      return;
    }

    const currentQuestion = question.trim();
    setQuestion('');
    setMessages(prev => [...prev, { role: 'user', content: currentQuestion }]);
    setIsProcessing(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/ai-help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          question: currentQuestion,
          courseTitle: course.title,
          moduleTitle: moduleTitle,
          lessonTitle: lesson.title,
          lessonContent: lessonContent
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI help");
      }

      setMessages(prev => [...prev, { role: 'ai', content: data.result }]);
      setRemainingHelps(data.remaining);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      // Remove the user message if it failed, or add a system message?
      // Better just leave the user message and show error.
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="mt-8 sm:mt-10 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col items-center justify-center text-center">
        <Sparkles className="w-6 h-6 text-indigo-400 mb-2" />
        <h3 className="text-sm font-bold text-indigo-900 mb-1">AI Coding Teacher</h3>
        <p className="text-xs text-indigo-700/80 max-w-sm">Sign in to get personalized help, ask questions about this lesson, and receive hints on the code.</p>
      </div>
    );
  }

  return (
    <section className="mt-8 sm:mt-10 bg-white rounded-2xl border border-indigo-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-indigo-50 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-indigo-950 tracking-tight">AI Coding Teacher</h3>
            {remainingHelps !== null && (
              <p className="text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">
                AI Help: {remainingHelps} / 6 remaining
              </p>
            )}
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          {isOpen ? 'Close AI Help' : 'Ask a Question'}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 sm:p-6 bg-slate-50/50">
          {/* Chat History */}
          {messages.length > 0 && (
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto pr-2 no-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 sm:p-4 ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-2xs'
                  }`}>
                    {msg.role === 'user' ? (
                      <p className="text-xs sm:text-sm">{msg.content}</p>
                    ) : (
                      <div className="w-full">
                        <ReactMarkdown
                          components={{
                            h1: ({ node, ...props }) => <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-5 mb-2.5 leading-tight" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-4 mb-2 leading-tight" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-3 mb-1.5 leading-tight" {...props} />,
                            p: ({ node, ...props }) => <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3 last:mb-0" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3 space-y-1.5 text-xs sm:text-sm text-slate-700" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3 space-y-1.5 text-xs sm:text-sm text-slate-700" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-200 pl-3 italic text-slate-600 mb-3" {...props} />,
                            pre: ({ node, children, ...props }: any) => {
                              let language = '';
                              if (children && children.props && children.props.className) {
                                const match = /language-(\w+)/.exec(children.props.className);
                                if (match) language = match[1];
                              }
                              return (
                                <div className="my-3 overflow-hidden rounded-xl border border-slate-200 bg-[#0f172a] shadow-sm">
                                  {language && (
                                    <div className="flex items-center px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/50">
                                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{language}</span>
                                    </div>
                                  )}
                                  <div className="overflow-x-auto p-3 sm:p-4">
                                    <pre className="text-[11px] sm:text-xs font-mono text-slate-50 m-0" {...props}>
                                      {children}
                                    </pre>
                                  </div>
                                </div>
                              );
                            },
                            code: ({ node, className, children, ...props }: any) => {
                              const isLanguageBlock = /language-(\w+)/.test(className || '');
                              const isMultiLine = String(children).includes('\n');
                              
                              if (isLanguageBlock || isMultiLine) {
                                return <code className={className} {...props}>{children}</code>;
                              }
                              
                              return (
                                <code className="px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-mono text-[0.85em]" {...props}>
                                  {children}
                                </code>
                              );
                            }
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-800 text-xs sm:text-sm animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={remainingHelps === 0 ? "You've reached your daily limit" : "Ask for a hint, explanation, or simpler example..."}
              disabled={isProcessing || remainingHelps === 0}
              className="w-full bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl pl-4 pr-12 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:bg-slate-100 transition-all shadow-2xs"
            />
            <button
              type="submit"
              disabled={!question.trim() || isProcessing || remainingHelps === 0}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors cursor-pointer shadow-2xs"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => setQuestion("Explain this differently.")} disabled={isProcessing || remainingHelps === 0} className="text-[10px] sm:text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer">Explain this differently.</button>
            <button type="button" onClick={() => setQuestion("Make this simpler.")} disabled={isProcessing || remainingHelps === 0} className="text-[10px] sm:text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer">Make this simpler.</button>
            <button type="button" onClick={() => setQuestion("Give me an example.")} disabled={isProcessing || remainingHelps === 0} className="text-[10px] sm:text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer">Give me an example.</button>
            <button type="button" onClick={() => setQuestion("Give me a hint.")} disabled={isProcessing || remainingHelps === 0} className="text-[10px] sm:text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer">Give me a hint.</button>
          </div>
        </div>
      )}
    </section>
  );
};
