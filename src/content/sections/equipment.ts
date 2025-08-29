import { type KnowledgeSection } from "../types";

export const Equipment: KnowledgeSection = {
  slug: "equipment",
  title: "Equipment",
  preview: "Plows, spreaders, and core equipment basics",
  icon: "Snowflake",
  qas: [
    // Plow Q&As
    {
      id: "plows-q1",
      question: "Trip-edge vs. full-trip—what's the practical difference?",
      answer:
        "Trip-edge plows let only the cutting edge give on impact, keeping your load and avoiding false trips in heavy, wet snow. Full-trip plows hinge the entire moldboard; they're gentler on the truck/driver on impact but can flip forward under load and need a reset. <strong>City grids:</strong> trip-edge. <strong>Smoother routes/lighter chassis:</strong> full-trip.",
    },
    {
      id: "plows-q2",
      question: "Straight, V, or Wing—when should I choose each?",
      answer:
        "<strong>Straight:</strong> simple and versatile. <strong>V-plow:</strong> breaks drifts/windrows with scoop/vee/straight modes. <strong>Side Wing (with front plow):</strong> multiplies cleared width on arterials/highways and pushes banks back from travel lanes."
    },
    {
      id: "plows-q3",
      question: "How do I size moldboard width and height?",
      answer:
        "Match width to lane width and turning envelope; ensure the truck covers tire tracks when angled. Taller, more curved boards cast snow farther; lower profiles help intersection sightlines.",
    },
    {
      id: "plows-q4",
      question:
        "What cutting edge should we run (steel vs. carbide vs. rubber)?",
      answer:
        "<strong>Steel:</strong> strong scraping, general default for most applications. <strong>Carbide-insert:</strong> longest life on high-mile routes, higher upfront cost. <strong>Rubber/poly:</strong> quiet, surface-friendly on pavers/bridges, less aggressive on ice."
    },
    {
      id: "plows-q5",
      question: "Hydraulics: single vs. dual cylinders and float?",
      answer:
        "Dual-angle cylinders maintain authority under load and reduce drift. A properly set float lets the blade follow contours without overloading the frame; lock-out for transport.",
    },
    {
      id: "plows-q6",
      question: "Mount systems—what matters for uptime?",
      answer:
        "Quick-couple frames, positive pin engagement, and protected connectors speed changeovers. Stainless hardware and sealed connectors prevent corrosion; grease points accessible from ground.",
    },
    {
      id: "plows-q7",
      question: "How do plow shoes and curb guards affect performance?",
      answer:
        "Shoes lift the edge to spare surfaces during early/late season; curb guards protect end ribs from impacts. Remove shoes for full scraping during peak season.",
    },
    {
      id: "plows-q8",
      question: "What about backdragging and stacking?",
      answer:
        "Reinforced top ribs and proper attack angle help stacking. For backdragging docks/garages, consider a backdrag edge or V-plow in scoop mode to pull snow cleanly.",
    },
    // Spreader Q&As
    {
      id: "spreaders-q1",
      question: "Why an under-tailgate like the TG-505?",
      answer:
        "Under-tailgates keep your dump bed open for hauling, mount cleanly to standard bodies, and handle winter salt plus off-season aggregates. The TG-505 adds stainless construction, left/right discharge capability, and simple single-lever control for precise material placement.",
    },
    {
      id: "spreaders-q2",
      question: "What's my target application rate?",
      answer:
        "Set lbs/lane-mile by route priority, pavement temperature, and storm phase. Adjust down when pre-wetting or anti-icing are in play. Document targets per route and calibrate accordingly for consistent application."
    },
    {
      id: "spreaders-q3",
      question: "How do we calibrate correctly?",
      answer:
        "Time a conveyor/auger output catch, weigh the collected material, and set controller to hit your target rate at cruise speed. Re-check calibration after material changes or maintenance to maintain accuracy. Document calibration settings for consistency across operators."
    },
    {
      id: "spreaders-q4",
      question: "Spinner vs. chute—how does pattern control work?",
      answer:
        "Spinner diameter, baffling, and gate opening shape the pattern. Use deflectors for sidewalks/medians; keep salt off lawns and waterways.",
    },
    {
      id: "spreaders-q5",
      question: "Liquids: pre-wet vs. anti-ice?",
      answer:
        "<strong>Pre-wet:</strong> sprays brine onto salt at the spinner to reduce bounce/scatter and improve activation, often allowing lower total salt usage. <strong>Anti-ice:</strong> applies brine before storms to prevent bonding—roads plow cleaner and you often use less total chloride. Both techniques provide material cost savings while maintaining safety."
    },
    {
      id: "spreaders-q6",
      question: "Material choice—rock salt vs. blends?",
      answer:
        "Rock salt is most common. Blends with calcium/magnesium work at lower temps but cost more; sand adds traction but increases cleanup and stormwater load.",
    },
    {
      id: "spreaders-q7",
      question: "Maintenance that preserves accuracy?",
      answer:
        "Clean and dry post-storm, inspect harnesses, check encoder and gate positions, and lube bearings. Replace worn flighting to keep feed consistent.",
    },
    {
      id: "spreaders-q8",
      question: "What telemetry should I log?",
      answer:
        "Rate setpoint, ground speed, actual output (if measured), liquid on/off, and spinner state. Log GPS with time for proof-of-service and compliance.",
    },
    // Additional Equipment Q&As from PRD
    {
      id: "plows-q9",
      question: "Down-pressure: do I need it?",
      answer:
        "Down-pressure is helpful for scraping compact snow and ice at low speeds, particularly on urban routes. Use with care to avoid premature edge wear and pair with a trip-edge design to reduce nuisance trips. Essential for aggressive ice removal but not needed for all applications.",
    },
    {
      id: "spreaders-q9", 
      question: "6\" vs. 9\" under-tailgate—how to choose?",
      answer:
        "6\" covers typical municipal salt routes with moderate flow rates. 9\" is better for higher volume applications or sand-heavy mixes that require greater capacity. Ensure your hydraulics can match the flow rate you need—larger units require more hydraulic capacity for consistent performance.",
    },
    {
      id: "plows-q10",
      question: "When to add an underbody scraper?",
      answer:
        "Essential for freeze-thaw hard pack and post-storm cleanup operations. The underbody scraper applies down-pressure mid-chassis to fracture glaze ice that front plows ride over—ideal on arterials and rutted corridors where hard pack forms between storm events.",
    },
    {
      id: "plows-q11",
      question: "What about visibility and blow-back?",
      answer:
        "High-curve moldboards and deflectors reduce windshield blow-back at highway speeds, improving operator visibility and safety. Heated LED plow lights, camera aids, and proper blade height adjustment are critical for safe operation. Consider additional lighting packages for extended-hour operations.",
    },
    {
      id: "spreaders-q10",
      question: "Closed-loop control vs. manual—what's the payoff?",
      answer:
        "Ground-speed (closed-loop) control automatically adjusts output to truck speed, improving application consistency and material savings versus manual settings. Eliminates over-application during slowdowns and under-application during acceleration, typically reducing total salt usage by 10-15% while maintaining coverage.",
    },
    {
      id: "spreaders-q11",
      question: "Corrosion control for spreaders?",
      answer:
        "Prefer stainless steel housings (304 grade minimum) and hardware throughout the system. Wash equipment thoroughly after each storm, protect electrical connectors with dielectric grease, and consider polymer liners where practical. Regular post-storm maintenance prevents costly corrosion damage and extends equipment life.",
    },
  ],
  groups: [
    {
      id: "plow-types",
      title: "Plow Types & Dynamics",
      qaIds: ["plows-q1", "plows-q2"],
    },
    {
      id: "spreader-systems",
      title: "Spreader Systems",
      qaIds: ["spreaders-q1", "spreaders-q4"],
    },
    {
      id: "sizing-selection",
      title: "Sizing & Selection",
      qaIds: ["plows-q3", "spreaders-q2", "spreaders-q3", "spreaders-q9"],
    },
    {
      id: "materials-components",
      title: "Materials & Components",
      qaIds: ["plows-q4", "plows-q7", "spreaders-q6", "spreaders-q11"],
    },
    {
      id: "application-basics",
      title: "Application Basics",
      qaIds: ["spreaders-q5", "spreaders-q7", "spreaders-q8", "spreaders-q10"],
    },
    {
      id: "advanced-features",
      title: "Advanced Features",
      qaIds: ["plows-q9", "plows-q10", "plows-q11"],
    },
    {
      id: "hydraulics-mounting",
      title: "Hydraulics & Mounting",
      qaIds: ["plows-q5", "plows-q6", "plows-q8"],
    },
  ],
  terms: [
    "Trip-edge",
    "Full-trip",
    "Moldboard",
    "Cutting Edge",
    "Wing Plow",
    "Underbody Scraper",
    "Deflector",
    "Down-pressure",
    "Pre-wet",
    "Brine",
    "Application Rate",
    "Swath",
    "Bounce/Scatter",
    "Closed-loop",
    "Stainless 304",
    "Spinner Shield",
  ],
  hasSaltUsageTool: true,
  relatedSlugs: ["integration", "operations", "procurement"],
  downloads: [
    {
      label: "ARM Snow Plows PDF",
      href: "/wp-content/uploads/2025/05/ARM-TruckCorp-Snow-Plows.pdf",
    },
    {
      label: "TG-505 Under-tailgate Spreader",
      href: "https://www.truckcorpllc.com/wp-content/uploads/2021/06/2021-TG-505-Spreader-Literature.pdf",
    },
    {
      label: "ARM Spreaders PDF",
      href: "/wp-content/uploads/2025/05/ARM-TruckCorp-Spreaders.pdf",
    },
  ],
};