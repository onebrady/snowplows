import React, { useState, useEffect, useMemo, Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Snowflake, Settings, ShieldCheck, Leaf, BriefcaseBusiness, Signal, Bookmark, ArrowUp, ArrowRight } from "lucide-react";
import type { KnowledgeSection } from "@/content/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GroupedQA, JumpNav } from "./GroupedQA";
import { SectionSidebar } from "./SectionSidebar";
import { LaneCoverageEstimator } from "../microtools/LaneCoverageEstimator";
import { SaltUsageCalculator } from "../microtools/SaltUsageCalculator";
import { Checklist } from "../shared/Checklist";
import { FactCard } from "../shared/FactCard";
import { emitAnalytics } from "../../lib/analytics";

// Icon mapping for sections
const sectionIcons = {
  'equipment': Snowflake,
  'integration': Settings, 
  'operations': ShieldCheck,
  'environment': Leaf,
  'procurement': BriefcaseBusiness,
  'technology': Signal,
};

// Lazy-loaded component for section content to improve performance
function LazyContentRenderer({ 
  section, 
  completedQAs = new Set(), 
  bookmarkedQAs = new Set(), 
  onBookmarkToggle 
}: { 
  section: KnowledgeSection;
  completedQAs?: Set<string>;
  bookmarkedQAs?: Set<string>;
  onBookmarkToggle?: (qaId: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Jump Navigation */}
      {section.groups && section.groups.length > 0 && (
        <JumpNav groups={section.groups} />
      )}
      
      {/* Q&As */}
      {section.groups && section.groups.length > 0 ? (
        <GroupedQA 
          groups={section.groups} 
          items={section.qas}
          completedQAs={completedQAs}
          bookmarkedQAs={bookmarkedQAs}
          onBookmarkToggle={onBookmarkToggle}
        />
      ) : (
        <div className="space-y-4">
          {section.qas.map((qa) => (
            <Card key={qa.id}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{qa.question}</h3>
                <div 
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: qa.answer }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Microtools */}
      {section.hasSaltUsageTool && (
        <Card>
          <CardHeader>
            <CardTitle>Salt Usage Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <SaltUsageCalculator />
          </CardContent>
        </Card>
      )}
      
      {section.hasLaneCoverageTool && (
        <Card>
          <CardHeader>
            <CardTitle>Lane Coverage Estimator</CardTitle>
          </CardHeader>
          <CardContent>
            <LaneCoverageEstimator />
          </CardContent>
        </Card>
      )}
      
      {/* Fact Cards */}
      {section.factCardTitle && section.factCardBullets && (
        <FactCard 
          title={section.factCardTitle}
          bullets={section.factCardBullets}
        />
      )}
      
      {/* Checklists */}
      {section.checklist && (
        <Checklist 
          title={section.checklist.title}
          items={section.checklist.items}
        />
      )}
      
      {/* Downloads */}
      {section.downloads && section.downloads.length > 0 && (
        <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50/50 to-blue-100/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">📄</span>
              </div>
              Resource Downloads
            </CardTitle>
            <p className="text-sm text-blue-700">Essential guides and documentation for your reference</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {section.downloads.map((download, downloadIndex) => (
                <a
                  key={downloadIndex}
                  href={download.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-5 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  onClick={() => emitAnalytics("download_click", { 
                    section: section.slug, 
                    download: download.label 
                  })}
                >
                  {/* Enhanced PDF Icon */}
                  <div className="relative mr-4 flex-shrink-0">
                    <div className="w-14 h-16 bg-gradient-to-b from-red-500 to-red-600 rounded-lg shadow-md flex flex-col items-center justify-center group-hover:shadow-lg transition-all duration-300">
                      <span className="text-white text-xs font-bold mb-1">PDF</span>
                      <div className="w-8 h-0.5 bg-red-300 rounded"></div>
                      <div className="w-6 h-0.5 bg-red-300 rounded mt-1"></div>
                      <div className="w-7 h-0.5 bg-red-300 rounded mt-1"></div>
                    </div>
                    {/* Download arrow indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xs">↓</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                      {download.label}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                      Click to download PDF guide
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-blue-600 transition-colors duration-300 font-medium">
                        Ready
                      </span>
                    </div>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="ml-3 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-6 h-6 text-blue-600">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface SinglePageKnowledgeProps {
  sections: KnowledgeSection[];
  loading?: boolean;
}

export function SinglePageKnowledge({ sections, loading = false }: SinglePageKnowledgeProps) {
  // State for tabbed interface and navigation
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.slug || "equipment");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentQA, setCurrentQA] = useState<string | undefined>();
  const [completedQAs, setCompletedQAs] = useState<Set<string>>(new Set());
  const [bookmarkedQAs, setBookmarkedQAs] = useState<Set<string>>(new Set());
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Handle URL hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?(knowledge\/)?/, ''); // Remove # and optional knowledge prefix
      if (hash && sections.some(section => section.slug === hash)) {
        setActiveSection(hash);
      }
    };

    // Handle initial hash on mount
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sections]);

  // Handle scroll events for scroll-to-top button and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 400;
      setShowScrollToTop(scrolled);
      
      // Track QA visibility for completion status
      const qaElements = document.querySelectorAll('[data-qa-id]');
      qaElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (isVisible) {
          const qaId = element.getAttribute('data-qa-id');
          if (qaId) {
            setCurrentQA(qaId);
            
            // Mark as read after 3 seconds of being in view
            setTimeout(() => {
              setCompletedQAs(prev => new Set([...prev, qaId]));
            }, 3000);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved state from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem('knowledge-completed-qas');
    const savedBookmarks = localStorage.getItem('knowledge-bookmarked-qas');
    
    if (savedCompleted) {
      setCompletedQAs(new Set(JSON.parse(savedCompleted)));
    }
    if (savedBookmarks) {
      setBookmarkedQAs(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('knowledge-completed-qas', JSON.stringify([...completedQAs]));
  }, [completedQAs]);

  useEffect(() => {
    localStorage.setItem('knowledge-bookmarked-qas', JSON.stringify([...bookmarkedQAs]));
  }, [bookmarkedQAs]);

  // Handle section switching with smooth transitions
  const handleSectionChange = useCallback(async (newSection: string) => {
    if (newSection === activeSection) return;
    
    setIsTransitioning(true);
    
    // Update URL hash for deep linking (root-based)
    window.history.replaceState(null, '', `#/${newSection}`);
    
    // Brief delay for transition effect
    setTimeout(() => {
      setActiveSection(newSection);
      emitAnalytics("section_change", { 
        from: activeSection, 
        to: newSection 
      });
      setIsTransitioning(false);
      
      // Scroll to top of new section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  }, [activeSection]);

  // Handle QA navigation from sidebar
  const handleQAClick = useCallback((qaId: string) => {
    const element = document.querySelector(`[data-qa-id="${qaId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setCurrentQA(qaId);
      emitAnalytics("qa_navigate", { qaId, section: activeSection });
    }
  }, [activeSection]);

  // Handle bookmark toggle
  const handleBookmarkToggle = useCallback((qaId: string) => {
    setBookmarkedQAs(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(qaId)) {
        newBookmarks.delete(qaId);
        emitAnalytics("qa_unbookmark", { qaId, section: activeSection });
      } else {
        newBookmarks.add(qaId);
        emitAnalytics("qa_bookmark", { qaId, section: activeSection });
      }
      return newBookmarks;
    });
  }, [activeSection]);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation for tabbed interface
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Arrow keys for section navigation (when not focused on input)
      if (!event.target || (event.target as HTMLElement).tagName !== 'INPUT') {
        const currentIndex = sections.findIndex(section => section.slug === activeSection);
        
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
          event.preventDefault();
          handleSectionChange(sections[currentIndex - 1].slug);
        } else if (event.key === 'ArrowRight' && currentIndex < sections.length - 1) {
          event.preventDefault();
          handleSectionChange(sections[currentIndex + 1].slug);
        }
        
        // Number keys to jump to sections (1-6)
        const keyNum = parseInt(event.key);
        if (keyNum >= 1 && keyNum <= sections.length && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          handleSectionChange(sections[keyNum - 1].slug);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, sections, handleSectionChange]);


  // Calculate total Q&As and completion stats for each section
  const sectionStats = useMemo(() => {
    const stats: Record<string, { total: number; completed: number; bookmarked: number }> = {};
    
    sections.forEach(section => {
      const total = section.qas.length;
      const completed = section.qas.filter(qa => completedQAs.has(qa.id)).length;
      const bookmarked = section.qas.filter(qa => bookmarkedQAs.has(qa.id)).length;
      
      stats[section.slug] = { total, completed, bookmarked };
    });
    
    return stats;
  }, [sections, completedQAs, bookmarkedQAs]);


  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Skeleton for sticky navigation */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 mb-4">
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-5 w-6 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Skeleton for knowledge sections */}
        <div className="space-y-8">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <Skeleton className="w-10 h-10 rounded-md" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-7 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 ${sidebarVisible ? 'ml-80' : ''}`}>
      {/* Sidebar Navigation */}
      {sections.find(section => section.slug === activeSection) && (
        <SectionSidebar
          section={sections.find(section => section.slug === activeSection)!}
          isVisible={sidebarVisible}
          onToggle={() => setSidebarVisible(!sidebarVisible)}
          currentQaId={currentQA}
          completedQAs={completedQAs}
          onQAClick={handleQAClick}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 pt-12 pb-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Know
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to snow equipment selection, operation, and maintenance across 7 key categories
          </p>
          <div className="mt-5 flex items-center justify-center">
            <Link
              to="/quiz"
              className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 text-white px-6 md:px-10 h-[60px] max-h-[75px] shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <span className="text-base md:text-lg font-semibold">Get Equipment Recommendations</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Mobile Pill Navigation */}
        <div className="sm:hidden mb-5 -mx-4 px-4 overflow-x-auto">
          <div className="flex items-center gap-2 snap-x snap-mandatory">
            {sections.map(section => {
              const isActive = activeSection === section.slug;
              return (
                <Button
                  key={section.slug}
                  variant={isActive ? "default" : "outline"}
                  className={`flex-shrink-0 snap-start whitespace-nowrap truncate max-w-[9rem] md:max-w-[12rem] px-3 py-2 md:px-4 md:py-2.5 rounded-full text-[14px] md:text-[15px] font-medium h-auto min-h-[40px] ${isActive ? 'bg-blue-600 text-white' : ''}`}
                  onClick={() => handleSectionChange(section.slug)}
                >
                  {section.title}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Primary Navigation - Section Tiles */}
        <div className="mb-8 hidden sm:block" id="sections">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {sections.map(section => {
              const IconComponent = sectionIcons[section.slug as keyof typeof sectionIcons] || Snowflake;
              const isActive = activeSection === section.slug;
              const stats = sectionStats[section.slug];
              const completionPercent = stats ? Math.round((stats.completed / stats.total) * 100) : 0;
              
              return (
                <button
                  key={section.slug}
                  onClick={() => handleSectionChange(section.slug)}
                  disabled={isTransitioning}
                  className={`relative text-center p-1.5 md:p-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-70 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white border border-gray-200 hover:border-blue-300 text-gray-700'
                  }`}
                >
                  {/* Completion indicator removed per request */}
                  
                  {/* Bookmark indicator */}
                  {stats && stats.bookmarked > 0 && (
                    <div className="absolute top-1.5 left-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                    </div>
                  )}
                  
                  <div className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive ? 'bg-blue-500' : 'bg-blue-50'
                  }`}>
                    <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <h3 className={`font-semibold text-[12px] md:text-sm lg:text-[23px] mb-0.5 truncate ${
                    isActive ? 'text-white' : 'text-gray-800'
                  }`}>
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    <div className={`text-[10px] px-1.5 py-0.5 rounded-full inline-block ${
                      isActive ? 'bg-blue-400/90 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {(stats?.total || section.qas.length)} topics
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      {/* Single Content Area - Active Section */}
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          {sections
            .filter(section => section.slug === activeSection)
            .map(section => (
              <div key={section.slug} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 md:p-6">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/20 rounded-full">
                    {React.createElement(sectionIcons[section.slug as keyof typeof sectionIcons] || Snowflake, {
                      className: "w-12 h-12 text-white"
                    })}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-1">{section.title}</h1>
                    <p className="text-blue-100 text-base md:text-lg">{section.preview}</p>
                    <div className="mt-2 text-blue-100/90 text-sm">{section.qas.length} topics</div>
                  </div>
                </div>
              </div>
              
              {/* Section Content */}
              <div className="p-8">
                <Suspense fallback={
                  <div className="space-y-6">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-24 w-3/4" />
                  </div>
                }>
                  <LazyContentRenderer 
                    section={section}
                    completedQAs={completedQAs}
                    bookmarkedQAs={bookmarkedQAs}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                </Suspense>
              </div>
              </div>
            ))
          }
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-300 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      </div>
    </div>
  );
}
