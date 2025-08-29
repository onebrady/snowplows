import { type KnowledgeSection } from "../types";

export const Integration: KnowledgeSection = {
  slug: "integration",
  title: "Integration",
  preview: "Controls, mounting, and chassis compliance",
  icon: "Settings",
  qas: [
    // Controls Q&As
    {
      id: "controls-q1",
      question: "What is Olympus?",
      answer:
        'An integrated plow/spreader/dump control platform with a 12" touch display and a 2-axis joystick featuring six thumb buttons. One controller runs front plow, wing, underbody, dump, and spreader with unified wiring and shared diagnostics.'
    },
    {
      id: "controls-q2",
      question: "Why integrated vs. piecemeal?",
      answer:
        "Unified wiring, shared diagnostics, one learning curve, and faster upfits. Adding features later (wing, pre-wet) is a configuration step—not a new control box. Reduces troubleshooting complexity and standardizes operator training across your fleet."
    },
    {
      id: "controls-q3",
      question: "Operator UX highlights",
      answer:
        "Dead-man trigger, day/night modes, glove-friendly targets, and logical function grouping reduce errors in storms.",
    },
    {
      id: "controls-q4",
      question: "How do presets and interlocks help?",
      answer:
        "Route presets set rates and blade modes in one tap. Interlocks prevent unsafe combos (e.g., travel speed with wing extended).",
    },
    {
      id: "controls-q5",
      question: "Diagnostics and serviceability?",
      answer:
        "On-screen fault codes, hydraulic status monitoring, and calibration screens standardize troubleshooting across trucks and shifts. I/O status views and event logs help diagnose issues quickly. Modular components and standardized harnessing cut downtime in winter conditions."
    },
    {
      id: "controls-q6",
      question: "Can it integrate with telematics?",
      answer:
        "Yes—export key events and rates via CAN/serial for proof-of-service, work orders, and compliance reporting.",
    },
    {
      id: "controls-q7",
      question: "Installation considerations?",
      answer:
        "Protect harness runs, use drip loops, avoid pinch points, and label connections. Allow service access around hydraulic valves.",
    },
    {
      id: "controls-q8",
      question: "Training the crew—what matters most?",
      answer:
        "Keep it hands-on. Cover presets, safe recovery from faults, and how to run manual overrides if needed.",
    },
    // Fit & Compliance Q&As
    {
      id: "fit-q1",
      question: "What are the must-checks for GVWR and axle loads?",
      answer:
        "Confirm installed plow/spreader weights vs. front axle rating (FAWR) and rear axle rating (RAWR) with full fuel and operator. Maintain reserve for cargo and liquids.",
    },
    {
      id: "fit-q2",
      question: "Frame rail and PTO considerations?",
      answer:
        "Check frame section modulus for wing posts/underbody scrapers. Verify PTO clearance, torque, and hydraulic pump sizing for combined loads.",
    },
    {
      id: "fit-q3",
      question: "Lighting and visibility compliance?",
      answer:
        "Meet FMVSS/CMVSS with auxiliary lights correctly aimed; ensure plow markers and heated mirrors for poor visibility.",
    },
    {
      id: "fit-q4",
      question: "What about corrosion protection?",
      answer:
        "Use stainless or coated components where possible, apply dielectric grease to connectors, and spec undercoating in severe salt regions.",
    },
    {
      id: "fit-q5",
      question: "Transport and height limits?",
      answer:
        "Confirm transport width and height with wings stowed and dump body lowered. Follow state oversize rules when applicable.",
    },
    {
      id: "fit-q6",
      question: "Operator ergonomics for long shifts?",
      answer:
        "Seat/joystick positioning, visibility over plow, heated seats, and reduced noise/vibration improve safety and retention.",
    },
    {
      id: "fit-q7",
      question: "Hydraulic capacity and heat management?",
      answer:
        "Size reservoir and coolers for simultaneous wing/underbody operations. Monitor return-line temperature; consider bypass during transport.",
    },
    {
      id: "fit-q8",
      question: "Documentation for audits?",
      answer:
        "Keep weight tickets, as-built wiring/hydraulic diagrams, and operator manuals with the vehicle file for DOT and insurance.",
    },
    // Additional Integration Q&As from PRD
    {
      id: "controls-q9",
      question: "Material control features in Olympus?",
      answer:
        "Set application rate by lane-mile, tie output to ground speed for consistent coverage, and log blast/pause events for material accountability. The system tracks material usage patterns and provides data for route optimization and compliance reporting.",
    },
    {
      id: "controls-q10",
      question: "Future-proofing with Olympus?",
      answer:
        "Software-updateable feature sets and reserved I/O connections let fleets grow capability without tearing up the cab. Add new functions like pre-wet, wing controls, or telematics modules through configuration rather than complete rewiring. Protects your control system investment long-term.",
    },
    {
      id: "fit-q9",
      question: "Legal weight thresholds for compliance?",
      answer:
        "Know CDL requirements (26,000 lb GVWR threshold), DOT number requirements (10,001+ lb GVWR), and weight class breakpoints that affect regulations. Plan fleet mix accordingly—staying under 26,000 lbs avoids CDL requirements but limits equipment capacity. Document compliance for each vehicle configuration.",
    },
    {
      id: "fit-q10",
      question: "Ballast and load verification requirements?",
      answer:
        "Use calculated ballast to keep steer axle within specification and maintain braking/handling with plow mounted. Critical step: verify actual weights on certified scales after upfit completion. Document as-built weights for compliance and safe operation throughout the equipment lifecycle.",
    },
    {
      id: "controls-q11",
      question: "Serviceability improvements with integrated controls?",
      answer:
        "Simplified harnessing reduces failure points, sealed connectors prevent corrosion-related faults, and modular components enable rapid field repairs. Standardized diagnostic protocols and common spare parts across the fleet reduce downtime and training requirements for maintenance staff.",
    },
  ],
  groups: [
    {
      id: "control-systems",
      title: "Control Systems",
      qaIds: ["controls-q1", "controls-q2", "controls-q9"],
    },
    {
      id: "installation-setup",
      title: "Installation & Setup",
      qaIds: ["controls-q7", "controls-q5", "controls-q11"],
    },
    {
      id: "chassis-mounting",
      title: "Chassis & Mounting",
      qaIds: ["fit-q1", "fit-q2", "fit-q5", "fit-q10"],
    },
    {
      id: "power-systems",
      title: "Power Systems",
      qaIds: ["fit-q7", "controls-q6"],
    },
    {
      id: "compliance-documentation",
      title: "Compliance & Documentation",
      qaIds: ["fit-q3", "fit-q4", "fit-q6", "fit-q8", "fit-q9"],
    },
    {
      id: "operation-training",
      title: "Operation & Training",
      qaIds: ["controls-q3", "controls-q4", "controls-q8"],
    },
    {
      id: "advanced-features",
      title: "Advanced Features",
      qaIds: ["controls-q10"],
    },
  ],
  terms: [
    "Preset",
    "Interlock", 
    "CAN Bus",
    "PWM",
    "Joystick",
    "GVWR",
    "FAWR",
    "RAWR",
    "PTO",
    "FMVSS",
  ],
  relatedSlugs: ["equipment", "technology", "procurement"],
  checklist: {
    title: "Pre-build fit audit & compliance",
    items: [
      "Verify FGAWR/GVWR with plow + ballast",
      "Hydraulics/PTO sizing for simultaneous ops",
      "Electrical loads and lighting integration",
      "Body materials and corrosion protection",
      "Controls integration plan (Olympus)",
      "Legal thresholds (CDL/DOT/weight class)",
      "Document approvals and as-built diagrams",
    ],
  },
  downloads: [
    {
      label: "Olympus Controls Manual",
      href: "/wp-content/uploads/2025/05/Olympus_Hydraulic_Control_System_v1-1.pdf",
    },
    {
      label: "ARM Dump Body PDF",
      href: "/wp-content/uploads/2025/05/ARM-TruckCorp-Dump-Body.pdf",
    },
  ],
};