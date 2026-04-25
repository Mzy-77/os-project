import { useState } from "react";
import "./index.css";
import Header from "./components/header";
import ScenarioBar from "./components/ScenarioBar";
import ComparisonSummary from "./components/Summary.jsx";
import ResultsPanel from "./components/ResultsPanel.jsx";
import InputPanel from "./components/InputPanel.jsx";
import {SCENARIOS} from "./components/utils/Scenarios.js";

export default function App() {
  const [processes, setProcesses] = useState([
    { id: "P1", arrival: 0, burst: 5, priority: 2 },
    { id: "P2", arrival: 1, burst: 3, priority: 1 },
    { id: "P3", arrival: 2, burst: 8, priority: 3 }
  ]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("priority");
  const [validationDemo, setValidationDemo] = useState(false);

  const allIds = result
    ? result.priority.results.map(p => p.id)
    : processes.map(p => p.id);

  const totalTime = result ? Math.max(
    result.priority.timeline.at(-1)?.end ?? 0,
    result.srtf.timeline.at(-1)?.end ?? 0
  ) : 0;

  const addProcess = () => {
    const nextNum = processes.length + 1;
    setProcesses(prev => [...prev, { id: `P${nextNum}`, arrival: 0, burst: 1, priority: 1 }]);
  };

  const removeProcess = (i) => setProcesses(prev => prev.filter((_, idx) => idx !== i));

  const updateProcess = (i, field, value) => {
    setProcesses(prev => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: field === "id" ? value : Number(value) };
      return copy;
    });
  };


  const loadScenario = (key) => {
    setProcesses(SCENARIOS[key].processes);
    setResult(null);
    setError("");
    setValidationDemo(false);
  };

  const loadValidation = () => {
    setValidationDemo(true);
    setProcesses([
      { id: "P1", arrival: -1, burst: 5, priority: 2 },
      { id: "P2", arrival:  0, burst: 0, priority: 1 }
    ]);
    setResult(null);
  };


  const simulate = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ processes })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Simulation failed.");
        setResult(null);
      } else {
        setResult(data);
        setActiveTab("priority");
      }
    } catch {
      setError("Could not reach backend. Make sure the server is running on port 3001.");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <Header />

      <div className="main">
        <ScenarioBar
          onLoadScenario={loadScenario}
          onLoadValidation={loadValidation}
        />

        <InputPanel
          processes={processes}
          onAddProcess={addProcess}
          onRemoveProcess={removeProcess}
          onUpdateProcess={updateProcess}
          error={error}
          validationDemo={validationDemo}
          loading={loading}
          onSimulate={simulate}
        />

        {result && (
          <>
            <ResultsPanel
              result={result}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              allIds={allIds}
              totalTime={totalTime}
            />

            <ComparisonSummary data={result} />
          </>
        )}
      </div>
    </div>
  );
}