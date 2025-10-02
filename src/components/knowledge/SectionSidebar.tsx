import { useState } from "react";
import { ChevronRight, Clock, CheckCircle } from "lucide-react";
import type { KnowledgeSection } from "@/content/types";

interface SectionSidebarProps {
  section: KnowledgeSection;
  isVisible: boolean;
  onToggle: () => void;
  currentQaId?: string;
  completedQAs: Set<string>;
  onQAClick: (qaId: string) => void;
}

export function SectionSidebar({ 
  section, 
  isVisible, 
  onToggle, 
  currentQaId, 
  completedQAs, 
  onQAClick 
}: SectionSidebarProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (text: string): number => {
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  const totalReadingTime = section.qas.reduce((total, qa) => {
    return total + calculateReadingTime(qa.question + " " + qa.answer);
  }, 0);

  // Filter completedQAs to only count those from the current section
  const sectionCompletedCount = section.qas.filter(qa => completedQAs.has(qa.id)).length;
  const completionPercentage = Math.round((sectionCompletedCount / section.qas.length) * 100);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-1/2 transform -translate-y-1/2 z-50 bg-secondary text-secondary-foreground p-3 rounded-r-lg shadow-lg transition-all duration-300 ${
          isVisible ? 'left-80' : 'left-0'
        } hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/30`}
        aria-label={isVisible ? "Close sidebar" : "Open sidebar"}
      >
        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
          isVisible ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg z-40 transform transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-secondary to-secondary text-secondary-foreground">
            <h2 className="text-xl font-bold mb-2">{section.title}</h2>
            <div className="flex items-center gap-4 text-sm text-secondary-foreground/80">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalReadingTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>{completionPercentage}% complete</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 bg-secondary/30 rounded-full h-2">
              <div 
                className="bg-primary/70 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            {section.groups && section.groups.length > 0 ? (
              // Grouped Q&As
              <div className="p-4 space-y-2">
                {section.groups.map(group => (
                  <div key={group.title} className="border-b border-gray-100 pb-4 mb-4 last:border-b-0">
                    <button
                      onClick={() => setActiveGroup(activeGroup === group.title ? null : group.title)}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors duration-200 flex items-center justify-between group"
                    >
                      <span className="font-medium text-gray-800 group-hover:text-foreground">
                        {group.title}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        activeGroup === group.title ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {activeGroup === group.title && (
                      <div className="mt-2 space-y-1 pl-4">
                        {group.qaIds.map(qaId => {
                          const qa = section.qas.find(q => q.id === qaId);
                          if (!qa) return null;
                          
                          const isActive = currentQaId === qa.id;
                          const isCompleted = completedQAs.has(qa.id);
                          
                          return (
                            <button
                              key={qa.id}
                              onClick={() => onQAClick(qa.id)}
                              className={`w-full text-left p-2 rounded text-sm transition-all duration-200 flex items-start gap-2 ${
                                isActive 
                                  ? 'bg-primary/10 text-primary border-l-3 border-primary' 
                                  : 'hover:bg-gray-50 text-gray-600 hover:text-gray-800'
                              }`}
                            >
                              {isCompleted && (
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              )}
                              <span className="line-clamp-2">{qa.question}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Ungrouped Q&As
              <div className="p-4 space-y-1">
                {section.qas.map(qa => {
                  const isActive = currentQaId === qa.id;
                  const isCompleted = completedQAs.has(qa.id);
                  
                  return (
                    <button
                      key={qa.id}
                      onClick={() => onQAClick(qa.id)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 flex items-start gap-2 ${
                        isActive 
                          ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                          : 'hover:bg-gray-50 text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {isCompleted && (
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="line-clamp-2">{qa.question}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
