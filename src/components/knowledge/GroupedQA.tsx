import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { QAItem, QAGroup } from "@/content/types";
import { HelpCircle, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from "lucide-react";

export function GroupedQA({
  groups,
  items,
  completedQAs: _completedQAs = new Set(),
  bookmarkedQAs = new Set(),
  onBookmarkToggle,
}: {
  groups: QAGroup[];
  items: QAItem[];
  completedQAs?: Set<string>;
  bookmarkedQAs?: Set<string>;
  onBookmarkToggle?: (qaId: string) => void;
}) {
  const byId = new Map(items.map((i) => [i.id, i]));
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : false;
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(isMobile ? [] : items.map((i) => i.id))
  );

  const toggleQA = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandGroup = (qaIds: string[]) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      qaIds.forEach((qid) => next.add(qid));
      return next;
    });

  const collapseGroup = (qaIds: string[]) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      qaIds.forEach((qid) => next.delete(qid));
      return next;
    });
  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <Card
          key={g.id}
          id={g.id}
          className="scroll-mt-32 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow duration-300"
          data-testid="qa-group"
        >
          <CardHeader className="pb-4 bg-blue-50/50">
            <div className="flex items-center justify-between gap-3">
              <CardTitle
                className="text-[22px] leading-tight text-blue-900 font-bold"
                data-testid="group-title"
              >
                {g.title}
              </CardTitle>
              {g.qaIds.length > 1 && (
                (() => {
                  const allExpanded = g.qaIds.every((id) => expanded.has(id));
                  return (
                    <button
                      type="button"
                      onClick={() =>
                        allExpanded ? collapseGroup(g.qaIds) : expandGroup(g.qaIds)
                      }
                      className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs hover:bg-blue-50 border-blue-200 text-blue-700"
                      aria-label={allExpanded ? "Collapse all" : "Expand all"}
                    >
                      {allExpanded ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5" />
                          Collapse all
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5" />
                          Expand all
                        </>
                      )}
                    </button>
                  );
                })()
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-7">
              {g.qaIds.map((qid, idx) => {
                const qa = byId.get(qid);
                if (!qa) return null;
                return (
                  <div
                    key={qid}
                    data-qa-id={qa.id}
                    className={
                      "group flex items-start gap-4 scroll-mt-32" +
                      (idx > 0 ? " border-t pt-5 mt-5 border-border/60" : "")
                    }
                    data-testid="qa-row"
                  >
                    <HelpCircle className="h-5 w-5 mt-1 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="font-medium text-[18px] leading-tight">
                          {qa.question}
                        </div>
                        <div className="flex items-center gap-2 opacity-100 transition-opacity duration-300">
                          <button
                            type="button"
                            onClick={() => toggleQA(qa.id)}
                            className="rounded-md border px-2 py-1 text-xs text-blue-700 border-blue-200 hover:bg-blue-50 inline-flex items-center gap-1"
                            aria-expanded={expanded.has(qa.id)}
                            aria-controls={`qa-answer-${qa.id}`}
                          >
                            {expanded.has(qa.id) ? (
                              <>
                                <ChevronUp className="w-3.5 h-3.5" /> Hide
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3.5 h-3.5" /> Show
                              </>
                            )}
                          </button>
                          {onBookmarkToggle && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onBookmarkToggle(qa.id)}
                              className="text-gray-400 hover:text-blue-600 p-1"
                              aria-label={bookmarkedQAs.has(qa.id) ? "Remove bookmark" : "Add bookmark"}
                            >
                              {bookmarkedQAs.has(qa.id) ? (
                                <BookmarkCheck className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      {expanded.has(qa.id) && (
                        <div
                          id={`qa-answer-${qa.id}`}
                          className="text-[16px] text-foreground/80 mt-3 leading-[1.7] prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: qa.answer }}
                        />
                      )}
                      {/* completion indicator removed to reduce vertical bloat */}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function JumpNav({ groups }: { groups: QAGroup[] }) {
  const [active, setActive] = useState<string>(groups[0]?.id || "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5] }
    );
    const els = groups
      .map((g) => document.getElementById(g.id))
      .filter((el): el is HTMLElement => !!el);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  const handleJump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="sticky top-12 z-20 bg-white/95 backdrop-blur-sm border border-blue-100 rounded-lg px-3 py-2.5 text-sm overflow-x-auto shadow-sm mb-6"
      data-testid="jumpnav"
      role="navigation"
      aria-label="Section Navigation"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span className="font-semibold text-blue-800">Jump to:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {groups.map((g) => (
            <Button
              key={g.id}
              onClick={handleJump(g.id)}
              variant={active === g.id ? "default" : "outline"}
              size="sm"
              className={`text-xs sm:text-sm flex-shrink-0 transition-all duration-300 ${
                active === g.id 
                  ? "bg-blue-600 text-white shadow-md scale-105" 
                  : "border-blue-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
              aria-current={active === g.id ? "true" : undefined}
            >
              {g.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
