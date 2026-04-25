const SCENARIOS = {
  A: { name: "A — Basic Mixed" },
  B: { name: "B — Priority vs Burst Conflict" },
  C: { name: "C — Starvation Risk" }
};

export default function ScenarioBar({ onLoadScenario, onLoadValidation }) {
  return (
    <div className="scenario-bar">
      <span className="scenario-bar-label">LOAD SCENARIO:</span>
      {Object.entries(SCENARIOS).map(([key, s]) => (
        <button
          key={key}
          className="btn-scenario"
          onClick={() => onLoadScenario(key)}
        >
          {s.name}
        </button>
      ))}
      <button className="btn-scenario-danger" onClick={onLoadValidation}>
        D — Validation (Invalid Input)
      </button>
    </div>
  );
}