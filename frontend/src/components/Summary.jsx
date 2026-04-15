export default function ComparisonSummary({ priorityData, srtfData }) {

    const avg = (arr, key) =>
        arr.reduce((sum, item) => sum + item[key], 0) / arr.length;

    return (
        <div>
            <h2>Comparison Summary</h2>

            <p>Average Waiting Time (Priority): {avg(priorityData.results, "waiting")}</p>
            <p>Average Waiting Time (SRTF): {avg(srtfData.results, "waiting")}</p>

            <p>Average Turnaround Time (Priority): {avg(priorityData.results, "turnaround")}</p>
            <p>Average Turnaround Time (SRTF): {avg(srtfData.results, "turnaround")}</p>

            <h3>
                Better Algorithm:{" "}
                {avg(srtfData.results, "waiting") < avg(priorityData.results, "waiting")
                    ? "Shortest Remaining Time First"
                    : "Priority Scheduling"}
            </h3>
        </div>
    );
}