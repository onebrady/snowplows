import { KNOWLEDGE_SECTIONS } from "../content/knowledge";
import { SinglePageKnowledge } from "../components/knowledge/SinglePageKnowledge";

export default function SinglePageKnowledgePage() {
  try {
    if (!KNOWLEDGE_SECTIONS || KNOWLEDGE_SECTIONS.length === 0) {
      return <div className="p-8">Error: No knowledge sections found</div>;
    }
    return <SinglePageKnowledge sections={KNOWLEDGE_SECTIONS} />;
  } catch (error) {
    console.error("Error in SinglePageKnowledgePage:", error);
    return (
      <div className="p-8">
        <h1>Error Loading Content</h1>
        <p>There was an error loading the knowledge page. Please check the console for details.</p>
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }
}