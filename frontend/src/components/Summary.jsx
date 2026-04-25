export default function ComparisonSummary({ data }) {
    const { priority: pri, srtf } = data;
    const metrics = [
        { label: "Avg Waiting Time", priVal: pri.avgWT, srtfVal: srtf.avgWT },
        { label: "Avg Turnaround Time", priVal: pri.avgTAT, srtfVal: srtf.avgTAT },
        { label: "Avg Response Time", priVal: pri.avgRT, srtfVal: srtf.avgRT },
    ];

    const betterWT = pri.avgWT < srtf.avgWT ? "Priority" : srtf.avgWT < pri.avgWT ? "SRTF" : null;
    const betterTAT = pri.avgTAT < srtf.avgTAT ? "Priority" : srtf.avgTAT < pri.avgTAT ? "SRTF" : null;
    const betterRT = pri.avgRT < srtf.avgRT ? "Priority" : srtf.avgRT < pri.avgRT ? "SRTF" : null;

    return (
        <div className="summary">
            <h3 className="summary-title">COMPARISON SUMMARY</h3>

            <table className="summary-table">
                <thead>
                    <tr>
                        <th className="th-metric">METRIC</th>
                        <th className="th-pri">PRIORITY</th>
                        <th className="th-srtf">SRTF</th>
                        <th className="th-winner">WINNER</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((m, i) => {
                        const priWins = m.priVal <= m.srtfVal;
                        return (
                            <tr key={i}>
                                <td className="td-metric">{m.label}</td>
                                <td className={priWins ? "win" : "lose"}>{m.priVal.toFixed(2)}</td>
                                <td className={!priWins ? "win" : "lose"}>{m.srtfVal.toFixed(2)}</td>
                                <td className="td-winner">{priWins ? "Priority" : "SRTF"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Analysis Cards */}
            <div className="analysis-grid">
                {[
                    { q: "Lower avg waiting time?", a: pri.avgWT < srtf.avgWT ? "Priority Scheduling" : srtf.avgWT < pri.avgWT ? "SRTF" : "Tie" },
                    { q: "Lower avg response time?", a: pri.avgRT < srtf.avgRT ? "Priority Scheduling" : srtf.avgRT < pri.avgRT ? "SRTF" : "Tie" },
                    { q: "Priority favored urgent processes?", a: pri.preemptions.length > 0 ? `Yes — ${pri.preemptions.length} preemption(s)` : "No preemptions" },
                    { q: "SRTF favored short jobs?", a: srtf.avgWT < pri.avgWT ? `Yes — ${(pri.avgWT - srtf.avgWT).toFixed(2)} lower` : "Not here" },
                ].map((item, i) => (
                    <div key={i} className="analysis-card">
                        <p className="analysis-q">{item.q}</p>
                        <p className="analysis-a">{item.a}</p>
                    </div>
                ))}
            </div>

            {/* Conclusion */}
            <div className="conclusion-box">
                <h4 className="conclusion-title">CONCLUSION</h4>
                <p className="conclusion-text">
                    {betterWT && <><strong className="conclusion-strong">{betterWT}</strong> had lower waiting time. </>}
                    {betterRT && <><strong className="conclusion-strong">{betterRT}</strong> had lower response time. </>}
                    Priority scheduling cares about urgency — high-priority jobs jump ahead. SRTF ignores priority and just picks whoever finishes fastest.
                    The tradeoff is between fairness to important processes vs minimizing average wait time.
                    Priority works better if you have critical processes, SRTF works better if you want overall efficiency.
                </p>
            </div>

            {/* Fairness Discussion */}
            <div className="fairness-box">
                <h4 className="fairness-title">FAIRNESS & STARVATION</h4>
                <p className="fairness-text">
                    Priority scheduling can starve low-priority jobs if high-priority ones keep arriving.
                    In Scenario C, you can see P{data.priority.results.slice().sort((a, b) => b.waiting - a.waiting)[0]?.id} has to wait way longer because higher-priority processes keep getting picked first.
                    <br /><br />
                    SRTF doesn't have that priority problem, but it can starve long jobs. If a bunch of short jobs keep showing up, a long job never gets to run.
                    <br /><br />
                    So it depends what matters more: protecting urgent processes or keeping overall wait times low.
                </p>
            </div>
        </div>
    );
}