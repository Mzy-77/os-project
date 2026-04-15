export default function GanttChart({ data }) {
    return (
        <div className="ganttChart">
            {data.map((id, i) => (
                <span key={i}>
                    P{id} |
                </span>
            ))}
        </div>
    );
}