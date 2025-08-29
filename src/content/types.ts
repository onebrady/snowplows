export type QAItem = {
  id: string;
  question: string;
  answer: string; // supports basic HTML markup
};

export type QAGroup = {
  id: string;
  title: string;
  qaIds: string[];
};

export type KnowledgeSection = {
  slug: string;
  title: string;
  preview: string;
  icon: string; // lucide icon name
  qas: QAItem[];
  groups?: QAGroup[];
  terms?: string[];
  hasLaneCoverageTool?: boolean;
  hasSaltUsageTool?: boolean;
  relatedSlugs?: string[];
  downloads?: { label: string; href: string }[];
  factCardTitle?: string;
  factCardBullets?: string[];
  checklist?: {
    title: string;
    items: string[];
  };
};
