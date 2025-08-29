import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { runDevChecks } from "./lib/devChecks";
import KnowledgeSectionPage from "./pages/KnowledgeSectionPage";
import SinglePageKnowledgePage from "./pages/SinglePageKnowledgePage";
import DownloadsPage from "./pages/DownloadsPage";
import QuizPage from "./pages/QuizPage";

export default function App() {
  useEffect(() => {
    runDevChecks();
  });
  return (
    <HashRouter>
      <div className="min-h-full flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<SinglePageKnowledgePage />} />
            <Route path="/knowledge/*" element={<Navigate to="/" replace />} />
            <Route path="/section/:slug" element={<KnowledgeSectionPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </div>
        {/* Footer removed */}
      </div>
    </HashRouter>
  );
}
