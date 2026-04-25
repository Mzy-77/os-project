import { getColor } from "./utils/colors";

export default function ResultsTable({ results, allIds, avgWT, avgTAT, avgRT }) {
    return (
        <div className="table-wrapper">
            <table className="results-table">
                <thead>
                    <tr>
                        {["PID", "Arrival", "Burst", "Priority", "Finish", "WT", "TAT", "RT"].map(h => (
                            <th key={h}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.map((p, i) => {
                        const color = getColor(p.id, allIds);
                        const priorityClass =
                            p.priority <= 2 ? "priority-high" :
                                p.priority <= 3 ? "priority-medium" : "priority-low";
                        return (
                            <tr key={i} className={i % 2 === 0 ? "tr-even" : "tr-odd"}>
                                <td>
                                    <span className="pid-dot" style={{ background: color }} />
                                    <span className="td-pid-name">P{p.id}</span>
                                </td>
                                <td className="cell">{p.arrival}</td>
                                <td className="cell">{p.burst}</td>
                                <td>
                                    <span className={`priority-badge ${priorityClass}`}>{p.priority}</span>
                                </td>
                                <td className="cell">{p.finish}</td>
                                <td className="td-wt">{p.waiting}</td>
                                <td className="td-tat">{p.turnaround}</td>
                                <td className="td-rt">{p.response}</td>
                            </tr>
                        );
                    })}
                    <tr className="tr-avg">
                        <td colSpan={5} className="avg-label">AVERAGES</td>
                        <td className="td-wt">{avgWT.toFixed(2)}</td>
                        <td className="td-tat">{avgTAT.toFixed(2)}</td>
                        <td className="td-rt">{avgRT.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}