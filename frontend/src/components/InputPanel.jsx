import { getColor } from "./utils/colors";

export default function InputPanel({
    processes,
    onAddProcess,
    onRemoveProcess,
    onUpdateProcess,
    error,
    validationDemo,
    loading,
    onSimulate
}) {
    return (
        <div className="panel">
            <div className="panel-header">
                <h2 className="panel-title">INPUT PANEL</h2>
                <button
                    className="btn-add-process"
                    onClick={onAddProcess}
                    disabled={processes.length >= 10}
                >
                    + ADD PROCESS
                </button>
            </div>

            <div className="input-col-headers">
                {["PID", "Arrival Time", "Burst Time", "Priority (1=high)", "", ""].map((h, i) => (
                    <span key={i} className="input-col-header">{h}</span>
                ))}
            </div>

            {processes.map((p, i) => {
                const color = getColor(p.id, processes.map(x => x.id));
                return (
                    <div key={i} className="process-row">
                        <div className="process-id-cell">
                            <span className="process-color-dot" style={{ background: color }} />
                            <input
                                className="process-input"
                                value={p.id}
                                onChange={e => onUpdateProcess(i, "id", e.target.value)}
                            />
                        </div>
                        {["arrival", "burst", "priority"].map(field => (
                            <input
                                key={field}
                                type="number"
                                className="process-input"
                                value={p[field]}
                                onChange={e => onUpdateProcess(i, field, e.target.value)}
                                min={field === "arrival" ? 0 : 1}
                            />
                        ))}
                        <div />
                        <button className="btn-remove-process" onClick={() => onRemoveProcess(i)}>✕</button>
                    </div>
                );
            })}

            {error && (
                <div className="error-banner">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{error}</span>
                    {validationDemo && <span className="error-hint">← Validation working correctly</span>}
                </div>
            )}

            <button
                className="btn-run"
                onClick={onSimulate}
                disabled={loading || processes.length === 0}
            >
                {loading ? "SIMULATING..." : " RUN SIMULATION"}
            </button>
        </div>
    );
}