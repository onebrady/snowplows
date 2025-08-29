import { type KnowledgeSection } from "../types";

export const Regional: KnowledgeSection = {
  slug: "regional",
  title: "Regional",
  preview: "State-specific guidance for OH, MI, PA-W, IN, KY",
  icon: "Map",
  qas: [
    // State-specific operational guidance
    {
      id: "region-q1",
      question: "Ohio—what should we prioritize?",
      answer:
        "Freeze–thaw and lake-effect bursts call for trip-edge plows, stainless body construction, and robust pre-wet programs. Equipment priorities: corrosion-resistant components, pilot RWIS at interchanges, and covered salt storage requirements for compliance.",
    },
    {
      id: "region-q2", 
      question: "Michigan—equipment notes?",
      answer:
        "Heavy lake-effect demands robust moldboards, wing options for wide corridors, and underbody scrapers on arterials for shoulder benching. High-capacity hydraulics essential for simultaneous operations in extreme conditions.",
    },
    {
      id: "region-q3",
      question: "Western Pennsylvania—terrain impacts?",
      answer:
        "Hills and microclimates favor V-plows for drift breaking, aggressive chains/tires, and precise rate control on grades. Key strategy: standardize Olympus controls across mixed OEM fleets for consistent operation and training.",
    },
    {
      id: "region-q4",
      question: "Indiana—wind and drift strategies?",
      answer:
        "Open corridors require taller boards, drift knives, and route plans that minimize crosswind exposure. V-plow or front+wing configurations handle drift breaking effectively. Spinner shields prevent crosswind scatter.",
    },
    {
      id: "region-q5",
      question: "Kentucky—ice storm readiness?",
      answer:
        "Mixed precipitation makes anti-icing systems and underbody scrapers critical for post-ice cleanup. Equipment priorities include liquid application capacity and chainsaw/clearance kits for downed limb removal.",
    },
    // Comprehensive state-by-state guidance from PRD
    {
      id: "region-q6",
      question: "Ohio—comprehensive operational guidance?",
      answer:
        "Lake-effect snow patterns and freeze-thaw cycles require trip-edge plows, stainless body construction, and robust pre-wet kit programs. Equipment priorities: corrosion-resistant components, bridge/ramp priority protocols, covered salt storage, and pilot RWIS integration at interchanges. Compliance focus: covered storage requirements and salt-reduction reporting documentation.",
    },
    {
      id: "region-q7", 
      question: "Michigan—equipment and operational specifics?",
      answer:
        "Heavy lake-effect bursts demand robust moldboards, wing plow configurations for wide corridors, and underbody scrapers on arterials for shoulder benching. Upper Peninsula routes require carbide edges for longevity and enhanced equipment redundancy. Compliance emphasis: brine/anti-ice SOPs with detailed documentation for environmental reporting.",
    },
    {
      id: "region-q8",
      question: "Pennsylvania-West—terrain and compliance considerations?",
      answer:
        "Hilly terrain and micro-climate black ice favor V-plows for drift breaking, aggressive tire chains, and precise application rate control on grades. Critical strategy: standardize Olympus controls across mixed OEM platforms to improve efficiency and training. HOS compliance documentation during storm events and bridge/grade prioritization protocols are essential.",
    },
    {
      id: "region-q9",
      question: "Indiana—wind management and equipment strategies?", 
      answer:
        "Open corridors and wind-blown drifts require taller moldboards, drift knives, and route planning that minimizes crosswind exposure. V-plow or front+wing configurations handle drift breaking effectively. Spinner shields prevent crosswind scatter. Environmental compliance includes controlled wash-down procedures and covered salt storage requirements.",
    },
    {
      id: "region-q10",
      question: "Kentucky—transition climate and ice storm readiness?",
      answer:
        "Mixed precipitation and transition climate make anti-icing systems and underbody scrapers critical for post-ice cleanup. Equipment priorities include liquid application capacity and chainsaw/clearance kits for downed limb removal. Training focus: refresher programs for low-frequency but high-impact events, since crews have less regular storm experience.",
    },
    // Application and procurement guidance
    {
      id: "region-q11",
      question: "Brine usage—regional differences?",
      answer:
        "Colder northern routes lean to treated salt blends for temperature effectiveness; transition climates balance brine anti-icing with timely plowing to reduce total chloride usage while maintaining safety standards.",
    },
    {
      id: "region-q12",
      question: "Spec changes by district priority?",
      answer:
        "Urban arterials benefit from wing plows and quick-change cutting edges for efficiency; rural districts prioritize fuel capacity, enhanced lighting packages, and equipment redundancy for extended operations.",
    },
    {
      id: "region-q13",
      question: "Where to place regional notes in RFPs?",
      answer:
        "Include a 'Regional Considerations' appendix referencing specific climate patterns, terrain challenges, and maintenance practices with measurable performance requirements tied to local conditions and compliance needs.",
    },
  ],
  groups: [
    {
      id: "state-basics",
      title: "State-Specific Basics",
      qaIds: ["region-q1", "region-q2", "region-q3", "region-q4", "region-q5"],
    },
    {
      id: "comprehensive-state-guidance", 
      title: "Comprehensive State Guidance",
      qaIds: ["region-q6", "region-q7", "region-q8", "region-q9", "region-q10"],
    },
    {
      id: "application-procurement",
      title: "Application & Procurement",
      qaIds: ["region-q11", "region-q12", "region-q13"],
    },
  ],
  terms: [
    "Lake-Effect",
    "Freeze-Thaw",
    "Shoulder Benching", 
    "RWIS",
    "Transition Climate",
    "HOS Compliance",
    "Regional Considerations",
  ],
  relatedSlugs: ["equipment", "operations", "procurement"],
};