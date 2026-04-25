import GanttChart from "./GanttChart";
import ResultsTable from "./ResultsTable";

export default function ResultsPanel({ result, activeTab, onTabChange, allIds, totalTime }) {
  const cur = activeTab === "priority" ? result.priority : result.srtf;

  return (
    <>
      <div className="tabs">
        {[
          ["priority", "Priority Scheduling", "active-priority"],
          ["srtf",     "SRTF",                "active-srtf"]
        ].map(([tab, label, activeClass]) => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? ` ${activeClass}` : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="results-panel">
        <p className="algo-note">
          {activeTab === "priority"
            ? `Preemptive Priority — ${result.priority.preemptions.length} preemption(s) | Rule: lower number = higher priority`
            : `SRTF — ${result.srtf.preemptions.length} preemption(s) | Picks shortest remaining job`}
        </p>

        <h3 className="section-heading">GANTT CHART</h3>
        <GanttChart
          timeline={cur.timeline}
          preemptions={cur.preemptions}
          allIds={allIds}
          totalTime={totalTime}
        />

        <h3 className="section-title">PROCESS TABLE</h3>
        <ResultsTable
          results={cur.results}
          allIds={allIds}
          avgWT={cur.avgWT}
          avgTAT={cur.avgTAT}
          avgRT={cur.avgRT}
        />
      </div>
    </>
  );
}