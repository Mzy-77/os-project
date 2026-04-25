import { getColor } from "../utils/colors";

export default function GanttChart({ timeline, preemptions, allIds, totalTime }) {
    const preemptSet = new Set(preemptions.map(p => p.at));

    return (
        <div className="gantt-wrapper">
            <div className="gantt-bar">
                {timeline.map((seg, i) => {
                    const width = Math.max(((seg.end - seg.start) / totalTime) * 700, 28);
                    const color = getColor(seg.id, allIds);
                    const isPreempted = preemptSet.has(seg.end) && i < timeline.length - 1;
                    return (
                        <div
                            key={i}
                            className="gantt-segment"
                            style={{
                                width,
                                background: color,
                                borderRight: isPreempted ? "2px dashed #fff" : "1px solid rgba(0,0,0,0.2)"
                            }}
                        >
                            <span className="gantt-segment-label">P{seg.id}</span>
                            {isPreempted && (
                                <span className="gantt-preempt-icon" title="Preemption point">⚡</span>
                            )}
                            <span className="gantt-segment-time">{seg.start}–{seg.end}</span>
                        </div>
                    );
                })}
            </div>

            <div className="gantt-axis">
                <span className="gantt-axis-label">t=0</span>
                <span className="gantt-axis-label">t={totalTime}</span>
            </div>

            {preemptions.length > 0 && (
                <p className="gantt-preempt-log">
                    ⚡ = preemption point &nbsp;|&nbsp;
                    {preemptions.map((p, i) => (
                        <span key={i} className="gantt-preempt-entry">t={p.at}: P{p.preempted} → P{p.by}</span>
                    ))}
                </p>
            )}
        </div>
    );
}