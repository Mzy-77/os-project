export default function ComparisonSummary({ data }) {
    const { priority: pri, srtf } = data;
    const metrics = [
        { label: "Avg Waiting Time",    priVal: pri.avgWT,  srtfVal: srtf.avgWT  },
        { label: "Avg Turnaround Time", priVal: pri.avgTAT, srtfVal: srtf.avgTAT },
        { label: "Avg Response Time",   priVal: pri.avgRT,  srtfVal: srtf.avgRT  },
    ];

    const betterWT  = pri.avgWT  < srtf.avgWT  ? "Priority" : srtf.avgWT  < pri.avgWT  ? "SRTF" : "Tie";
    const betterTAT = pri.avgTAT < srtf.avgTAT ? "Priority" : srtf.avgTAT < pri.avgTAT ? "SRTF" : "Tie";
    const betterRT  = pri.avgRT  < srtf.avgRT  ? "Priority" : srtf.avgRT  < pri.avgRT  ? "SRTF" : "Tie";

    // Which algorithm wins more metrics overall
    const priScore  = [betterWT, betterTAT, betterRT].filter(x => x === "Priority").length;
    const srtfScore = [betterWT, betterTAT, betterRT].filter(x => x === "SRTF").length;
    const overallWinner = priScore > srtfScore ? "Priority" : srtfScore > priScore ? "SRTF" : "Tie";

    // Starvation victim (process with highest waiting time under Priority)
    const starvationVictim = data.priority.results.slice().sort((a, b) => b.waiting - a.waiting)[0];

    // Did priority actually help urgent processes?
    const urgentHelped = pri.preemptions.length > 0;

    // Did SRTF favor short jobs? (lower WT than Priority)
    const srtfFavoredShort = srtf.avgWT < pri.avgWT;

    // Recommendation logic
    const recommendation =
        urgentHelped && !srtfFavoredShort ? "Priority" :
        srtfFavoredShort && !urgentHelped ? "SRTF" :
        overallWinner !== "Tie" ? overallWinner : "Neither clearly";

    return (
        <div className="summary">
            <h3 className="summary-title">COMPARISON SUMMARY</h3>

            {/* Metrics Table */}
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
                        const priWins = m.priVal < m.srtfVal;
                        const isTie   = m.priVal === m.srtfVal;
                        return (
                            <tr key={i}>
                                <td className="td-metric">{m.label}</td>
                                <td className={isTie ? "tie" : priWins ? "win" : "lose"}>{m.priVal.toFixed(2)}</td>
                                <td className={isTie ? "tie" : !priWins ? "win" : "lose"}>{m.srtfVal.toFixed(2)}</td>
                                <td className="td-winner">{isTie ? "Tie ⚖️" : priWins ? "Priority" : "SRTF"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Q&A Analysis Cards */}
            <div className="analysis-grid">
                {[
                    {
                        q: "Which had lower avg waiting time?",
                        a: betterWT === "Tie"
                            ? `Both tied at ${pri.avgWT.toFixed(2)}`
                            : `${betterWT} (${betterWT === "Priority" ? pri.avgWT.toFixed(2) : srtf.avgWT.toFixed(2)} vs ${betterWT === "Priority" ? srtf.avgWT.toFixed(2) : pri.avgWT.toFixed(2)})`
                    },
                    {
                        q: "Which had lower avg response time?",
                        a: betterRT === "Tie"
                            ? `Both tied at ${pri.avgRT.toFixed(2)}`
                            : `${betterRT} (${betterRT === "Priority" ? pri.avgRT.toFixed(2) : srtf.avgRT.toFixed(2)} vs ${betterRT === "Priority" ? srtf.avgRT.toFixed(2) : pri.avgRT.toFixed(2)})`
                    },
                    {
                        q: "Did priority values help urgent processes?",
                        a: urgentHelped
                            ? `Yes — ${pri.preemptions.length} preemption(s) ensured high-priority jobs ran first`
                            : "No — no preemptions occurred; all processes arrived without interrupting each other"
                    },
                    {
                        q: "Did SRTF favor short jobs more aggressively?",
                        a: srtfFavoredShort
                            ? `Yes — SRTF had ${(pri.avgWT - srtf.avgWT).toFixed(2)} lower avg wait time by always picking the shortest remaining job`
                            : srtf.avgWT === pri.avgWT
                                ? "Same result — both algorithms produced equal waiting times for this workload"
                                : "Not here — Priority actually achieved lower waiting time than SRTF for this workload"
                    },
                    {
                        q: "Which algorithm is recommended for this workload?",
                        a: recommendation === "Priority"
                            ? "Priority Scheduling — this workload has urgent processes that benefit from preemption"
                            : recommendation === "SRTF"
                                ? "SRTF — this workload benefits more from minimizing overall wait time than protecting urgency"
                                : "Both performed similarly — choice depends on whether urgency or efficiency matters more"
                    },
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

                    {/* Which performed better overall */}
                    {overallWinner === "Tie"
                        ? <>Both algorithms performed <strong className="conclusion-strong">equally</strong> across all measured metrics for this workload. </>
                        : <><strong className="conclusion-strong">{overallWinner}</strong> performed better overall on this dataset. </>}

                    {/* Which metrics were better under each */}
                    {betterWT !== "Tie" && <>
                        <strong className="conclusion-strong">{betterWT}</strong> produced lower average waiting time.{" "}
                    </>}
                    {betterRT !== "Tie" && <>
                        <strong className="conclusion-strong">{betterRT}</strong> produced lower average response time.{" "}
                    </>}
                    {betterWT === "Tie" && betterRT === "Tie" && <>
                        Both algorithms produced identical waiting and response times.{" "}
                    </>}

                    {/* Main trade-off */}
                    The core trade-off is <strong className="conclusion-strong">urgency vs efficiency</strong>: Priority scheduling protects critical processes by letting them preempt others, but this can delay lower-priority jobs.
                    SRTF minimizes overall wait time by always running the shortest job, but ignores process importance entirely.{" "}

                    {/* Fairness */}
                    In terms of fairness, {urgentHelped
                        ? <>Priority scheduling introduced <strong className="conclusion-strong">preemption-based favoritism</strong> — P{starvationVictim?.id} waited the longest ({starvationVictim?.waiting} units) due to higher-priority processes cutting ahead. SRTF distributes CPU time more evenly across processes but can still starve long jobs if short ones keep arriving.</>
                        : <>neither algorithm caused significant starvation in this workload. Priority had no preemptions, so all processes were treated similarly. SRTF remained fair as no stream of short jobs monopolized the CPU.</>
                    }
                </p>
            </div>

            {/* Fairness & Starvation */}
            <div className="fairness-box">
                <h4 className="fairness-title">FAIRNESS & STARVATION</h4>
                <p className="fairness-text">
                    <strong>Priority Scheduling:</strong> Can starve low-priority processes if high-priority ones keep arriving.
                    {urgentHelped
                        ? <> In this run, P{starvationVictim?.id} waited <strong>{starvationVictim?.waiting} units</strong> — the longest of any process — because higher-priority jobs kept preempting it.</>
                        : <> In this run, no preemptions occurred so starvation was not an issue.</>
                    }
                    <br /><br />
                    <strong>SRTF:</strong> Doesn't use priority, but can starve long jobs if a continuous stream of short jobs arrives.
                    {srtfFavoredShort
                        ? <> Here, SRTF's preference for short jobs paid off — average wait time was {(pri.avgWT - srtf.avgWT).toFixed(2)} units lower than Priority.</>
                        : <> In this workload, SRTF's short-job preference did not produce a clear advantage over Priority.</>
                    }
                    <br /><br />
                    <strong>Overall:</strong> Priority is fairer to <em>urgent</em> processes; SRTF is fairer in terms of <em>average</em> wait time across all processes.
                </p>
            </div>
        </div>
    );
}