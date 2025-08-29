import { type KnowledgeSection } from "../types";

export const Technology: KnowledgeSection = {
  slug: "technology",
  title: "Technology", 
  preview: "Data systems and predictive maintenance",
  icon: "Signal",
  qas: [
    // Core telematics Q&As
    {
      id: "tele-q1",
      question: "What proof-of-service should we capture?",
      answer:
        "GPS breadcrumb, blade up/down, spreader on/off, and rate setpoint. Tie events to timestamps for defensible records.",
    },
    {
      id: "tele-q2",
      question: "Which sensors matter for uptime?",
      answer:
        "Hydraulic pressure/temperature, pump current, and controller faults. Early alerts prevent route failures.",
    },
    {
      id: "tele-q3",
      question: "How to integrate with our existing AVL?",
      answer:
        "Export core events via CAN/serial or REST. Map to your AVL fields; avoid duplicate GPS sources.",
    },
    {
      id: "tele-q4",
      question: "Predictive maintenance—what's practical?",
      answer:
        "Track motor duty cycles and valve actuations to schedule service before failures; monitor hydraulic temps for cooling needs.",
    },
    {
      id: "tele-q5",
      question: "Data retention and privacy?",
      answer:
        "Retain raw events for the season plus one audit year. Limit personally identifiable driver data to what's necessary.",
    },
    {
      id: "tele-q8",
      question: "Who owns the data?",
      answer:
        "Your municipality should own the data, with clear contracts on export formats and retention.",
    },
    // Additional Technology Q&As from PRD
    {
      id: "tele-q9",
      question: "Downtime cost analysis—quantifying the business case?",
      answer:
        "Calculate the full cost of equipment failure: overtime labor, contractor backup rates, safety risk exposure, and reputation impact. A single 12-hour breakdown during a storm can cost $3,000-8,000 in direct costs, plus liability exposure. Use this analysis to justify better specifications, preventive maintenance, and spare parts inventory.",
    },
    {
      id: "tele-q10",
      question: "Implementation starter kit—where to begin?",
      answer:
        "Start with GPS tracking plus spreader pulse logging on a pilot route for one storm season. Focus on proof-of-service and basic material accountability before expanding to predictive maintenance. This approach builds internal capability and demonstrates ROI before full fleet deployment.",
    },
    {
      id: "tele-q11",
      question: "Dashboard integration—unified fleet visibility?",
      answer:
        "Feed Olympus control logs and AVL data into a common operations dashboard for real-time fleet status, route progress, and material usage. Integration provides supervisors with centralized visibility for deployment decisions and post-storm reporting. Essential for large fleet coordination.",
    },
    {
      id: "tele-q12",
      question: "Data retention strategy for compliance?",
      answer:
        "Retain raw telematics events for the current season plus one additional year for audit purposes. Archive summary reports for longer-term trend analysis and legal compliance. Balance storage costs with liability protection and operational improvement needs.",
    },
    // Diagnostic capabilities from controls
    {
      id: "controls-q5",
      question: "Diagnostics and serviceability?",
      answer:
        "On-screen faults, I/O status views, and event logs speed troubleshooting. Standardized modules simplify spares and training.",
    },
    {
      id: "controls-q6",
      question: "Can it integrate with telematics?",
      answer:
        "Yes—export key events and rates via CAN/serial for proof-of-service, work orders, and compliance reporting.",
    },
  ],
  groups: [
    {
      id: "data-monitoring",
      title: "Data & Monitoring",
      qaIds: ["tele-q1", "tele-q2"],
    },
    {
      id: "predictive-maintenance",
      title: "Predictive Maintenance", 
      qaIds: ["tele-q4", "controls-q5", "tele-q9"],
    },
    {
      id: "system-integration",
      title: "System Integration",
      qaIds: ["tele-q3", "controls-q6", "tele-q11"],
    },
    {
      id: "analytics-governance",
      title: "Analytics & Governance",
      qaIds: ["tele-q5", "tele-q8", "tele-q12"],
    },
    {
      id: "implementation",
      title: "Implementation",
      qaIds: ["tele-q10"],
    },
  ],
  terms: ["AVL", "CAN Bus", "Predictive Maintenance", "Duty Cycle", "PWM", "Diagnostics"],
  hasLaneCoverageTool: true,
  relatedSlugs: ["integration", "procurement", "environment"],
};